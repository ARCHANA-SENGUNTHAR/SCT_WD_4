const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Store in .env

// Registration Controller
exports.register = async (req, res) => {
  console.log("✅ Register endpoint hit"); 
  try {
    const { name, email, password } = req.body;

    // Checking for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: '1h',
    });

    //Sending full user info
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

