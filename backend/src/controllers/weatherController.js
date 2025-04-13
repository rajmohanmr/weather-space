const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

const formatWeatherResponse = (data) => {
  return {
    city: data.location.name,
    country: data.location.country,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    windDirection: data.current.wind_dir,
    pressure: data.current.pressure_mb,
    visibility: data.current.vis_km,
    uvIndex: data.current.uv,
    icon: data.current.condition.icon,
    feelsLike: data.current.feelslike_c,
    observationTime: data.current.last_updated
  };
};

const formatForecastResponse = (data) => {
  return data.forecast.forecastday.map(day => ({
    date: day.date,
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    condition: day.day.condition.text,
    icon: day.day.condition.icon,
    chanceOfRain: day.day.daily_chance_of_rain,
    humidity: day.day.avghumidity,
    windSpeed: day.day.maxwind_kph,
    windDirection: day.hour[12].wind_dir,
    uvIndex: day.day.uv
  }));
};

exports.getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(`${WEATHER_API_BASE_URL}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
        aqi: 'no'
      }
    });

    const formattedData = formatWeatherResponse(response.data);
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
        days: 7,
        aqi: 'no'
      }
    });

    const formattedData = formatForecastResponse(response.data);
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
  }
}; 