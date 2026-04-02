import React from "react";

const CleanerItem = ({ cleaner, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: "10px",
        backgroundColor: "#F5F5F5",
        display: "grid",
        gridTemplateAreas: `
        ". . . ." 
        ". name . wallet" 
          ". . . ." 
        `,
        gridTemplateRows: "10px 1fr 10px",
        gridTemplateColumns: "10px 1fr 1fr 60px",
        width: "270px",
        height: "60px",
        cursor: "pointer",
      }}
    >
      <h3 style={{ gridArea: "name" }}>{cleaner.name}</h3>
      <h3 style={{ gridArea: "wallet", color: "red" }}>$ {cleaner.wallet}</h3>
    </div>
  );
};

export default CleanerItem;
