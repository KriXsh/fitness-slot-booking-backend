const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const getRedisClient = require('./config/redis');
const bookingRoutes = require('./routes/booking');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connection initialized');

    // Connect to Redis
    return getRedisClient();
  })
  .then(() => {
    console.log('Redis connection initialized');

    // Routes
    app.use('/api/booking', bookingRoutes);

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during startup:', error);
  });
