// routes/signup.js
import express from 'express';
import bcrypt from 'bcrypt';
import { User, users } from '../models/User.js';

const router = express.Router();

function makeNewId() {
  if (users.length === 0) return 1;
  const ids = users.map(u => u.id);
  return Math.max(...ids) + 1;
}

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(makeNewId(), email, hashedPassword, name, []);
  users.push(newUser);

  return res.status(201).json({
    message: 'Signup successful',
    userId: newUser.id
  });
});

export default router;
