import React, { useEffect } from "react";
import { useStore } from "../store/useStore";
import { getJobs, getHouses, getCleaners } from "../services/database";

const Dashboard = () => {

  const {
    houses,
    cleaners,
    jobs,
    setJobs,
    setHouses,
    setCleaners
  } = useStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const jobsData = await getJobs();
    const housesData = await getHouses();
    const cleanersData = await getCleaners();

    setJobs(jobsData);
    setHouses(housesData);
    setCleaners(cleanersData);

  };

  const revenue = jobs.reduce((sum, j) => sum + j.price, 0);
  const payouts = jobs.reduce((sum, j) => sum + j.pay, 0);
  const profit = revenue - payouts;

  return (

    <div>

      <h1>Dashboard</h1>

      <div className="statsGrid">

        <div className="card">
          <h3>Houses</h3>
          <p>{houses.length}</p>
        </div>

        <div className="card">
          <h3>Cleaners</h3>
          <p>{cleaners.length}</p>
        </div>

        <div className="card">
          <h3>Jobs</h3>
          <p>{jobs.length}</p>
        </div>

      </div>

      <div className="statsGrid">

        <div className="card">
          <h3>Total Revenue</h3>
          <p>${revenue}</p>
        </div>

        <div className="card">
          <h3>Total Paid to Cleaners</h3>
          <p>${payouts}</p>
        </div>

        <div className="card">
          <h3>Profit</h3>
          <p>${profit}</p>
        </div>

      </div>

    </div>

  );
};

export default Dashboard;