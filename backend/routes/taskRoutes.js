const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete
} = require('../controllers/taskController');

const protect = require('../middleware/authMiddleware');

// ✅ All routes below are protected
router.use(protect);

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id/toggle', toggleTaskComplete);

module.exports = router;
