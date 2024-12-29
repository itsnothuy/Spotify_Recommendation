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

// Routes
app.use('/api/emotion', emotionRoute);   // optional
app.use('/api/openai', openaiRoute);
app.use('/api/spotify', spotifyRoute);

app.get('/', (req, res) => {
  res.send('Hello from Chat-Mood-Backend (ESM)!');
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${server.address().port}`);
  });

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${PORT} is in use. Trying another port...`);
      // Automatically find an available port
      const dynamicServer = app.listen(0, () => {
        console.log(`Server is now running on http://localhost:${dynamicServer.address().port}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });