import { de } from "date-fns/locale";
import React from "react";

// import { deleteCleaner } from "../services/database";

const CleanerItem = ({ cleaner, deleteCleaner }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{cleaner.name}</h3>
      <h3>Wallet: ${cleaner.wallet}</h3>

      <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={() => {
          deleteCleaner(cleaner.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default CleanerItem;
