// server/services/emotionDetectionService.js
import axios from 'axios';

const HF_API_URL = "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion";
const HF_API_TOKEN = process.env.HF_API_TOKEN;


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

    const predictions = response.data;
    if (!Array.isArray(predictions) || predictions.length === 0) {
      return null;
    }

    const sorted = predictions.sort((a, b) => b.score - a.score);
    const topLabel = sorted[0].label.toLowerCase();

    return EMOTION_TO_MOOD[topLabel] || 'neutral';

  } catch (error) {
    console.error('Error calling Hugging Face API:', error.message);
    return null;
  }
}