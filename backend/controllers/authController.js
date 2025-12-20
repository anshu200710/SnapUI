// controllers/authController.js
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields required.' });
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(409).json({ message: 'User already exists.' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed, role });
    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, username, email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials.' });
    const token = generateToken(user);
    res.json({ user: { id: user._id, username: user.username, email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
