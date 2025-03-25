# 🎵 Spotify Mood-Based Recommendation System

An intelligent, full-stack application that recommends music based on how you're feeling. Powered by NLP, OpenAI, and Spotify, this project integrates cloud infrastructure, machine learning, and microservices to deliver dynamic, mood-based song suggestions.

---

## 🚀 Features

- 🎯 **Emotion Detection**: Uses a finetuned T5 Transformer model to detect emotions from user input.
- 💡 **OpenAI Integration**: Generates curated song recommendations using ChatGPT based on your mood.
- 🎧 **Spotify Integration**: Searches and serves real Spotify tracks, with options to like or add them to your playlists.
- 🔁 **OAuth2 Login**: Lets users authenticate with their Spotify account to interact with personal data.
- 📦 **Modular Microservices**: Node.js backend & FastAPI Python service work independently and communicate via HTTP.
- ✅ **CI/CD Ready**: GitHub Actions pipeline for automated backend/frontend testing and coverage reporting.
- ☁️ **Cloud-Deployable**: Built for production using scalable cloud infrastructure.

---

## 🛠️ Tech Stack

| Layer             | Technology                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Frontend          | React.js (assumed based on structure)                                       |
| Backend           | Node.js, Express.js                                                         |
| ML Microservice   | Python, FastAPI, Hugging Face Transformers (`T5` model)                     |
| NLP Model         | `mrm8488/t5-base-finetuned-emotion`                                         |
| OpenAI            | ChatGPT via OpenAI API (JSON-based music suggestions)                       |
| Music Data        | Spotify Web API (track search, OAuth, playback metadata)                    |
| CI/CD             | GitHub Actions                                                              |
| Deployment        | Google Cloud Platform (Cloud Run, Load Balancer, Cloud DNS)                 |
| Domain            | Purchased and routed through [Porkbun](https://porkbun.com)                 |

---

## 🌐 Deployment & Infrastructure

This project is deployed using **Google Cloud Platform**, ensuring high availability and scalability.

- **Compute & Scaling**: Deployed via **Google Cloud Run**, auto-scales based on incoming requests.
- **Routing**: Google **Cloud Load Balancer** distributes traffic and connects services efficiently.
- **Domain Setup**: Custom domain purchased via **Porkbun**, routed through GCP using **Cloud DNS**.
- **Security**: Environment variables (API keys, secrets) managed securely via deployment secrets.

> 🧠 This setup makes the system robust, secure, and ready for real-world usage.

---

## 🧪 How It Works – End to End

```plaintext
User Input -> Emotion Detection (Python Microservice) 
           -> GPT Song Recommendation (OpenAI) 
           -> Spotify Track Search (Node.js Backend) 
           -> Results Delivered to Frontend
