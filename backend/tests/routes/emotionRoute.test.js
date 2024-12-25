// tests/emotionRoute.test.js
const request = require('supertest');
const app = require('../../server');
const axios = require('axios');

// Mock axios to avoid real calls
jest.mock('axios');

describe('POST /api/predict-emotion', () => {
  it('should return emotion if text is provided', async () => {
    // Arrange
    axios.post.mockResolvedValue({
      data: [{ generated_text: 'joy' }],
    });

    // Act
    const response = await request(app)
      .post('/api/predict-emotion')
      .send({ text: 'I feel great' });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.emotion).toBe('joy');
  });

  it('should return 400 if text is not provided', async () => {
    const response = await request(app).post('/api/predict-emotion').send({});
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'Text is required' });
  });

  it('should return 500 if detectEmotion throws an error', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    const response = await request(app)
      .post('/api/predict-emotion')
      .send({ text: 'this will fail' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to detect emotion');
  });
});
