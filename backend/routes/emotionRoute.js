// routes/emotionRoute.js (ESM)
import express from 'express';
import { detectEmotion } from '../services/emotionService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Missing text field' });
  }

  try {
    const mood = await detectEmotion(text);
    return res.json({ mood });
  } catch (error) {
    console.error('Error detecting emotion:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;