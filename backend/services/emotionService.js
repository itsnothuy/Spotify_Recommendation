// server/services/emotionDetectionService.js
import axios from 'axios';

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const MODEL_URL = process.env.MODEL_URL; // Ensure this is defined


const EMOTION_TO_MOOD = {
  joy: 'happy',
  excitement: 'happy',
  love: 'happy',
  sadness: 'sad',
  anger: 'angry',
  fear: 'anxious',
  surprise: 'surprised'
};

/**
 * Maps detected emotion to a generalized mood.
 * @param {string} emotion - Detected emotion.
 * @returns {string} - Mapped mood.
 */
function mapToMood(emotion) {
  return EMOTION_TO_MOOD[emotion] || 'neutral'; // Fallback to 'neutral' for undefined emotions
}

/**
 * Calls the Hugging Face API to detect the emotion in a given text.
 * @param {string} text - The user's text input.
 * @returns {string} - The detected emotion (e.g., 'sadness', 'joy', 'neutral', etc.).
 */
export async function detectEmotion(text) {
  try {
    const response = await axios.post(
      MODEL_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`
        }
      }
    );

    // Handle model response
    const predictions = typeof response.data === 'string'
      ? [{ label: response.data, score: 1.0 }] // Handle plain-text output
      : response.data; // Handle structured JSON

    if (!Array.isArray(predictions) || predictions.length === 0) {
      return null;
    }

    // Sort predictions and find the top label
    const sorted = predictions.sort((a, b) => b.score - a.score);
    const topLabel = sorted[0].label.toLowerCase();

    // Map emotion to mood
    return mapToMood(topLabel);

  } catch (error) {
    console.error('Error calling Hugging Face API:', error.message);
    return null;
  }
}