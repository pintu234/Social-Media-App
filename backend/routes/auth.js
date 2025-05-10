const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    // Check if the user already exists
    if(existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, email, password: password });
    await user.save();
    res.json({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token });
});

module.exports = router;
