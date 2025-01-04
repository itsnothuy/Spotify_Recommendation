// tests/services/emotionService.test.js
import axios from 'axios';
import { detectEmotion } from '../../services/emotionService.js';

process.env.MODEL_URL = 'https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion';
process.env.HF_API_TOKEN = 'test-token';

// Mock axios
jest.mock('axios');

describe('emotionService', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('detectEmotion returns "happy" for top label "joy"', async () => {
      // Setup mock response from Hugging Face
      axios.post.mockResolvedValueOnce({
          data: 'joy' // Adjusted based on the actual API output for T5
      });
  
      const mood = await detectEmotion("I am very glad today!");
      expect(mood).toBe('happy');
    });
  
    test('detectEmotion returns null if response is empty', async () => {
      axios.post.mockResolvedValueOnce({ data: [] });
  
      const mood = await detectEmotion("Empty response?");
      expect(mood).toBe(null);
    });
  
    test('detectEmotion handles errors gracefully', async () => {
      axios.post.mockRejectedValueOnce(new Error('API error'));
  
      const mood = await detectEmotion("API might fail");
      expect(mood).toBe(null);
    });
});
  
