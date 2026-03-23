import React from "react";

// Helper to calculate ISO week number
const getWeekNumber = (date) => {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = temp.getUTCDay() || 7;

  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);

  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));

  return Math.ceil((((temp - yearStart) / 86400000) + 1) / 7);
};

const DateWidget = () => {

  const now = new Date();

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const day = now.getDate();

  const weekNumber = getWeekNumber(now);

  return (

    <div className="dateWidget">

      <h2>{dayName}</h2>

      <p className="dateMain">
        {month} {day}
      </p>

      <p className="week">
        Week {weekNumber}
      </p>

    </div>

  );
};

export default DateWidget;