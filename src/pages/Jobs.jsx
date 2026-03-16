import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

import { addJob, getJobs, getHouses, getCleaners } from "../services/database";

import JobsCalendar from "../components/JobsCalendar";


const Jobs = () => {

  const { houses, cleaners, setHouses, setCleaners } = useStore();

  const [house, setHouse] = useState("");
  const [cleaner, setCleaner] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const housesData = await getHouses();
    const cleanersData = await getCleaners();

    setHouses(housesData);
    setCleaners(cleanersData);

  };

  const createJob = async () => {

    await addJob({
      house,
      cleaner,
      date,
      price: Number(price),
      pay: Number(pay)
    });

    setHouse("");
    setCleaner("");
    setDate("");
    setPrice("");
    setPay("");

  };

  return (

    <div>

      <h1>Cleaning Jobs</h1>

      <h3>Create Job</h3>

      <select onChange={(e)=>setHouse(e.target.value)}>
        <option>Select House</option>
        {houses.map(h => (
          <option key={h.id} value={h.name}>{h.name}</option>
        ))}
      </select>

      <select onChange={(e)=>setCleaner(e.target.value)}>
        <option>Select Cleaner</option>
        {cleaners.map(c => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />

      <input
        placeholder="Customer Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        placeholder="Cleaner Pay"
        value={pay}
        onChange={(e)=>setPay(e.target.value)}
      />

      <button onClick={createJob}>Add Job</button>

      <h2 style={{marginTop:"40px"}}>Schedule</h2>

      <JobsCalendar/>

    </div>

  );
};

export default Jobs;