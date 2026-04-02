import { db } from "../firebase/firebaseConfig";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
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

    lastCleaners: house.lastCleaners || [],

    notes: house.notes || "",
    paymentHistory: house.paymentHistory || [],

    payMethod: house.payMethod || "",
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
    payMethod: updatedData.payMethod || "",
    frequency: updatedData.frequency,
    notes: updatedData.notes || "",
    lastCleaners: updatedData.lastCleaners || [],
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
    wallet: Number(cleaner.wallet) || 0,
  });
};

export const updateCleaner = async (id, updatedData) => {
  const ref = doc(db, "cleaners", id);

  await updateDoc(ref, {
    name: updatedData.name,
    wallet: Number(updatedData.wallet),
  });
};

export const deleteCleaner = async (id) => {
  const ref = doc(db, "cleaners", id);
  await deleteDoc(ref);
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

//
// 📅 EVENTS
//

export const subscribeToEvents = (callback) => {
  const colRef = collection(db, "events");

  return onSnapshot(colRef, (snapshot) => {
    const events = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));

    callback(events);
  });
};

export const addEvent = async (event) => {
  await addDoc(collection(db, "events"), {
    house: event.house || {},
    date: event.date || "",
    timeOfCleaning: event.timeOfCleaning || {},
    cleanersList: event.cleanersList || [],
    jobDone: event.jobDone || false,
    paid: event.paid || false,
    payType: event.payType || "",
    notes: event.notes || "",
  });
};

export const getEvents = async () => {
  const snapshot = await getDocs(collection(db, "events"));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const updateEvent = async (id, updatedData) => {
  const ref = doc(db, "events", id);

  await updateDoc(ref, {
    ...updatedData,
  });
};

export const deleteEvent = async (id) => {
  const ref = doc(db, "events", id);
  await deleteDoc(ref);
};
