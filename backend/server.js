const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//First register unprotected auth routes
app.use('/api/auth', authRoutes);

//Then protect and register task routes
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('DB connection error:', err.message);
});
