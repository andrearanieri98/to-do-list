// src/components/TaskList.js
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskItem from "./TaskItem";

import { AnimatePresence, motion } from "framer-motion";

function SortableTaskItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(props.editingTaskId === props.task.id ? {} : listeners)} // Disable drag if editing
    >
      <TaskItem {...props} />
    </div>
  );
}

function TaskList({
  tasks,
  setTasks,
  editingTaskId,
  editingText,
  setEditingText,
  startEditing,
  saveEditing,
  cancelEditing,
  handleDelete,
  handleToggle,
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="list-group">
          <AnimatePresence>
                      {tasks.map((task) => (
                        <motion.li
                          key={task.id}
                          //initial={{ opacity: 0, y: -10 }}
                          //animate={{ opacity: 1, y: 0 }}
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          layout
                          style={{ listStyle: "none" }}
                        >
                          <SortableTaskItem
                            task={task}
                            editingTaskId={editingTaskId}
                            editingText={editingText}
                            setEditingText={setEditingText}
                            startEditing={startEditing}
                            saveEditing={saveEditing}
                            cancelEditing={cancelEditing}
                            handleDelete={handleDelete}
                            handleToggle={handleToggle}
                          />
                        </motion.li>
                      ))}
                    </AnimatePresence>
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default TaskList;
