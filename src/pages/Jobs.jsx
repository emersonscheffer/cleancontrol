import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

import { addJob, getJobs, getHouses, getCleaners } from "../services/database";

import JobsCalendar from "../components/JobsCalendar";

const Jobs = () => {
  const { houses, cleaners, setHouses, setCleaners } = useStore();

  const [house, setHouse] = useState("");
  const [cleaner1, setCleaner1] = useState("");
  const [cleaner2, setCleaner2] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");

  const findHouse = (name) => {
    return houses.find((h) => h.name === name);
  };

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
      cleaner: [cleaner1, cleaner2].filter(Boolean),
      date,
      price: Number(price),
      pay: Number(pay),
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

      <select
        onChange={(e) => {
          const selected = e.target.value;
          setHouse(selected);

          const found = findHouse(selected);

          if (found) {
            // 💰 Auto-fill price
            setPrice(found.price || "");

            // 🧹 Auto-fill cleaners
            const cleaners = found.lastCleaners || [];

            setCleaner1(cleaners[0] || "");
            setCleaner2(cleaners[1] || "");
          }

          if (found.price) {
            setPay(found.price * 0.6); // example 60% to cleaner
          }
        }}
      >
        <option>Select House</option>

        {houses.map((h) => (
          <option key={h.id} value={h.name}>
            {h.name}
          </option>
        ))}
      </select>

      <select value={cleaner1} onChange={(e) => setCleaner1(e.target.value)}>
        <option value="">Cleaner 1</option>
        {cleaners.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <select value={cleaner2} onChange={(e) => setCleaner2(e.target.value)}>
        <option value="">Cleaner 2</option>
        {cleaners.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

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

      <h2 style={{ marginTop: "40px" }}>Schedule</h2>

      <JobsCalendar />
    </div>
  );
};

export default Jobs;
