import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBKqkReR1hF2K54Ko8kirZy2HL2tnkJ2C0",
    authDomain: "instagram-lite-udemy.firebaseapp.com",
    projectId: "instagram-lite-udemy",
    storageBucket: "instagram-lite-udemy.appspot.com",
    messagingSenderId: "687447643066",
    appId: "1:687447643066:web:e8e629a70f52f853cf4383",
    measurementId: "G-W4HPB7ZVSW"
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
export { app, fireDb } 