# app.py (Python 3, FastAPI)
from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

class TextInput(BaseModel):
    text: str

app = FastAPI()

# Load your model and tokenizer once
model_name = "mrm8488/t5-base-finetuned-emotion"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

@app.post("/predict")
async def predict_emotion(payload: TextInput):
    # 1. Preprocess input
    input_text = "emotion: " + payload.text
    encoded_input = tokenizer.encode(input_text, return_tensors="pt")
    
    # 2. Generate output
    output_sequences = model.generate(
        encoded_input,
        max_length=15,
        num_beams=2,
        num_return_sequences=1
    )
    
    # 3. Decode
    decoded_output = tokenizer.decode(output_sequences[0], skip_special_tokens=True)
    # "decoded_output" might be something like "joy" or "sadness"
    
    return { "emotion": decoded_output }
