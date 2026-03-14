import React from "react";

const SideMenu = ({
  goDashboard,
  goHouses,
  goCleaners,
  goJobs,
  goFinances
}) => {
  return (
    <div className="sideMenu">

      <h2 className="menuTitle">Cleaning Admin</h2>

      <div className="menuSection">

        <button onClick={goDashboard}>
          Dashboard
        </button>

      </div>

      <hr />

      <div className="menuSection">

        <h4>Add +</h4>

        <button onClick={goHouses}>
          + House
        </button>

        <button onClick={goCleaners}>
          + Cleaner
        </button>

      </div>

      <hr />

      <div className="menuSection">

        <button onClick={goJobs}>
          Cleaning Jobs
        </button>

        <button onClick={goFinances}>
          Finances
        </button>

      </div>

    </div>
  );
};

export default SideMenu;