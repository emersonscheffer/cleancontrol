import React from "react";

const EventItem = ({ event }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#F5F5F5",
      }}
    >
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
    </div>
  );
};

export default EventItem;   
