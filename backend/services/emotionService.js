const axios = require("axios");
require("dotenv").config();

const HF_API_KEY = process.env.HF_API_KEY;

// Emotion detection function using Hugging Face Inference API
async function detectEmotion(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
      }
    );

    // Extract label from response
    const label = response.data[0]?.generated_text || "neutral";
    return label;

  } catch (error) {
    console.error("Error in emotion detection:", error.message);
    throw new Error("Failed to detect emotion");
  }
}

module.exports = { detectEmotion };
