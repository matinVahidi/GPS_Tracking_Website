import express from 'express';
import { products, Product } from '../models/Product.js';
import { soldDeviceMap } from '../models/Device.js';

const router = express.Router();

// POST /api/admin/products/add
// Body: { id, model, price, discount, unitsOnSale, unitsOnDiscount, comments }
router.post('/admin/products/add', (req, res) => {
  const {
    id,
    model,
    price,
    discount = 0,
    unitsOnSale = 0,
    unitsOnDiscount = 0,
    comments = []
  } = req.body;

  if (!id || !model || price == null) {
    return res.status(400).json({ message: 'Missing required fields: id, model, or price' });
  }

  if (products.find(p => p.id === id)) {
    return res.status(409).json({ message: 'Product with this ID already exists' });
  }

  const newProduct = new Product(
    id,
    model,
    price,
    discount,
    unitsOnSale,
    0, // numberOfSold
    unitsOnDiscount,
    true, // isAvailable
    comments
  );

  products.push(newProduct);

  res.status(201).json({ message: 'Product added to store', product: newProduct });
});

// GET /api/admin/devices/all
router.get('/admin/devices/all', (req, res) => {
  const soldDevices = Array.from(soldDeviceMap.values());

  res.json({
    products,
    soldDevices
  });
});

export default router;
