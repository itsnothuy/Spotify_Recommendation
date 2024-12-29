// tests/routes/spotifyRoute.test.js
import request from 'supertest';
import app from '../../server.js';
import * as emotionService from '../../services/emotionService.js';
import * as openaiService from '../../services/openaiService.js';
import * as spotifyService from '../../services/spotifyService.js';

jest.mock('../../services/emotionService.js');
jest.mock('../../services/openaiService.js');
jest.mock('../../services/spotifyService.js');

describe('spotifyRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/spotify/mood returns recommended songs', async () => {
    // Mock emotion detection
    emotionService.detectEmotion.mockResolvedValue('happy');

    // Mock ChatGPT recommendations
    openaiService.getSongRecommendations.mockResolvedValue([
      { title: "Song A", artist: "Artist A" },
      { title: "Song B", artist: "Artist B" }
    ]);

    // Mock Spotify search results
    spotifyService.searchTrack
      .mockResolvedValueOnce({
        spotify_id: 'idA',
        title: 'Song A',
        artist: 'Artist A',
        album_art_url: '...',
        preview_url: '...'
      })
      .mockResolvedValueOnce({
        spotify_id: 'idB',
        title: 'Song B',
        artist: 'Artist B',
        album_art_url: '...',
        preview_url: '...'
      });

    const response = await request(app)
      .post('/api/spotify/mood')
      .send({ text: 'I am super happy today!' });

    expect(response.status).toBe(200);
    expect(response.body.mood).toBe('happy');
    expect(response.body.recommendedSongs).toHaveLength(2);
    expect(response.body.recommendedSongs[0].spotify_id).toBe('idA');
  });

  test('POST /api/spotify/mood with no text returns 400', async () => {
    const response = await request(app)
      .post('/api/spotify/mood')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing text field');
  });
});
