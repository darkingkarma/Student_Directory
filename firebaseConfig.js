import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBZeN-g8vdgPO3R7QOQVJmNazicUv8pXk4",
  authDomain: "student-directory-21a3f.firebaseapp.com",
  projectId: "student-directory-21a3f",
  storageBucket: "student-directory-21a3f.firebasestorage.app",
  messagingSenderId: "468783973739",
  appId: "1:468783973739:web:32a32111bf14111f55f82e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);