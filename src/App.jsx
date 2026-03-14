import React, { useState } from "react";
import SideMenu from "./components/SideMenu";

import Dashboard from "./components/Dashboard";
import Houses from "./pages/Houses";
import Cleaners from "./pages/Cleaners";
import Jobs from "./pages/Jobs";
import Finances from "./pages/Finances";

import "./style.css";

function App() {

  const [page, setPage] = useState("dashboard");

  const renderPage = () => {

    switch (page) {

      case "houses":
        return <Houses />;

      case "cleaners":
        return <Cleaners />;

      case "jobs":
        return <Jobs />;

      case "finances":
        return <Finances />;

      default:
        return <Dashboard />;
    }
  };

  return (

    <div className="appLayout">

      <SideMenu
        goDashboard={() => setPage("dashboard")}
        goHouses={() => setPage("houses")}
        goCleaners={() => setPage("cleaners")}
        goJobs={() => setPage("jobs")}
        goFinances={() => setPage("finances")}
      />

      <div className="mainContent">
        {renderPage()}
      </div>

    </div>

  );
}

export default App;