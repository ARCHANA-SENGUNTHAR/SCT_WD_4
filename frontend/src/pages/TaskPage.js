import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './TaskPage.css';

function TaskPage() {
  return (
    <div className="task-page-container">
      <h2>📝 My Tasks</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default TaskPage;
