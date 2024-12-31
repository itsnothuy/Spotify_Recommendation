// tests/routes/emotionRoute.test.js
import request from 'supertest';
import app from '../../server.js';  // Our Express app
import * as emotionService from '../../services/emotionService.js';

// We'll mock the detectEmotion function so we don't call Hugging Face for real
jest.mock('../../services/emotionService.js');

describe('emotionRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/emotion returns mood', async () => {
    emotionService.detectEmotion.mockResolvedValue('happy');

    const response = await request(app)
      .post('/api/emotion')
      .send({ text: 'I am super happy!' });

    expect(response.status).toBe(200);
    expect(response.body.mood).toBe('happy');
  });

  test('POST /api/emotion with no text returns 400', async () => {
    const response = await request(app)
      .post('/api/emotion')
      .send({ });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing text field');
  });
});

