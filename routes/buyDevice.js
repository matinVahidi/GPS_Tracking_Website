// routes/buyDevice.js
import express from 'express';
import { users } from '../models/User.js';
import { products, buyProduct } from '../models/Product.js';
import { createDevice, soldDeviceMap } from '../models/Device.js';

const router = express.Router();

// GET /api/devices/available
router.get('/devices/available', (req, res) => {
  const availableProducts = products.filter(p => p.unitsOnSale > 0 && p.isAvailable);
  res.json({ products: availableProducts });
});

// POST /api/devices/buy
// Body: { userId, productId, name }
router.post('/devices/buy', (req, res) => {
  const { userId, productId, name } = req.body;

  if (!userId || !productId || !name) {
    return res.status(400).json({ message: 'Missing userId, productId, or name' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const product = products.find(p => p.id === productId);
  if (!product || product.unitsOnSale <= 0 || !product.isAvailable) {
    return res.status(404).json({ message: 'Product not available for sale' });
  }

  // Update product data
  buyProduct(productId);

  // Create new Device from Product
  const newDevice = createDevice(userId, name);

  // Store in sold device map
  soldDeviceMap.set(newDevice.id, newDevice);

  // Add deviceId to user
  user.deviceIds.push(newDevice.id);

  res.status(200).json({
    message: 'Device purchased successfully',
    deviceId: newDevice.id
  });
});

export default router;
