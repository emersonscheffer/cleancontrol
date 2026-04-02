import React from "react";
import "../assets/css/EventItem.css";

const EventItem = ({ event, onToggleDone, onTogglePaid, onDelete }) => {
  const houseObj = { name: "Unknown House", price: 0 };

  const {
    house = houseObj,
    date = "",
    timeOfCleaning = {},
    cleanersList = [],
    jobDone = false,
    paid = false,
    payType = "",
    notes = "",
  } = event || {};

  const {
    timeHour = "",
    timeMinute = "",
    timePeriod = "",
  } = timeOfCleaning;

  const formattedTime =
    timeHour && timeMinute && timePeriod
      ? `${timeHour}:${timeMinute} ${timePeriod}`
      : "No time set";

  // 🔥 Total cleaners pay
  const totalCleanerPay = cleanersList.reduce(
    (sum, cleaner) => sum + (cleaner.amount || 0),
    0,
  );

  // 🔥 Profit calculation
  const profit = house.price - totalCleanerPay;

  return (
    <div className="event-card">
      {/* HEADER */}
      <div className="house-name">{house.name}</div>
      <div className="event-date">{date}</div>
      <div className="event-time">{formattedTime}</div>
      <div className="event-paytype">Pay Type: {payType || "None"}</div>
      <div className="event-notes">Notes: {notes || "None"}</div>

      <div className="profit">Profit ${profit}</div>
      <div className="house-price">${house.price}</div>

      {/* CLEANERS (dynamic) */}
      <div className="cleaners-container">
        {cleanersList.map((cleaner, index) => {
          const percentage =
            house.price > 0
              ? Math.round((cleaner.amount / house.price) * 100)
              : 0;

          return (
            <div className="cleaner-row" key={index}>
              <div className="cleaner-title">Cleaner {index + 1}</div>
              <div className="cleaner-name">{cleaner.name}</div>
              <div className="cleaner-amount">${cleaner.amount}</div>
              <div className="cleaner-percentage">{cleaner.percentage}%</div>
            </div>
          );
        })}
      </div>

      {/* STATUS BUTTONS */}
      <div
        className={`done-btn ${jobDone ? "active" : ""}`}
        onClick={() => onToggleDone?.(event)}
      >
        {jobDone ? "Done" : "Pending"}
      </div>

      <div
        className={`paid-btn ${paid ? "active" : ""}`}
        onClick={() => onTogglePaid?.(event)}
      >
        {paid ? "Paid" : "Unpaid"}
      </div>

      {/* DELETE */}
      <div className="edit-btn" onClick={() => onDelete?.(event)}>
        delete
      </div>
    </div>
  );
};

export default EventItem;
