// routes/realtimeTracking.js

import express from 'express';
import { soldDeviceMap } from '../models/Device.js';

const router = express.Router();

// Map<deviceId, ServerResponse>
const sseClients = new Map();

/**
 * GET /api/track/stream/:deviceId
 *   - Immediately sends back the current device object (if found),
 *     then keeps the connection open for future updates via SSE.
 */
router.get('/track/stream/:deviceId', (req, res) => {
  const { deviceId } = req.params;

  // Look up the device in soldDeviceMap
  const device = soldDeviceMap.get(deviceId);
  if (!device) {
    return res.status(404).json({ message: 'Device not found' });
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Store this response object so we can push future updates
  sseClients.set(deviceId, res);

  // Immediately send the current device state
  res.write(`data: ${JSON.stringify({ device })}\n\n`);

  // Cleanup when client disconnects
  req.on('close', () => {
    sseClients.delete(deviceId);
  });
});

/**
 * POST /api/track/update
 *   - Receives URL-encoded form data from a GPS device,
 *     updates that device, and pushes the updated object to any SSE client.
 */
router.post(
  '/track/update',
  express.urlencoded({ extended: true }),
  (req, res) => {
    const {
      deviceId,
      latitude,
      longitude,
      timestamp,
      accuracy,
      altitude,
      speed,
      heading,
      battery,
      status
    } = req.body;

    if (!deviceId || latitude == null || longitude == null || status == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const device = soldDeviceMap.get(deviceId);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Update fields
    device.status    = status;
    device.latitude  = parseFloat(latitude);
    device.longitude = parseFloat(longitude);
    device.timestamp = timestamp ? new Date(timestamp) : new Date();
    if (accuracy) device.accuracy = parseFloat(accuracy);
    if (altitude) device.altitude = parseFloat(altitude);
    if (speed)    device.speed    = parseFloat(speed);
    if (heading)  device.heading  = parseFloat(heading);
    if (battery)  device.battery  = parseFloat(battery);

    // Push updated object to SSE client if connected
    const client = sseClients.get(deviceId);
    if (client) {
      client.write(`data: ${JSON.stringify({ device })}\n\n`);
    }

    return res.status(200).json({ message: 'Device updated' });
  }
);

export default router;
