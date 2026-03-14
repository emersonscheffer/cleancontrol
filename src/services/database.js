import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

export const addHouse = async (house) => {
  await addDoc(collection(db, "houses"), house);
};

export const getHouses = async () => {
  const snapshot = await getDocs(collection(db, "houses"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCleaner = async (cleaner) => {
  await addDoc(collection(db, "cleaners"), cleaner);
};

export const getCleaners = async () => {
  const snapshot = await getDocs(collection(db, "cleaners"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addJob = async (job) => {
  await addDoc(collection(db, "jobs"), job);
};

export const getJobs = async () => {
  const snapshot = await getDocs(collection(db, "jobs"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};