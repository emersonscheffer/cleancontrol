import React, { useEffect } from "react";
import { useStore } from "../store/useStore";
import { getHouses } from "../services/database";
import HouseCard from "../components/HouseCard";

const Houses = ({ goToDetails }) => {
  const { houses, setHouses } = useStore();

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

      <div className="cardGrid">
        {houses.map((house) => (
          <HouseCard
            key={house.id}
            house={house}
            onClick={() => goToDetails(house)}
          />
        ))}
      </div>
    </div>
  );
};

export default Houses;
