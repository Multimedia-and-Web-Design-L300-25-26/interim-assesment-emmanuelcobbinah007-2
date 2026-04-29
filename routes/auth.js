import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const authRoutes = express.Router();

// LOGIN ROUTE
authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// SIGNUP ROUTE
authRoutes.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGOUT ROUTE (optional, since JWT is stateless, this will be handled on the frontend by deleting the token)
authRoutes.post('/logout', (req, res) => {
  // Invalidate the token on the client side by deleting it
  res.json({ message: 'Logged out successfully' });
});

export default authRoutes;