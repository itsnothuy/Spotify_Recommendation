import { pipeline, env } from '@huggingface/transformers';

// Optional: Set cache directory for the model
env.cacheDir = './.cache';

async function testModel() {
  try {
    // Load pipeline for text2text-generation
    const classifier = await pipeline('text2text-generation', 'mrm8488/t5-base-finetuned-emotion');

    // Test input
    const text = 'I am feeling very happy today!';
    const result = await classifier(text);

    // Output result
    console.log('Input:', text);
    console.log('Predicted Emotion:', result[0].generated_text);
  } catch (error) {
    console.error('Error loading or testing the model:', error);
  }
}

// Run test
testModel();
