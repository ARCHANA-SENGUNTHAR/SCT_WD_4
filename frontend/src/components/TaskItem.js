import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './TaskItem.css';

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDueDate, setNewDueDate] = useState(task.dueDate || '');

  const toggleComplete = async () => {
     await axiosInstance.put(`/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });
    window.location.reload();
  };

  const deleteTask = async () => {
    await axiosInstance.delete(`/tasks/${task._id}`);
    window.location.reload();
  };

  const saveEdits = async () => {
    await axiosInstance.put(`/tasks/${task._id}`, {
      title: newTitle,
      dueDate: newDueDate,
    });
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={toggleComplete} />

      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="datetime-local"
            value={newDueDate ? new Date(newDueDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <button onClick={saveEdits}>💾 Save</button>
          <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          {task.dueDate && (
            <span className="due-date">
              📅 {new Date(task.dueDate).toLocaleString()}
            </span>
          )}
          <div className="task-controls">
            <button onClick={() => setIsEditing(true)}>✏️ Rename</button>
            <button onClick={deleteTask}>🗑️ Delete</button>
          </div>
        </>
      )}

      <div className="history">
        <small>🕒 Created: {new Date(task.createdAt).toLocaleString()}</small>
        {task.updatedAt && task.updatedAt !== task.createdAt && (
          <small>🔁 Updated: {new Date(task.updatedAt).toLocaleString()}</small>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
