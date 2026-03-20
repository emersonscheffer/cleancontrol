import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { getHouses } from "../services/database";
import HouseCard from "../components/HouseCard";
import AddHouseModal from "../components/AddHouseModal";

const Houses = ({ goToDetails }) => {

  const { houses, setHouses } = useStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getHouses();
    setHouses(data);
  };

  return (

    <div>

      <h1>Houses</h1>

      <button onClick={() => setShowModal(true)}>
        + Add House
      </button>

      <div className="cardGrid">

        {houses.map((house) => (

          <HouseCard
            key={house.id}
            house={house}
            onClick={() => goToDetails(house)}
          />

        ))}

      </div>

      {showModal && (
        <AddHouseModal
          onClose={() => setShowModal(false)}
          onAdded={load}
        />
      )}

    </div>

  );
};

export default Houses;