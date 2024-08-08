// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6hZ1oIrGV4r-LqNvycpfnyQDgZzgzhfE",
  authDomain: "floart-9d46f.firebaseapp.com",
  projectId: "floart-9d46f",
  storageBucket: "floart-9d46f.appspot.com",
  messagingSenderId: "431085196326",
  appId: "1:431085196326:web:37b9baef0627a66a4c42e7",
  measurementId: "G-BJ939EW9BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// Funcție pentru a actualiza contorul de vizite
async function updateVisitorCounter() {
    const counterRef = db.collection('counters').doc('visitorCount');

    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(counterRef);
            if (!doc.exists) {
                // Dacă documentul nu există, inițializează-l cu o valoare de 1
                transaction.set(counterRef, { count: 1 });
            } else {
                // Dacă documentul există, incrementează valoarea contorului
                transaction.update(counterRef, { count: doc.data().count + 1 });
            }
        });
    } catch (error) {
        console.error("Eroare la actualizarea contorului: ", error);
    }
}

// Actualizează contorul la încărcarea paginii
updateVisitorCounter();

//actualizare afisare pe pagina


document.addEventListener('DOMContentLoaded', function () {
    const visitorCountElement = document.getElementById('visitor-count');
    
    // Funcție pentru a asculta schimbările contorului în Firestore
    function listenForVisitorCount() {
        const counterRef = db.collection('counters').doc('visitorCount');
        
        counterRef.onSnapshot((doc) => {
            if (doc.exists) {
                const count = doc.data().count;
                visitorCountElement.textContent = count;
            } else {
                visitorCountElement.textContent = '0';
            }
        });
    }

    // Ascultă schimbările contorului
    listenForVisitorCount();
});

