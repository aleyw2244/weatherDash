import express, { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

router.post('/', async (req: Request, res: Response) : Promise<any>=> {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(city);

    if (!weatherData) {
      return res.status(400).json({error: `Weather data not found for ${city}`});
    }
    
    await HistoryService.addCity(city);

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to retrieve search history" });
  }
});


// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) : Promise <any> => {});

export default router;

