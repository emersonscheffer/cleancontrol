import React, { useEffect, useState } from "react";
import { getJobs } from "../services/database";

const PayrollReport = () => {

  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    calculatePayroll();
  }, []);

  const calculatePayroll = async () => {

    const jobs = await getJobs();

    const totals = {};

    jobs.forEach(job => {

      if (!totals[job.cleaner]) {
        totals[job.cleaner] = 0;
      }

      totals[job.cleaner] += job.pay;

    });

    const report = Object.keys(totals).map(name => ({
      cleaner: name,
      total: totals[name]
    }));

    setPayroll(report);

  };

  return (

    <div>

      <h2>Cleaner Payroll</h2>

      <table>

        <thead>
          <tr>
            <th>Cleaner</th>
            <th>Total Pay</th>
          </tr>
        </thead>

        <tbody>

          {payroll.map((p,i)=>(
            <tr key={i}>
              <td>{p.cleaner}</td>
              <td>${p.total}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
};

export default PayrollReport;