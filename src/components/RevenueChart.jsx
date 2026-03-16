import React, { useEffect, useState } from "react";
import { getJobs } from "../services/database";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const RevenueChart = () => {

  const [data,setData] = useState([]);

  useEffect(()=>{
    loadData();
  },[]);

  const loadData = async ()=>{

    const jobs = await getJobs();

    const grouped = {};

    jobs.forEach(job=>{

      const date = job.date?.split("T")[0];

      if(!grouped[date]){

        grouped[date] = 0;

      }

      grouped[date] += job.price;

    });

    const chartData = Object.keys(grouped).map(d=>({
      date:d,
      revenue:grouped[d]
    }));

    setData(chartData);

  };

  return(

    <div style={{height:"300px"}}>

      <h2>Revenue</h2>

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data}>

          <XAxis dataKey="date"/>

          <YAxis/>

          <Tooltip/>

          <Bar dataKey="revenue"/>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
};

export default RevenueChart;