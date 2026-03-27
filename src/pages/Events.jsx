import React, { useEffect, useState } from "react";
import EventItem from "../components/EventItem";

import AddEventModal from "../components/AddEventModal";

import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  subscribeToEvents,
} from "../services/database";

const Events = () => {
  const [events, setEvents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveEvent = async (eventData) => {
    try {
      await addEvent(eventData);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // 🔹 Fetch events from database
  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToEvents(setEvents);
    return () => unsubscribe(); // cleanup
  }, []);

  // 🔹 Add event
  const handleAddEvent = async () => {
    const newEvent = {
      title: "New Cleaning Job",
      date: new Date().toLocaleDateString(),
      description: "New job description",
      cleaner1: "Cleaner A",
      cleaner2: "Cleaner B",
      cleaner1Pay: 50,
      cleaner2Pay: 50,
      amount: 150,
      jobDone: false,
      paid: false,
      payType: "cash",
    };

    try {
      await addEvent(newEvent);
      fetchEvents(); // refresh list
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // 🔹 Toggle jobDone
  const handleToggleDone = async (event) => {
    try {
      await updateEvent(event.id, {
        jobDone: !event.jobDone,
      });
      fetchEvents();
    } catch (error) {
      console.error("Error updating jobDone:", error);
    }
  };

  // 🔹 Toggle paid
  const handleTogglePaid = async (event) => {
    try {
      await updateEvent(event.id, {
        paid: !event.paid,
      });
      fetchEvents();
    } catch (error) {
      console.error("Error updating paid:", error);
    }
  };

  // 🔹 Delete event
  const handleDelete = async (event) => {
    try {
      await deleteEvent(event.id);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Events</h1>

      <div
        style={{
          width: "450px",
          height: "80px",
          backgroundColor: "orange",
          borderRadius: "5px",
          display:"grid"
        }}
      >



      </div>

      <button onClick={() => setIsModalOpen(true)}>Add Event</button>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            onToggleDone={handleToggleDone}
            onTogglePaid={handleTogglePaid}
            onDelete={handleDelete}
          />
        ))
      )}

      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default Events;
