import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './TaskForm.css';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await axiosInstance.post('/tasks', { title, dueDate }); //Using axiosInstance
      setTitle('');
      setDueDate('');
      window.location.reload(); 
    } catch (err) {
      console.error('Task creation failed:', err);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
