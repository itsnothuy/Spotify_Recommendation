// server/services/emotionDetectionService.js
// import axios from 'axios';

// const HF_API_TOKEN = process.env.HF_API_TOKEN;
// const MODEL_URL = process.env.MODEL_URL; // Ensure this is defined


// const EMOTION_TO_MOOD = {
//   joy: 'happy',
//   excitement: 'happy',
//   love: 'happy',
//   sadness: 'sad',
//   anger: 'angry',
//   fear: 'anxious',
//   surprise: 'surprised'
// };

// /**
//  * Maps detected emotion to a generalized mood.
//  * @param {string} emotion - Detected emotion.
//  * @returns {string} - Mapped mood.
//  */
// function mapToMood(emotion) {
//   return EMOTION_TO_MOOD[emotion] || 'neutral'; // Fallback to 'neutral' for undefined emotions
// }

// /**
//  * Calls the Hugging Face API to detect the emotion in a given text.
//  * @param {string} text - The user's text input.
//  * @returns {string} - The detected emotion (e.g., 'sadness', 'joy', 'neutral', etc.).
//  */
// export async function detectEmotion(text) {
//   try {
//     const response = await axios.post(
//       MODEL_URL,
//       { inputs: text },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_API_TOKEN}`
//         }
//       }
//     );

//     // Handle model response
//     const predictions = typeof response.data === 'string'
//       ? [{ label: response.data, score: 1.0 }] // Handle plain-text output
//       : response.data; // Handle structured JSON

//     if (!Array.isArray(predictions) || predictions.length === 0) {
//       return null;
//     }

//     // Sort predictions and find the top label
//     const sorted = predictions.sort((a, b) => b.score - a.score);
//     const topLabel = sorted[0].label.toLowerCase();

//     // Map emotion to mood
//     return mapToMood(topLabel);

//   } catch (error) {
//     console.error('Error calling Hugging Face API:', error.message);
//     return null;
//   }
// }



import axios from 'axios';

const EMOTION_TO_MOOD = {
  joy: 'happy',
  excitement: 'happy',
  love: 'love',
  sadness: 'sad',
  anger: 'angry',
  fear: 'anxious',
  surprise: 'surprised'
};

function mapToMood(emotion) {
  return EMOTION_TO_MOOD[emotion.toLowerCase()] || 'neutral';
}

/**
 * Calls our local Python microservice to detect the emotion in the user's text.
 * @param {string} text
 * @returns {string | null} Mapped mood string or null on error
 */
export async function detectEmotion(text) {
  try {
    // Instead of Hugging Face Inference API, call our local Python endpoint.
    // (Assume Python is running on localhost:8000)
    const response = await axios.post('http://localhost:8000/predict', { text });
    const detectedEmotion = response.data.emotion; // e.g., "joy"

    // Map e.g. "joy" -> "happy"
    return mapToMood(detectedEmotion);

  } catch (error) {
    console.error('Error calling Python emotion service:', error.message);
    return null;
  }
}


// import { HfInference } from "@huggingface/inference";
// import dotenv from "dotenv";

// dotenv.config();

// // Initialize Hugging Face API with endpointUrl
// const hf = new HfInference(process.env.HF_API_TOKEN);

// // Define endpoint URL (replace this with your actual endpoint URL)
// const ENDPOINT_URL = "mrm8488/t5-base-finetuned-emotion";

// const textt = "I am sad"
// // Detect Emotion Function
// export const detectEmotion = async (textt) => {
//   try {
//     // Custom call using 'request' to handle type-checking errors
//     const response = await hf.request({
//       url: ENDPOINT_URL,
//       inputs: textt,
//     });

//     // Process Response
//     if (Array.isArray(response) && response.length > 0) {
//       const topLabel = response[0]?.label.toLowerCase();

//       // Map emotions to mood
//       const moodMapping = {
//         joy: "happy",
//         sadness: "sad",
//         anger: "angry",
//         fear: "fearful",
//         surprise: "surprised",
//         disgust: "disgusted",
//       };
//       console.log(moodMapping[topLabel]);
//       return moodMapping[topLabel] || "neutral";
//     }

//     return "neutral";
//   } catch (error) {
//     console.error("Error detecting emotion:", error.message);
//     return "neutral"; // Return default mood if error occurs
//   }
// };
