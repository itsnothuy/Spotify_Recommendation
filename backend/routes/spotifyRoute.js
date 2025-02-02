// routes/spotifyRoute.js (ESM)
import express from 'express';
import { detectEmotion } from '../services/emotionService.js';
import { getSongRecommendations } from '../services/openaiService.js';
import {
  getSpotifyLoginUrl,
  getUserTokens,
  refreshUserToken,
  likeTrack,
  addToPlaylist,
  searchTrack,
} from '../services/spotifyService.js';

const router = express.Router();

// 1. Spotify Login Route
router.get('/login', (req, res) => {
  console.log('[GET /login] SESSION ID:', req.sessionID);
  console.log('[GET /login] SESSION DATA:', req.session);

  const state = 'someRandomState'; // Optional state parameter for CSRF protection
  const loginUrl = getSpotifyLoginUrl(state);
  res.redirect(loginUrl);
});

router.get("/me", (req, res) => {
  console.log('[GET /me] SESSION ID:', req.sessionID);
  console.log('[GET /me] SESSION DATA:', req.session);

  if (!req.session.spotifyAccessToken) {
    return res.status(401).json({ error: "Not logged in" });
  }
  // Optionally, fetch user profile from Spotify 
  // or just return { isAuthenticated: true }
  res.json({ isAuthenticated: true });
});

// 2. Spotify Callback Route
router.get('/callback', async (req, res) => {

  console.log('[GET /callback] SESSION ID:', req.sessionID);
  console.log('[GET /callback] SESSION DATA BEFORE storing tokens:', req.session);

  const { code, error } = req.query;
  if (error) {
    return res.status(400).send(`Spotify Authorization Error: ${error}`);
  }
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const tokenData = await getUserTokens(code);

    // Store tokens in session (or database for production apps)
    req.session.spotifyAccessToken = tokenData.access_token;
    req.session.spotifyRefreshToken = tokenData.refresh_token;
    req.session.spotifyTokenExpiresAt = Date.now() + tokenData.expires_in * 1000;

    console.log('[GET /refresh-token] AFTER REFRESH, SESSION DATA:', req.session);
    return res.redirect('https://musicfinder.app?spotifyAuth=success');
  } catch (err) {
    console.error('Callback error:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// 3. Refresh Spotify Token
router.get('/refresh-token', async (req, res) => {
  console.log('[GET /refresh-token] SESSION ID:', req.sessionID);
  console.log('[GET /refresh-token] SESSION DATA:', req.session);

  const refreshToken = req.session.spotifyRefreshToken;
  if (!refreshToken) {
    return res.status(400).json({ error: 'No refresh token found' });
  }

  try {
    const tokenData = await refreshUserToken(refreshToken);
    req.session.spotifyAccessToken = tokenData.access_token;
    req.session.spotifyTokenExpiresAt = Date.now() + tokenData.expires_in * 1000;

    console.log('[GET /refresh-token] AFTER REFRESH, SESSION DATA:', req.session);
    res.json({ access_token: tokenData.access_token });
  } catch (err) {
    console.error('Error refreshing token:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 4. Like Track Route
router.post('/likeTrack', async (req, res) => {
  console.log('[POST /likeTrack] SESSION ID:', req.sessionID);
  console.log('[POST /likeTrack] SESSION DATA BEFORE liking track:', req.session);

  const { trackId } = req.body;
  if (!trackId) {
    return res.status(400).json({ error: 'trackId is required' });
  }

  let accessToken = req.session.spotifyAccessToken;
  const tokenExpiresAt = req.session.spotifyTokenExpiresAt;
  const refreshToken = req.session.spotifyRefreshToken;

  // Refresh token if expired
  if (Date.now() > tokenExpiresAt) {
    try {
      const tokenData = await refreshUserToken(refreshToken);
      accessToken = tokenData.access_token;
      req.session.spotifyAccessToken = accessToken;
      req.session.spotifyTokenExpiresAt = Date.now() + tokenData.expires_in * 1000;

      console.log('[POST /likeTrack] AFTER REFRESH, SESSION DATA:', req.session);
    } catch (err) {
      console.error('Error refreshing token during likeTrack:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  try {
    const result = await likeTrack(accessToken, trackId);
    console.log('[POST /likeTrack] Like track result:', result);

    res.json(result);
  } catch (err) {
    console.error('Error liking track:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// 5. Add Track to Playlist
router.post('/addToPlaylist', async (req, res) => {
  console.log('[POST /addToPlaylist] SESSION ID:', req.sessionID);
  console.log('[POST /addToPlaylist] SESSION DATA BEFORE adding to playlist:', req.session);

  const { playlistId, trackUri } = req.body;
  if (!playlistId || !trackUri) {
    return res.status(400).json({ error: 'Missing playlistId or trackUri' });
  }

  let accessToken = req.session.spotifyAccessToken;
  const tokenExpiresAt = req.session.spotifyTokenExpiresAt;
  const refreshToken = req.session.spotifyRefreshToken;

  // Refresh token if expired
  if (Date.now() > tokenExpiresAt) {
    try {
      const tokenData = await refreshUserToken(refreshToken);
      accessToken = tokenData.access_token;
      req.session.spotifyAccessToken = accessToken;
      req.session.spotifyTokenExpiresAt = Date.now() + tokenData.expires_in * 1000;

      console.log('[POST /addToPlaylist] AFTER REFRESH, SESSION DATA:', req.session);
    } catch (err) {
      console.error('Error refreshing token during addToPlaylist:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  try {
    const result = await addToPlaylist(accessToken, playlistId, trackUri);
    console.log('[POST /addToPlaylist] Add track result:', result);

    res.json(result);
  } catch (err) {
    console.error('Error adding track to playlist:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 6. Mood-Based Recommendations
router.post('/mood', async (req, res) => {
  console.log('[POST /mood] SESSION ID:', req.sessionID);
  console.log('[POST /mood] SESSION DATA:', req.session);
  
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
