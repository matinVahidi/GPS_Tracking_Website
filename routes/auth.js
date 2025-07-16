// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import { users } from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  return res.json({
    message: 'Login successful',
    userId: user.id
  });
});

export default router;
