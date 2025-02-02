# Use a compatible base image
FROM --platform=linux/amd64 python:3.10-slim

# Suppress warnings globally at runtime and build time
ENV PYTHONWARNINGS="ignore::FutureWarning"


# Set working directory
WORKDIR /usr/app

# Copy dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download Hugging Face model to reduce startup time
RUN python -c "from transformers import T5ForConditionalGeneration; \
               T5ForConditionalGeneration.from_pretrained('mrm8488/t5-base-finetuned-emotion')"

# Copy application files
COPY . .

# Add a non-root user for security
RUN adduser --disabled-password appuser
USER appuser

# Expose application port
EXPOSE 8000

# Add a health check
HEALTHCHECK CMD curl --fail http://localhost:8000/health || exit 1

# Start the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
