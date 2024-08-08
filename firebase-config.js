import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

// Funcție pentru a actualiza contorul de vizite
async function updateVisitorCounter() {
    const counterRef = doc(db, 'counters', 'visitorCount');

    try {
        await runTransaction(db, async (transaction) => {
            const docSnap = await transaction.get(counterRef);
            if (!docSnap.exists()) {
                // Dacă documentul nu există, inițializează-l cu o valoare de 1
                transaction.set(counterRef, { count: 1 });
            } else {
                // Dacă documentul există, incrementează valoarea contorului
                transaction.update(counterRef, { count: docSnap.data().count + 1 });
            }
        });
    } catch (error) {
        console.error("Eroare la actualizarea contorului: ", error);
    }
}

// Actualizează contorul la încărcarea paginii
updateVisitorCounter();

// Funcție pentru a asculta schimbările contorului în Firestore
function listenForVisitorCount() {
    const visitorCountElement = document.getElementById('visitor-count');
    const counterRef = doc(db, 'counters', 'visitorCount');
    
    onSnapshot(counterRef, (docSnap) => {
        if (docSnap.exists()) {
            const count = docSnap.data().count;
            visitorCountElement.textContent = count;
        } else {
            visitorCountElement.textContent = '0';
        }
    });
}

// Ascultă schimbările contorului după încărcarea paginii
document.addEventListener('DOMContentLoaded', listenForVisitorCount);
