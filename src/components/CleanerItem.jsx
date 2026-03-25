import { de } from "date-fns/locale";
import React from "react";

// import { deleteCleaner } from "../services/database";

const CleanerItem = ({ cleaner, deleteCleaner }) => {
  return (
    <div
      style={{
        // border: "1px solid #ccc",
        borderRadius: "10px",
        // padding: "10px",
        // marginBottom: "10px",
        backgroundColor: "#F5F5F5",
        display: "grid",
        gridTemplateAreas: `
        ". . . ." 
        ". name . wallet" 
          ". . . ." 
        `,
        gridTemplateRows: "10px 1fr 10px",
        gridTemplateColumns: "10px 1fr 1fr 60px",
        // alignItems: "center",
        // justifyContent: "space-between",
        width: "270px",
        height: "60px",

        
      }}
    >
      <h3 style={{ gridArea: "name" }}>{cleaner.name}</h3>
      <h3 style={{ gridArea: "wallet", color: "red" }}>$ {cleaner.wallet}</h3>

      {/* <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={() => {
          deleteCleaner(cleaner.id);
        }}
      >
        Delete
      </button> */}
    </div>
  );
};

export default CleanerItem;
