// server.js (ESM)
import 'dotenv/config';        // Use this instead of require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import routes with ESM
import emotionRoute from './routes/emotionRoute.js';
import openaiRoute from './routes/openaiRoute.js';
import spotifyRoute from './routes/spotifyRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api/emotion', emotionRoute);
app.use('/api/openai', openaiRoute);
app.use('/api/spotify', spotifyRoute);

app.get('/', (req, res) => {
  res.send('Hello from Chat-Mood-Backend (ESM)!');
});

export default app;
