import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosInstance.get('/tasks') // Using axiosInstance here
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))
      )}
    </div>
  );
}

export default TaskList;
