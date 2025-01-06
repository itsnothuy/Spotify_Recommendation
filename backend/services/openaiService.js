// server/services/openaiService.js
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;



function parseJsonFromChatGPT(content) {
  try {
    // 1) Try to find a ```json ... ``` code block
    const match = content.match(/```json([\s\S]*?)```/);
    if (match) {
      // match[1] will be the JSON portion inside the code block
      const jsonStr = match[1].trim();
      return JSON.parse(jsonStr);
    }

    // 2) If no code block, maybe the content is already valid JSON
    return JSON.parse(content);
  } catch (error) {
    console.warn('Failed to parse JSON from ChatGPT. Raw content:', content);
    return [];
  }
}

/**
 * Calls the OpenAI ChatGPT API to get a response.
 * @param {Array} messages - Array of messages in the format [{ role: 'user'|'assistant'|'system', content: '...' }, ...].
 * @param {string} systemPrompt - The system prompt that sets the context for ChatGPT.
 * @returns {string} - The assistant's reply.
 */


export async function getSongRecommendations(userText, mood) {
  const systemPrompt = `
    You are a music expert. Based on the mood: "${mood}",
    provide 2 song suggestions with title, artist, and album. 
    The final result should be a JSON list with { "title", "artist", "album" } objects.
    [
      { "title": "...", "artist": "...", "album": "..." },
      ...
    ]
  `;

  const userPrompt = userText || 'No user text provided';

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
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
    const songs = parseJsonFromChatGPT(content);

    try {
      return songs;
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
