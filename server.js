// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Store the data in memory (simple object)
let deviceData = [];

// Middlewares
app.use(express.json()); // for JSON data
app.use(express.urlencoded({ extended: true })); // for URL-encoded data

// Simple POST endpoint for your device to send data
app.post('/ingest', async (req, res) => {
    try{
        const {deviceId, latitude, longitude, timestamp, accuracy, altitude, speed, heading, battery, status } = req.body;

        // Save data in memory (add to list), null/empty fields are allowed
        deviceData.push({
            deviceId: deviceId,
            latitude: latitude , // if empty string or undefined, set as null
            longitude: longitude ,
            timestamp: timestamp ,
            accuracy: accuracy ,
            altitude: altitude ,
            speed: speed ,
            heading: heading ,
            battery: battery ,
            status: status ,
        });

        // Respond back with success
        res.send({ success: true });
    } catch(error){
        console.log(error.message);
    }
});

// Endpoint to get all stored data (for frontend)
app.get('/data', (req, res) => {
  res.json(deviceData);
});

// Serve static HTML
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, '213.233.184.186', () => {
  console.log(`Server is running on http://213.233.184.186:${PORT}`);
});
