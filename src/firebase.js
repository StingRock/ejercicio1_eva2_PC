import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBuN8JwUKfipZ5nEKMuLGILerh0yuSpCAs",
    authDomain: "database-953c0.firebaseapp.com",
    projectId: "database-953c0",
    storageBucket: "database-953c0.firebasestorage.app",
    messagingSenderId: "182932830636",
    appId: "1:182932830636:web:b29b10299456420ac66209"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };