const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./src/config/config');
const weatherRoutes = require('./src/routes/weatherRoutes');
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  process.exit(1);
});

// Mongoose schema for storing search history
const searchHistorySchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  condition: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

// Routes
app.use('/api/weather', weatherRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Fetch weather by city (main endpoint)
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city;

    if (!city || typeof city !== 'string' || city.trim() === '') {
      return res.status(400).json({ error: 'Invalid city parameter' });
    }

    const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
      },
    });

    const { temp_c, condition } = response.data.current;

    // Save search to DB
    const newSearch = new SearchHistory({
      city,
      temperature: temp_c,
      condition: condition.text,
    });

    await newSearch.save();

    res.json(response.data);
  } catch (error) {
    console.error('❌ Weather fetch error:', error.message);
    if (error.response) {
      res.status(error.response.status).json({
        error: 'Failed to fetch weather data',
        details: error.response.data,
      });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Search weather (alias of the above for /search)
app.get('/api/weather/search', async (req, res) => {
  try {
    const city = req.query.city;

    if (!city || typeof city !== 'string' || city.trim() === '') {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
      },
    });

    const { temp_c, condition } = response.data.current;

    const newSearch = new SearchHistory({
      city,
      temperature: temp_c,
      condition: condition.text,
    });

    await newSearch.save();

    res.json(response.data);
  } catch (error) {
    console.error('❌ Weather search error:', error.message);
    if (error.response) {
      res.status(error.response.status).json({
        error: 'Failed to fetch weather data',
        details: error.response.data,
      });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Get search history (limit last 10)
app.get('/api/weather/history', async (req, res) => {
  try {
    const history = await SearchHistory.find().sort({ date: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    console.error('❌ Fetch history error:', error.message);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// Delete all search history
app.delete('/api/weather/history', async (req, res) => {
  try {
    await SearchHistory.deleteMany({});
    res.status(200).json({ message: 'Search history cleared successfully' });
  } catch (error) {
    console.error('❌ Clear history error:', error.message);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});
