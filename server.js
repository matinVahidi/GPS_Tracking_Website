// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');    // <-- add this
const https = require('https');    // <-- add this

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// POST endpoint for your device to send data
app.post('/ingest', async (req, res) => {
    try {
        const { deviceId, latitude, longitude, timestamp, accuracy, altitude, speed, heading, battery, status } = req.body;

        // Forward to HTTPS tracking server (Option B: skip cert verification)
        const agent = new https.Agent({ rejectUnauthorized: false });
        const TRACKING_SERVER_URL = 'https://localhost:80/api/track/update'; // adjust port if needed

        try {
            const response = await axios.post(TRACKING_SERVER_URL, {
                deviceId,
                latitude,
                longitude,
                status,
                timestamp,
                accuracy,
                altitude,
                speed,
                heading,
                battery
            }, { httpsAgent: agent, headers: { 'Content-Type': 'application/json' } });

            console.log('Forwarded to tracking server:', response.data);
        } catch (err) {
            console.error('Error forwarding to tracking server:', err.message);
        }

        // Respond back with success to original client
        res.send({ success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://213.233.184.186:${PORT}`);
});
