// src/components/TaskCounter.js
import React from "react";

function TaskCounter({ activeCount, completedCount, handleClearCompleted }) {
  return (
    <>
      <p className="text-muted mb-3">
        {activeCount} task{activeCount !== 1 ? "s" : ""} left
      </p>

      {completedCount > 0 && (
        <button
          className="btn btn-outline-danger mb-3"
          onClick={handleClearCompleted}
        >
          Clear Completed ({completedCount})
        </button>
      )}
    </>
  );
}

export default TaskCounter;
