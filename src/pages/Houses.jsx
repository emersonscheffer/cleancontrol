import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { addHouse, getHouses } from "../services/database";

const Houses = () => {

  const { houses, setHouses } = useStore();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadHouses();
  }, []);

  const loadHouses = async () => {
    const data = await getHouses();
    setHouses(data);
  };

  const handleAdd = async () => {

    await addHouse({ name, address });

    setName("");
    setAddress("");

    loadHouses();

  };

  return (

    <div>

      <h1>Houses</h1>

      <input
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={handleAdd}>Add House</button>

      <ul>
        {houses.map((h) => (
          <li key={h.id}>{h.name} - {h.address}</li>
        ))}
      </ul>

    </div>

  );
};

export default Houses;