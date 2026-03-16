import React from "react";

import RevenueChart from "./RevenueChart";
import PayrollReport from "./PayrollReport";

const Dashboard = () => {

  return (

    <div>

      <h1>Business Dashboard</h1>

      <RevenueChart/>

      <div style={{marginTop:"40px"}}>

        <PayrollReport/>

      </div>

    </div>

  );
};

export default Dashboard;