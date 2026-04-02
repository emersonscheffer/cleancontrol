import React, { useEffect, useState } from "react";
import SideMenu from "./components/SideMenu";

import Dashboard from "./components/Dashboard";
import Houses from "./pages/Houses";
import Cleaners from "./pages/Cleaners";
import Jobs from "./pages/Jobs";
import Finances from "./pages/Finances";
import CleanerDetails from "./pages/CleanerDetails";

import Events from "./pages/Events";

import HouseDetails from "./pages/HouseDetails";

import "./assets/css/reset.css"

import "./style.css";

import { useStore } from "./store/useStore";
import { getEvents } from "./services/database";





function App() {
  const { cleaners, setCleaners } = useStore();

  const [events, setEvents] = useState();

// useStore((state) => {
//   setEvents(state.events);
// });

useEffect(() => {
  loadEvents();
}, []);

const loadEvents = async () => {
  const data = await getEvents();
  setEvents(data);
};

  const [page, setPage] = useState("dashboard");

  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "houses":
        return (
          <Houses
            goToDetails={(house) => {
              setSelectedHouse(house);
              setPage("houseDetails");
            }}
          />
        );

      case "cleaners":
        return (
          <Cleaners
            goToDetails={(cleaner) => {
              setSelectedCleaner(cleaner);
              setPage("cleanerDetails");
            }}
          />
        );

      case "jobs":
        return <Jobs />;

      case "finances":
        return <Finances />;

      case "houseDetails":
        return (
          <HouseDetails
            house={selectedHouse}
            goBack={() => setPage("houses")}
          />
        );

      case "cleanerDetails":
        return (
          <CleanerDetails
            cleaner={selectedCleaner}
            goBack={() => setPage("cleaners")}
            onUpdated={(cleaner) => {
              setSelectedCleaner(cleaner);
              setCleaners(
                cleaners.map((item) =>
                  item.id === cleaner.id ? cleaner : item
                )
              );
            }}
            onDeleted={(cleanerId) => {
              setSelectedCleaner(null);
              setCleaners(cleaners.filter((item) => item.id !== cleanerId));
            }}
          />
        );

      case "events":
        return <Events events={events} />;

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
        goEvents={() => setPage("events")}
      />

      <div className="mainContent">{renderPage()}</div>
    </div>
  );
}

export default App;
