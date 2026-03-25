import React from "react";

import RevenueChart from "./RevenueChart";
import PayrollReport from "./PayrollReport";

import DateWidget from "./DateWidget";

const Dashboard = () => {
  return (
    <div>
      {/* <h1>Business Dashboard</h1> */}

      <div style={{ display: "flex", gap: "20px" }}>
        <DateWidget />
      </div>

      {/* <RevenueChart />

      <div style={{ marginTop: "40px" }}>
        <PayrollReport />
      </div> */}
    </div>
  );
};

export default Dashboard;
