import React from "react";
import "../assets/css/JobListItem.css";

const JobListItem = ({ job, onPay }) => {
  const { date, time, houseName, cleanerAmount } = job;

  return (
    <div className="job-list-item">
      <span className="job-date-time">{date} {time}</span>
      <span className="job-house-name">{houseName || "Unknown House"}</span>
      <span className="job-cleaner-amount">Amount: ${cleanerAmount}</span>

      <button className="pay-button" onClick={() => onPay(job)}>Pay</button>
    </div>
  );
};

export default JobListItem;