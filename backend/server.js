// server.js (ESM)
import 'dotenv/config';        // Use this instead of require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';


// Import routes with ESM
import emotionRoute from './routes/emotionRoute.js';
import openaiRoute from './routes/openaiRoute.js';
import spotifyRoute from './routes/spotifyRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // let cookies pass
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'none',  // <--- if you want truly cross-site
      secure: false,     // for local dev; in production you'd set true w/ HTTPS
    },
  })
);

app.use('/api/emotion', emotionRoute);
app.use('/api/openai', openaiRoute);
app.use('/api/spotify', spotifyRoute);

app.get('/', (req, res) => {
  res.send('Hello from Chat-Mood-Backend (ESM)!');
});

export default app;
