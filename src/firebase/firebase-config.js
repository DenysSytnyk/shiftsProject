
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQTydgOOgjWuyknHCZRavm3bD2BFyAziE",
    authDomain: "myshiftsproject.firebaseapp.com",
    projectId: "myshiftsproject",
    storageBucket: "myshiftsproject.appspot.com",
    messagingSenderId: "656759925949",
    appId: "1:656759925949:web:a22039dbee312757ae5bd4",
    measurementId: "G-DBTLRWTBDB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

