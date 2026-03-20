import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { getJobs } from "../services/database";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const JobsCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const jobs = await getJobs();

    const formatted = jobs.map((job) => ({
      title: `${job.house} - ${
        Array.isArray(job.cleaner) ? job.cleaner.join(", ") : job.cleaner
      }`,
      start: new Date(job.date),
      end: new Date(job.date),
    }));

    setEvents(formatted);
  };

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default JobsCalendar;
