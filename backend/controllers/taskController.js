const Task = require('../models/Task');

//Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a task for logged-in user - CreateTask Function
exports.createTask = async (req, res) => {
  const { title, dueDate } = req.body;

  try {
    const task = await Task.create({
      title,
      dueDate,
      userId: req.user.userId, // Associate task with user
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update task only if it belongs to user
exports.updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task only if it belongs to user
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle task complete status
exports.toggleTaskComplete = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
