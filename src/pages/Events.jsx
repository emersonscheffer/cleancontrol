import React from "react";  
import EventItem from "../components/EventItem";
import { addEvent } from "../services/database";

const Events = ({ events }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Events</h1>

        <button onClick={addEvent}>Add Event </button>



      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => <EventItem key={event.id} event={event} />)
      )}
    </div>
  );
};

export default Events;

