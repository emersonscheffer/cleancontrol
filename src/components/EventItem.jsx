import React from "react";
// import "./EventItem.css";
import "../assets/css/EventItem.css";

const EventItem = ({ event, onToggleDone, onTogglePaid, onDelete }) => {
  const {
    houseName = "Rebecca",
    date = "Tue 10:00 AM",
    profit = 0,
    housePrice = 400,
    cleanersList = [{ name: "John Doe", amount: 210 }],

    jobDone = false,
    paid = false,
  } = event || {};

  return (
    <div className="event-card">
      <div className="house-name">{houseName}</div>
      <div className="event-date">{date}</div>

      <div className="profit">
        Profit ${housePrice - cleanersList[0].amount}
      </div>

      <div className="house-price">${housePrice}</div>

      <div className="cleaner-title">
        Cleaner {cleanersList.indexOf(cleanersList[0]) + 1}
      </div>
      <div className="cleaner-amount">${cleanersList[0].amount}</div>

      <div className="done-btn">{jobDone ? "Done" : "Pending"}</div>
      <div className="paid-btn">{paid ? "Paid" : "Unpaid"}</div>

      <div className="edit-btn">edit</div>
      <div className="cleaner-name">{cleanersList[0].name}</div>
      <div className="cleaner-percentage">
        {100 * (cleanersList[0].amount / housePrice)}%
      </div>
    </div>

    // <div className="event-card">

    //   <div className="event-header">
    //     <h2 className="event-title">{title}</h2>
    //     <span className="event-date">{date}</span>
    //   </div>

    //   <p className="event-description">{description}</p>

    //   <div className="event-cleaners">
    //     <p><strong>Cleaner 1:</strong> {cleaner1} — ${cleaner1Pay}</p>
    //     <p><strong>Cleaner 2:</strong> {cleaner2} — ${cleaner2Pay}</p>
    //   </div>

    //   <div>
    //     <p className="event-total">Total: ${amount}</p>
    //     <p className="event-paytype">Payment: {payType}</p>
    //   </div>

    //   <div className="badges">
    //     <span className={`badge ${jobDone ? "badge-green" : "badge-red"}`}>
    //       {jobDone ? "Job Done" : "Pending"}
    //     </span>

    //     <span className={`badge ${paid ? "badge-green" : "badge-yellow"}`}>
    //       {paid ? "Paid" : "Unpaid"}
    //     </span>
    //   </div>

    //   <div className="actions">
    //     <button
    //       className="btn btn-blue"
    //       onClick={() => onToggleDone?.(event)}
    //     >
    //       Toggle Done
    //     </button>

    //     <button
    //       className="btn btn-green"
    //       onClick={() => onTogglePaid?.(event)}
    //     >
    //       Toggle Paid
    //     </button>

    //     <button
    //       className="btn btn-red"
    //       onClick={() => onDelete?.(event)}
    //     >
    //       Delete
    //     </button>
    //   </div>
    // </div>
  );
};

export default EventItem;
