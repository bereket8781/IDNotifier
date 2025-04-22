require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const path       = require('path');
const logger     = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routers
const authRoutes    = require('./routes/authRoutes');
const importRoutes  = require('./routes/importRoutes');
const citizenRoutes = require('./routes/citizenRoutes');
const smsRoutes     = require('./routes/smsRoutes');

const app = express();

// --- Global Middleware ---
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Wire morgan into Winston
app.use(morgan('combined', { stream: logger.stream }));

// --- Static Assets ---
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// --- API Routes ---
app.use('/api/auth',     authRoutes);
app.use('/api/import',   importRoutes);
app.use('/api/citizens', citizenRoutes);
app.use('/api/sms',      smsRoutes);

// --- Error Handler (must be last) ---
app.use(errorHandler);

module.exports = app;