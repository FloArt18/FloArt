import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, doc, runTransaction, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

async function updateVisitorCounter() {
    const counterRef = doc(db, "counters", "visitorCount");

    try {
        await runTransaction(db, async (transaction) => {
            const docSnapshot = await transaction.get(counterRef);
            if (!docSnapshot.exists()) {
                transaction.set(counterRef, { count: 1 });
            } else {
                const newCount = docSnapshot.data().count + 1;
                transaction.update(counterRef, { count: newCount });
            }
        });
    } catch (error) {
        console.error("Eroare la actualizarea contorului: ", error);
    }
}

// Funcție pentru a asculta schimbările contorului în Firestore
function listenForVisitorCount() {
    const counterRef = doc(db, "counters", "visitorCount");
    onSnapshot(counterRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const count = docSnapshot.data().count;
            document.getElementById('visitor-count').textContent = count;
        } else {
            document.getElementById('visitor-count').textContent = '0';
        }
    });
}

// Actualizează contorul la încărcarea paginii
document.addEventListener('DOMContentLoaded', function () {
    updateVisitorCounter();
    listenForVisitorCount();
});
