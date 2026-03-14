import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { addJob, getJobs, getHouses, getCleaners } from "../services/database";

const Jobs = () => {

  const { jobs, setJobs, houses, setHouses, cleaners, setCleaners } = useStore();

  const [house, setHouse] = useState("");
  const [cleaner, setCleaner] = useState("");
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const jobsData = await getJobs();
    const housesData = await getHouses();
    const cleanersData = await getCleaners();

    setJobs(jobsData);
    setHouses(housesData);
    setCleaners(cleanersData);

  };

  const createJob = async () => {

    await addJob({
      house,
      cleaner,
      price: Number(price),
      pay: Number(pay)
    });

    setHouse("");
    setCleaner("");
    setPrice("");
    setPay("");

    loadData();

  };

  return (

    <div>

      <h1>Cleaning Jobs</h1>

      <select onChange={(e) => setHouse(e.target.value)}>

        <option>Select House</option>

        {houses.map((h) => (
          <option key={h.id} value={h.name}>{h.name}</option>
        ))}

      </select>

      <select onChange={(e) => setCleaner(e.target.value)}>

        <option>Select Cleaner</option>

        {cleaners.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}

      </select>

      <input
        placeholder="Customer Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Cleaner Pay"
        value={pay}
        onChange={(e) => setPay(e.target.value)}
      />

      <button onClick={createJob}>Add Job</button>

      <ul>
        {jobs.map((j) => (
          <li key={j.id}>
            {j.house} - {j.cleaner} - ${j.price}
          </li>
        ))}
      </ul>

    </div>

  );
};

export default Jobs;