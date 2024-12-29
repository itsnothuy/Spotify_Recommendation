// server/services/chatgptService.js
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Calls the OpenAI ChatGPT API to get a response.
 * @param {Array} messages - Array of messages in the format [{ role: 'user'|'assistant'|'system', content: '...' }, ...].
 * @param {string} systemPrompt - The system prompt that sets the context for ChatGPT.
 * @returns {string} - The assistant's reply.
 */
export async function getSongRecommendations(userText, mood) {
  const systemPrompt = `
    You are a music expert. Based on the mood: "${mood}",
    provide 5 song suggestions with title and artist. 
    The final result should be a JSON list with { "title", "artist" } objects.
  `;

  const userPrompt = userText || 'No user text provided';

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const content = response.data.choices[0].message.content;
    let songs;

    try {
      songs = JSON.parse(content);
    } catch (err) {
      console.warn('Failed to parse JSON from ChatGPT. Raw content:', content);
      songs = [];
    }

    return songs;
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    return [];
  }
}
