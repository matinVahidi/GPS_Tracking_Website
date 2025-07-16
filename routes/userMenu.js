// routes/userMenu.js

import express from 'express';
import { users } from '../models/User.js';

const router = express.Router();

/**
 * GET /api/user/devices/:userId
 * Responds with { deviceIds: [...] } (an array of strings).
 */
router.get('/user/devices/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user   = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // user.deviceIds is already an array of deviceId strings
  return res.json({ deviceIds: user.deviceIds });
});

export default router;
