import React from "react";
import "../assets/css/EventItem.css";

const EventItem = ({ event, onToggleDone, onTogglePaid, onDelete }) => {
  const {
    houseName = "",
    date = "",
    housePrice = 0,
    cleanersList = [],
    jobDone = false,
    paid = false,
  } = event || {};

  // 🔥 Total cleaners pay
  const totalCleanerPay = cleanersList.reduce(
    (sum, cleaner) => sum + (cleaner.amount || 0),
    0,
  );

  // 🔥 Profit calculation
  const profit = housePrice - totalCleanerPay;

  return (
    <div className="event-card">
      {/* HEADER */}
      <div className="house-name">{houseName}</div>
      <div className="event-date">{date}</div>

      <div className="profit">Profit ${profit}</div>
      <div className="house-price">${housePrice}</div>

      {/* CLEANERS (dynamic) */}
      <div className="cleaners-container">
        {cleanersList.map((cleaner, index) => {
          const percentage =
            housePrice > 0
              ? Math.round((cleaner.amount / housePrice) * 100)
              : 0;

          return (
            <div className="cleaner-row" key={index}>
              <div className="cleaner-title">Cleaner {index + 1}</div>
              <div className="cleaner-name">{cleaner.cleaner}</div>
              <div className="cleaner-amount">${cleaner.amount}</div>
              <div className="cleaner-percentage">{percentage}%</div>
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
