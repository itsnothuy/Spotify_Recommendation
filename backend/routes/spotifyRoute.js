// routes/spotifyRoute.js (ESM)
import express from 'express';
import { detectEmotion } from '../services/emotionService.js';
import { getSongRecommendations } from '../services/openaiService.js';
import { searchTrack } from '../services/spotifyService.js';

const router = express.Router();

router.post('/mood', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text field' });
  }

  try {
    // 1. (Optional) Detect emotion
    const mood = await detectEmotion(text) || 'neutral';

    // 2. Query ChatGPT for song recommendations
    const songs = await getSongRecommendations(text, mood);

    // 3. For each recommended track, call Spotify search
    const spotifyResults = [];
    for (const song of songs) {
      const { title, artist } = song;
      if (!title) continue;

      const trackData = await searchTrack(title, artist);
      if (trackData) {
        spotifyResults.push(trackData);
      }
    }

    res.json({ mood, recommendedSongs: spotifyResults });

  } catch (error) {
    console.error('Error in Spotify mood endpoint:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;
