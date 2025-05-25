import React from "react";

function TaskItem({
  task,
  editingTaskId,
  editingText,
  setEditingText,
  startEditing,
  saveEditing,
  cancelEditing,
  handleDelete,
  handleToggle,
}) {
  const isEditing = editingTaskId === task.id;
return (
  <li
    className={`list-group-item d-flex justify-content-between align-items-center ${
      task.dueDate && !task.completed && new Date(task.dueDate) < new Date()
        ? "list-group-item-danger"
        : ""
    }`}
  >
    {isEditing ? (
      <input
        className="form-control"
        value={editingText}
        autoFocus
        onChange={(e) => setEditingText(e.target.value)}
        onBlur={() => saveEditing(task.id, editingText)} // ✅ Pass function, not direct call
        onKeyDown={(e) => {
          if (e.key === "Enter") saveEditing(task.id, editingText);
          else if (e.key === "Escape") cancelEditing();
        }}
      />
    ) : (
      <>
        <div className="form-check d-flex align-items-center flex-grow-1">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={task.completed}
            onChange={() => handleToggle(task.id, task.completed)}
            id={`task-${task.id}`}
            onPointerDown={(e) => e.stopPropagation()}
          />
          <span
            className="flex-grow-1"
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => startEditing(task.id, task.text)}
          >
            {task.text}
          </span>
        </div>

        <button
          className="btn btn-sm btn-outline-primary ms-2"
          onClick={() => startEditing(task.id, task.text)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ✏️
        </button>

        <button
          className="btn btn-sm btn-danger ms-2"
          onClick={() => handleDelete(task.id)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ❌
        </button>
      </>
    )}
  </li>
);

}

export default TaskItem;
