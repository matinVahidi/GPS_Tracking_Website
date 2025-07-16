// // index.js

// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import cors from 'cors';

// import authRoutes from './routes/auth.js';
// import signupRoutes from './routes/signup.js';
// import buyDeviceRoutes from './routes/buyDevice.js';
// import userMenuRoutes from './routes/userMenu.js';
// import realtimeTrackingRoutes from './routes/realtimeTracking.js';
// import adminMenuRoutes from './routes/adminMenu.js';

// const app = express();
// const PORT = process.env.PORT || 2000;
// const Ip = '0.0.0.0';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cors());
// app.use(express.json());

// app.use('/api', authRoutes);
// app.use('/api', signupRoutes);
// app.use('/api', buyDeviceRoutes);
// app.use('/api', userMenuRoutes);
// app.use('/api', realtimeTrackingRoutes);
// app.use('/api', adminMenuRoutes);

// app.use(express.static(path.join(__dirname, 'client/dist')));

// app.get('/', (req, res) => {
//   res.send('Hello from Express backend!');
// });

// app.listen(PORT, Ip, () => {
//   console.log(`Server is running on http://0.0.0.0:${PORT}`);
// });

import express from 'express';

const app = express();
const PORT = 2000;
const Ip = '0.0.0.0';

app.get('/', (req, res) => {
  res.send('Test working!');
});

app.listen(PORT, Ip, () => {
  console.log(`Test server running on http://0.0.0.0:${PORT}`);
});
