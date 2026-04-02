import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { addCleaner, getCleaners } from "../services/database";
import CleanerItem from "../components/CleanerItem";

const Cleaners = ({ goToDetails }) => {
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
      number of cleaners: {cleaners.length} {/* 🔥 Display number of cleaners */}
<br /> 
      <input
        placeholder="Cleaner Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={add}>Add Cleaner</button>

      {cleaners.map((c) => (
        <CleanerItem key={c.id} cleaner={c} onClick={() => goToDetails(c)} />
      ))}

      {/* <CleanerItem cleaner={{ name: "John Doe", wallet: 150 }} /> */}
    </div>
  );
};

export default Cleaners;
