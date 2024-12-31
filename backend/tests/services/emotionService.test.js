// // tests/services/emotionService.test.js
// import axios from 'axios';
// import { detectEmotion } from '../../services/emotionService.js';

// process.env.MODEL_URL = 'https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion';
// process.env.HF_API_TOKEN = 'test-token';

// // Mock axios
// jest.mock('axios');

// describe('emotionService', () => {
//     afterEach(() => {
//       jest.clearAllMocks();
//     });
  
//     test('detectEmotion returns "happy" for top label "joy"', async () => {
//       // Setup mock response from Hugging Face
//       axios.post.mockResolvedValueOnce({
//           data: 'joy' // Adjusted based on the actual API output for T5
//       });
  
//       const mood = await detectEmotion("I am very glad today!");
//       expect(mood).toBe('happy');
//     });
  
//     test('detectEmotion returns null if response is empty', async () => {
//       axios.post.mockResolvedValueOnce({ data: [] });
  
//       const mood = await detectEmotion("Empty response?");
//       expect(mood).toBe(null);
//     });
  
//     test('detectEmotion handles errors gracefully', async () => {
//       axios.post.mockRejectedValueOnce(new Error('API error'));
  
//       const mood = await detectEmotion("API might fail");
//       expect(mood).toBe(null);
//     });
// });
  
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

// Initialize Hugging Face Inference
const hf = new HfInference(process.env.HF_API_TOKEN);

// Model URL or Name
const MODEL_NAME = process.env.MODEL_URL || "mrm8488/t5-base-finetuned-emotion";

// Function to detect emotion
export const detectEmotion = async (text) => {
  try {
    // Make the API request
    const response = await hf.textClassification({
      model: MODEL_NAME,
      inputs: text,
    });

    // Extract the top label
    if (response && response.length > 0) {
      const topLabel = response[0]?.label.toLowerCase();

      // Map Hugging Face labels to mood categories
      const moodMapping = {
        joy: "happy",
        sadness: "sad",
        anger: "angry",
        fear: "fearful",
        surprise: "surprised",
        disgust: "disgusted",
      };

      return moodMapping[topLabel] || null;
    }

    return null; // Return null if no label is found
  } catch (error) {
    console.error("Error detecting emotion:", error.message);
    return null; // Handle errors gracefully
  }
};
