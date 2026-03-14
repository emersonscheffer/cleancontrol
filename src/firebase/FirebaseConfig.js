import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZH4bRRS5BSrV_ILyzPrxhL0UaY5ZzcVo",
  authDomain: "clean-control-9eb9c.firebaseapp.com",
  projectId: "clean-control-9eb9c",
  storageBucket: "clean-control-9eb9c.firebasestorage.app",
  messagingSenderId: "722775176704",
  appId: "1:722775176704:web:5fe62c12602c993b124ae5",
  measurementId: "G-L1D388PRT8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);