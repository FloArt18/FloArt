// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
