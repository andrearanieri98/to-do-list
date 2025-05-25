// src/components/TaskFilters.js
import React from "react";

function TaskFilters({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <ul className="nav nav-tabs mb-3">
      {filters.map((tab) => (
        <li className="nav-item" key={tab}>
          <button
            className={`nav-link ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskFilters;
