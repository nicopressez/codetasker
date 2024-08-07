// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: 'codetasker-56e43.firebaseapp.com',
    projectId: 'codetasker-56e43',
    storageBucket: 'codetasker-56e43.appspot.com',
    messagingSenderId: '101231980001',
    appId: '1:101231980001:web:856a22280ddcaf35dfb6a0',
    measurementId: 'G-MKHDPKT0TE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
