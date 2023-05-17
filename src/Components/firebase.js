import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeEO3bx5C7eVZ_aQL9XxCVIYIFBihO2_Q",
    authDomain: "e-commerce-website-a04e4.firebaseapp.com",
    projectId: "e-commerce-website-a04e4",
    storageBucket: "e-commerce-website-a04e4.appspot.com",
    messagingSenderId: "143009758060",
    appId: "1:143009758060:web:31a88a06b5f1e466f39149"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider()

export { app, auth, provider };