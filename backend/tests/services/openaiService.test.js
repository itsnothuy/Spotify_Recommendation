// tests/services/openaiService.test.js
import axios from 'axios';
import { getSongRecommendations } from '../../services/openaiService.js';

jest.mock('axios');

describe('openaiService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getSongRecommendations returns parsed songs', async () => {
    // Mocked ChatGPT response
    const mockCompletion = {
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify([
                { title: "Song A", artist: "Artist A" },
                { title: "Song B", artist: "Artist B" }
              ])
            }
          }
        ]
      }
    };

    axios.post.mockResolvedValueOnce(mockCompletion);

    const songs = await getSongRecommendations("I am happy", "happy");
    expect(songs).toHaveLength(2);
    expect(songs[0].title).toBe("Song A");
  });

  test('getSongRecommendations returns empty array if JSON parse fails', async () => {
    // Invalid JSON in content
    const mockCompletion = {
      data: {
        choices: [
          {
            message: {
              content: "<not valid JSON>"
            }
          }
        ]
      }
    };

    axios.post.mockResolvedValueOnce(mockCompletion);

    const songs = await getSongRecommendations("user text", "happy");
    expect(songs).toEqual([]);
  });

  test('getSongRecommendations handles API error', async () => {
    axios.post.mockRejectedValueOnce(new Error('API error'));

    const songs = await getSongRecommendations("user text", "happy");
    expect(songs).toEqual([]);
  });
});
