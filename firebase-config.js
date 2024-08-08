

var firebaseConfig = {
  apiKey: "AIzaSyB6hZ1oIrGV4r-LqNvycpfnyQDgZzgzhfE",
  authDomain: "floart-9d46f.firebaseapp.com",
  projectId: "floart-9d46f",
  storageBucket: "floart-9d46f.appspot.com",
  messagingSenderId: "431085196326",
  appId: "1:431085196326:web:37b9baef0627a66a4c42e7",
  measurementId: "G-BJ939EW9BS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Funcția de actualizare a contorului
async function updateVisitorCounter() {
    var counterRef = db.collection('counters').doc('visitorCount');

    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(counterRef);
            if (!doc.exists) {
                transaction.set(counterRef, { count: 1 });
            } else {
                transaction.update(counterRef, { count: doc.data().count + 1 });
            }
        });
    } catch (error) {
        console.error("Eroare la actualizarea contorului: ", error);
    }
}

// Funcția de ascultare în timp real
function listenForVisitorCount() {
    var counterRef = db.collection('counters').doc('visitorCount');
    
    counterRef.onSnapshot((doc) => {
        if (doc.exists) {
            var count = doc.data().count;
            document.getElementById('visitor-count').textContent = count;
        } else {
            document.getElementById('visitor-count').textContent = '0';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateVisitorCounter();
    listenForVisitorCount();
});
