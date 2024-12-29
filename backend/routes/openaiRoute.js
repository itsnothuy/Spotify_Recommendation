// routes/openaiRoute.js (ESM)
import express from 'express';
import { getSongRecommendations } from '../services/openaiService.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
  const { userText, mood } = req.body;
  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  try {
    const songs = await getSongRecommendations(userText, mood);
    res.json({ songs });
  } catch (error) {
    console.error('Error in ChatGPT recommendation:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
