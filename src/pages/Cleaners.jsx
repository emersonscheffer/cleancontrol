import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { addCleaner, getCleaners } from "../services/database";

const Cleaners = () => {

  const { cleaners, setCleaners } = useStore();

  const [name, setName] = useState("");

  useEffect(() => {
    loadCleaners();
  }, []);

  const loadCleaners = async () => {
    const data = await getCleaners();
    setCleaners(data);
  };

  const add = async () => {

    await addCleaner({ name });

    setName("");

    loadCleaners();

  };

  return (

    <div>

      <h1>Cleaners</h1>

      <input
        placeholder="Cleaner Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={add}>Add Cleaner</button>

      <ul>
        {cleaners.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>

    </div>

  );
};

export default Cleaners;