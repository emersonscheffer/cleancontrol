import React, { useEffect } from "react";
import { useStore } from "../store/useStore";
import { getJobs } from "../services/database";

const Finances = () => {

  const { jobs, setJobs } = useStore();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  const revenue = jobs.reduce((sum, j) => sum + j.price, 0);

  const payouts = jobs.reduce((sum, j) => sum + j.pay, 0);

  const profit = revenue - payouts;

  return (

    <div>

      <h1>Finances</h1>

      <h3>Total Revenue: ${revenue}</h3>

      <h3>Total Paid to Cleaners: ${payouts}</h3>

      <h3>Profit: ${profit}</h3>

    </div>

  );
};

export default Finances;