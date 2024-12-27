// tests/emotionService.test.js
const { detectEmotion } = require('../../services/emotionService');
const axios = require('axios');

// Jest mock for axios
jest.mock('axios');

// Suppress console.error during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('detectEmotion', () => {
  it('should return the generated_text from Hugging Face response', async () => {
    // Arrange: mock axios response
    axios.post.mockResolvedValue({
      data: [{ generated_text: 'joy' }],
    });

    // Act
    const result = await detectEmotion('I am so happy');

    // Assert
    expect(result).toBe('joy');
    expect(axios.post).toHaveBeenCalledWith(
      'https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion',
      { inputs: 'I am so happy' },
      expect.any(Object) // We won't test the exact header object here
    );
  });

  it('should default to "neutral" if response is empty', async () => {
    axios.post.mockResolvedValue({ data: [] });

    const result = await detectEmotion('No data returned');
    expect(result).toBe('neutral');
  });

  it('should throw an error if axios call fails', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    await expect(detectEmotion('Something went wrong')).rejects.toThrow(
      'Failed to detect emotion'
    );
  });

  // Additional tests for different emotions
  it('should return "happy" for a happy input', async () => {
    axios.post.mockResolvedValue({
      data: [{ generated_text: 'happy' }],
    });
    const result = await detectEmotion('I feel great today!');
    expect(result).toBe('happy');
  });

  it('should return "sad" for a sad input', async () => {
    axios.post.mockResolvedValue({
      data: [{ generated_text: 'sad' }],
    });
    const result = await detectEmotion('I am feeling very down.');
    expect(result).toBe('sad');
  });

  it('should return "angry" for an angry input', async () => {
    axios.post.mockResolvedValue({
      data: [{ generated_text: 'angry' }],
    });
    const result = await detectEmotion('I am so mad at you!');
    expect(result).toBe('angry');
  });

  it('should return "surprised" for a surprised input', async () => {
    axios.post.mockResolvedValue({
      data: [{ generated_text: 'surprised' }],
    });
    const result = await detectEmotion("Wow! I can't believe it!");
    expect(result).toBe('surprised');
  });

  it('should return "fearful" for a fearful input', async () => {
    axios.post.mockResolvedValue({
      data: [{ generated_text: 'fearful' }],
    });
    const result = await detectEmotion('I am really scared right now.');
    expect(result).toBe('fearful');
  });
});
