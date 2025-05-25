// src/components/TaskInput.js
import React from "react";

function TaskInput({ dueDate, setDueDate, newTask, setNewTask, handleAddTask }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddTask();
        }}
      />
      <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}

export default TaskInput;