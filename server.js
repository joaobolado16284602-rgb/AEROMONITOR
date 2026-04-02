// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// CORS configuration
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost:27017/aeromonitor', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
const flightsRoutes = require('./routes/flights');

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
