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

      <div
        style={{
          width: "450px",
          height: "80px",
          backgroundColor: "orange",
          borderRadius: "5px",
          display: "grid",
          gridTemplate: `
              ". .......... . . . . . " 5px
              ". house-name cleaner1 cleaner2 amount profit ." 1fr
              ". event-date . ." 1fr
              ". edit-btn . ." 1fr
              ". ......... . . . . . " 5px
              / 5px 100px 1fr 5px
          `,
        }}
      >
        <div
          style={{
            gridArea: "house-name",
            backgroundColor: "lightgreen",
            fontSize: "14px",
            fontWeight: "bold",
            alignSelf: "center",
            // justifySelf:"center"
            width: "100%",
            height: "100%",
            display: "grid",
          }}
        >
          <h1 style={{ alignSelf: "center" }}>Rebecca</h1>
        </div>

        <div style={{ gridArea: "event-date" }}>date here</div>

        {/* ///
        /// Edit Button ///
        /// */}

        <div
          style={{
            gridArea: "edit-btn",
            fontSize: "11px",
            fontWeight: "bold",
            width: "100%",
            height: "100%",
            display: "grid",
            backgroundColor: "lightblue",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              width: "80%",
              height: "90%",
              backgroundColor: "blue",
            }}
          >
            Edit
          </div>
        </div>
      </div>

      {/* <div style={{ gridArea: "" }}>

      </div> */}

      {/* <RevenueChart />

      <div style={{ marginTop: "40px" }}>
        <PayrollReport />
      </div> */}
    </div>
  );
};

export default Dashboard;
