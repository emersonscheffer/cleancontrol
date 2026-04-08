import React from "react";

const getColor = (freq) => {
  switch (freq) {
    case "W":
      return "#22c55e"; // green
    case "B":
      return "#3b82f6"; // blue
    case "M":
      return "#f59e0b"; // orange
    case "S":
      return "#6b7280"; // gray
    default:
      return "#ccc";
  }
};

const HouseCard = ({ house, onClick }) => {
  return (
    <div className="houseCard" onClick={onClick}>
      <div className="cardHeader">
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{house.name}</h3>

        <div
          className="freqBox"
          style={{ background: getColor(house.frequency) }}
        >
          {house.frequency}
        </div>
      </div>

      <p>{house.address}</p>

      <p>{house.phone}</p>

      <p>Pay Method: {house.payMethod || "None"}</p>

      {house.notes ? <p>{house.notes}</p> : null}

      <p>
        Cleaners:{" "}
        {house.lastCleaners?.length > 0
          ? house.lastCleaners.join(", ")
          : "None"}
      </p>

      <div className="cardFooter">
        <strong style={{ color: 'green', fontWeight: "bold" }}>${house.price}</strong>
      </div>
    </div>
  );
};

export default HouseCard;
