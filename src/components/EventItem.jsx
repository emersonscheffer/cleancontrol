import React from "react";
// import "./EventItem.css";
import "../assets/css/EventItem.css"

const EventItem = ({ event, onToggleDone, onTogglePaid, onDelete }) => {
  const {
    title = "",
    date = "",
    description = "",
    cleaner1 = "",
    cleaner2 = "",
    cleaner1Pay = 0,
    cleaner2Pay = 0,
    amount = 0,
    jobDone = false,
    paid = false,
    payType = "",
  } = event || {};

  return (
    <div className="event-card">
      
      <div className="event-header">
        <h2 className="event-title">{title}</h2>
        <span className="event-date">{date}</span>
      </div>

      <p className="event-description">{description}</p>

      <div className="event-cleaners">
        <p><strong>Cleaner 1:</strong> {cleaner1} — ${cleaner1Pay}</p>
        <p><strong>Cleaner 2:</strong> {cleaner2} — ${cleaner2Pay}</p>
      </div>

      <div>
        <p className="event-total">Total: ${amount}</p>
        <p className="event-paytype">Payment: {payType}</p>
      </div>

      <div className="badges">
        <span className={`badge ${jobDone ? "badge-green" : "badge-red"}`}>
          {jobDone ? "Job Done" : "Pending"}
        </span>

        <span className={`badge ${paid ? "badge-green" : "badge-yellow"}`}>
          {paid ? "Paid" : "Unpaid"}
        </span>
      </div>

      <div className="actions">
        <button
          className="btn btn-blue"
          onClick={() => onToggleDone?.(event)}
        >
          Toggle Done
        </button>

        <button
          className="btn btn-green"
          onClick={() => onTogglePaid?.(event)}
        >
          Toggle Paid
        </button>

        <button
          className="btn btn-red"
          onClick={() => onDelete?.(event)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventItem;