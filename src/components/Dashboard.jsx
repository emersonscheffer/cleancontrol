import React from "react";

import RevenueChart from "./RevenueChart";
import PayrollReport from "./PayrollReport";

import DateWidget from "./DateWidget";
import EventItem from "./EventItem";

const Dashboard = () => {
  return (
    <div>
      {/* <h1>Business Dashboard</h1> */}

      <div style={{ display: "flex", gap: "20px" }}>
        <DateWidget />
      </div>

      


        <EventItem />

    </div>
  );
};

export default Dashboard;
