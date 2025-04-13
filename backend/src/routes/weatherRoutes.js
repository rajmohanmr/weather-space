const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Middleware to validate city parameter
const validateCity = (req, res, next) => {
  const { city } = req.query;
  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    return res.status(400).json({ error: 'Valid city parameter is required' });
  }
  next();
};

// Routes
router.get('/current', validateCity, weatherController.getCurrentWeather);
router.get('/forecast', validateCity, weatherController.getForecast);

module.exports = router; 