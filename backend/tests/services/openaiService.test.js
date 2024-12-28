// Import the function to test
const { callChatGPT } = require('../../services/openaiService');

// Mock the OpenAI library
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(() => {
          // Simulate an API error
          throw new Error("Invalid 'messages': Array cannot be empty.");
        }),
      },
    },
  }));
});

// Test case for error handling
test('should handle OpenAI API errors gracefully', async () => {
  try {
    // Pass an invalid input (empty array) to trigger the error
    await callChatGPT([]);
    // Fail the test if no error is thrown
    throw new Error('Test failed. Error was not thrown.');
  } catch (error) {
    // Dynamically match error messages to handle variations
    expect(error.message).toMatch(/Failed to generate AI response|Invalid 'messages'/);
  }
});
