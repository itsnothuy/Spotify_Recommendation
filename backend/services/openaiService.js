
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


/**
 * Generates a response from OpenAI's ChatGPT API based on provided messages and optional system instructions.
 * @param {Array} messages - Chat history array [{ role: 'user', content: 'message' }].
 * @param {string} [systemPrompt] - Optional system-level prompt to guide ChatGPT behavior.
 * @returns {Promise<string>} - The AI-generated response.
 */
const callChatGPT = async (messages, systemPrompt = '') => {
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new Error("Invalid 'messages': Array cannot be empty.");
  }
  try {
    console.log('Sending request to OpenAI...');

    // Prepare message array, including an optional system prompt
    const formattedMessages = [];
    if (systemPrompt) {
      formattedMessages.push({ role: 'system', content: systemPrompt });
    }
    formattedMessages.push(...messages);

    // Make the API call to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Change this to 'gpt-4o-mini' or another model as needed
      messages: formattedMessages,
      max_tokens: 300, // Adjust token limit based on expected response length
      temperature: 0.7, // Adjust temperature for creativity level
      top_p: 0.9,
    });

    // Debug log for the entire response
    console.log('Response from OpenAI:', JSON.stringify(response, null, 2));

    // Extract and return the AI-generated message
    const aiMessage = response.choices[0].message.content;
    console.log('Extracted AI Message:', aiMessage);
    return aiMessage.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate AI response.');
  }
};
  
module.exports = { callChatGPT };
  