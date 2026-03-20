import { db } from "../firebase/firebaseConfig";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

//
// 🏠 HOUSES
//

export const addHouse = async (house) => {
  await addDoc(collection(db, "houses"), {
    name: house.name || "",
    address: house.address || "",
    phone: house.phone || "",
    email: house.email || "",
    price: Number(house.price) || 0,

    rooms: Number(house.rooms) || 0,
    bathrooms: Number(house.bathrooms) || 0,
    kitchens: Number(house.kitchens) || 0,

    oven: house.oven || false,
    laundry: house.laundry || false,
    refrigerator: house.refrigerator || false,

    frequency: house.frequency || "S",
    notes: house.notes || "",

    lastCleaners: house.lastCleaners || []
  });
};

export const getHouses = async () => {
  const snapshot = await getDocs(collection(db, "houses"));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const updateHouse = async (id, updatedData) => {
  const ref = doc(db, "houses", id);

  await updateDoc(ref, {
    name: updatedData.name,
    address: updatedData.address,
    phone: updatedData.phone,
    price: Number(updatedData.price),
    frequency: updatedData.frequency,
    notes: updatedData.notes || "",
    lastCleaners: updatedData.lastCleaners || []
  });
};

export const deleteHouse = async (id) => {
  const ref = doc(db, "houses", id);
  await deleteDoc(ref);
};

//
// 🧹 CLEANERS
//

export const addCleaner = async (cleaner) => {
  await addDoc(collection(db, "cleaners"), {
    name: cleaner.name || "",
  });
};

export const getCleaners = async () => {
  const snapshot = await getDocs(collection(db, "cleaners"));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

//
// 📅 JOBS
//

export const addJob = async (job) => {
  await addDoc(collection(db, "jobs"), {
    house: job.house || "",
    cleaner: job.cleaner || "",
    date: job.date || "",
    price: Number(job.price) || 0,
    pay: Number(job.pay) || 0,
  });
};

export const getJobs = async () => {
  const snapshot = await getDocs(collection(db, "jobs"));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};
