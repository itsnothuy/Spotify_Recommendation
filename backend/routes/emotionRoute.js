const express = require("express");
const router = express.Router();
const { detectEmotion } = require("../services/emotionService");

// POST: Predict emotion
router.post("/predict-emotion", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const emotion = await detectEmotion(text);
    res.json({ emotion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
