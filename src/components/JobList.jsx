import React from "react";  
import JobListItem from "./JobListItem";

const JobList = ({ jobs, onPay }) => {
    console.log("Rendering JobList with jobs:", jobs);
  return (
    <div>
      <h2>Job List</h2>
      {jobs && jobs.length > 0 ? (
        jobs.map((job, index) => (
          <JobListItem key={index} job={job} onPay={onPay} />
        ))
      ) : (
        <p>No jobs assigned.</p>
      )}
      {/* <JobListItem job={jobs[0]} onPay={onPay} /> */}
      
    </div>
  );
};

export default JobList;