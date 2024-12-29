// tests/routes/openaiRoute.test.js
import request from 'supertest';
import app from '../../server.js';
import * as openaiService from '../../services/openaiService.js';

jest.mock('../../services/openaiService.js');

describe('openaiRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/openai/recommend returns songs', async () => {
    openaiService.getSongRecommendations.mockResolvedValue([
      { title: "Song A", artist: "Artist A" },
      { title: "Song B", artist: "Artist B" }
    ]);

    const response = await request(app)
      .post('/api/openai/recommend')
      .send({ userText: "I'm feeling pumped!", mood: "happy" });

    expect(response.status).toBe(200);
    expect(response.body.songs).toHaveLength(2);
    expect(response.body.songs[0].title).toBe("Song A");
  });

  test('POST /api/openai/recommend requires mood', async () => {
    const response = await request(app)
      .post('/api/openai/recommend')
      .send({ userText: "No mood here" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Mood is required');
  });
});
