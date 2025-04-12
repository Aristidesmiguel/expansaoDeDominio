import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAJCJmXXWepkZQt8ezYemD8tnziBC3mzwI",
  authDomain: "lista-de-tarefas-930fd.firebaseapp.com",
  projectId: "lista-de-tarefas-930fd",
  storageBucket: "lista-de-tarefas-930fd.appspot.com",
  messagingSenderId: "430565549170",
  appId: "1:430565549170:web:2c3af30cd117708e35ceeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);