const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
   userId: {                  // Associate task with logged-in user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
