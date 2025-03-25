
# 🎵 Spotify Mood-Based Recommendation System

An intelligent, full-stack music recommendation system powered by NLP, OpenAI, and Spotify. This application dynamically suggests songs based on your emotional state—using machine learning, microservices, and real-time cloud infrastructure.

---

## 🚀 Features

- 🧠 **Emotion Detection**: Classifies your mood from text using a T5 Transformer model.
- 🤖 **AI Recommendations**: OpenAI ChatGPT suggests mood-aligned songs in real-time.
- 🎧 **Spotify Integration**: Searches for playable Spotify tracks and enables user actions (like, add to playlist).
- 🔐 **OAuth2 Authentication**: Lets users interact with their Spotify library securely.
- ☁️ **Cloud-Ready**: Designed for scalable deployment on Google Cloud Platform.
- 🧪 **CI/CD Enabled**: GitHub Actions automate testing and build validation for every push.

---

## 🧭 Architecture Overview

<pre lang="markdown"> \`\`\`plaintext +----------------------+ | Frontend (React) | +----------+-----------+ | v +-------------+-------------+ | Node.js Backend | | (Express.js) | +------+------+-------------+ | | | v v v +-------------+ +---+--+ +---+---+ | OpenAI GPT | |Spotify| |OAuth | | Recommender | | API | | Login | +-------------+ +------+ +--------+ | v +-------+--------+ | Python FastAPI | | Microservice | +-------+--------+ | v +-------+--------+ | T5 Model | | (Emotion NLP) | +----------------+ \`\`\` </pre>

> From user input to song output, this architecture combines microservices, GPT intelligence, and cloud-native deployment.

---

## 🛠️ Tech Stack

| Layer             | Technology                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Frontend          | React.js                                                                   |
| Backend           | Node.js, Express.js                                                        |
| ML Microservice   | Python, FastAPI, Hugging Face Transformers (`T5`)                          |
| AI Model          | OpenAI GPT-4 / GPT-3.5 (via Chat API)                                      |
| Music API         | Spotify Web API                                                            |
| User Auth         | Spotify OAuth2                                                             |
| Deployment        | Google Cloud Run + Load Balancer                                           |
| Routing           | Google Cloud DNS                                                           |
| Domain            | Purchased via [Porkbun](https://porkbun.com)                               |
| CI/CD             | GitHub Actions                                                             |

---

## 🌐 Deployment & Infrastructure

This system is built for production-scale deployment with the following setup:

- **GCP Cloud Run** for deploying the Node.js and FastAPI services (serverless + auto-scaling).
- **GCP Load Balancer** to route and balance traffic across services.
- **Porkbun Domain** connected to Google Cloud DNS for custom routing.
- **Environment Secrets** managed securely via GitHub and GCP secrets.

> ⚡ Cloud-native. Scalable. Secure.

---

## 🔁 Full Workflow

<pre lang="markdown"> \`\`\`plaintext +----------------------+ | Frontend (React) | +----------+-----------+ | v +-------------+-------------+ | Node.js Backend | | (Express.js) | +------+------+-------------+ | | | v v v +-------------+ +---+--+ +---+---+ | OpenAI GPT | |Spotify| |OAuth | | Recommender | | API | | Login | +-------------+ +------+ +--------+ | v +-------+--------+ | Python FastAPI | | Microservice | +-------+--------+ | v +-------+--------+ | T5 Model | | (Emotion NLP) | +----------------+ \`\`\` </pre>

1. User types in a message about their mood.
2. A FastAPI service uses a finetuned T5 model to detect emotion.
3. The backend uses OpenAI to generate a playlist based on mood.
4. Spotify API finds real songs that match the suggestions.
5. User listens, likes, or saves songs to their playlist.

---

## 🧪 Local Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/Spotify_Recommendation.git
cd Spotify_Recommendation
```

---

### 2. Python Microservice (Emotion Detection)

```bash
cd backend_python
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

---

### 3. Node.js Backend

```bash
cd ../backend
npm install
```

#### Create a `.env` file with the following:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
OPENAI_API_KEY=your_openai_key
```

Start the backend:

```bash
npm start
```

---

### 4. Frontend

```bash
cd ../frontend
npm install
npm start
```

Open your browser at `http://localhost:3000`.

---

## ✅ Running Tests

### Backend (Jest)

```bash
cd backend
npm test
```

### Frontend (Lint & Build)

```bash
cd frontend
npm run lint
npm run build
```

---

## ⚙️ GitHub Actions CI

The project includes a fully configured GitHub Actions pipeline:

- ✅ Backend Unit Tests (Jest)
- ✅ Frontend Linting and Build
- ✅ Uploads coverage artifacts
- ⚙️ Ready for deployment extension

---

## 🧱 Future Improvements

- 🎤 Voice-based emotion detection
- 🎨 Personalized music styling using Spotify analytics
- 📲 Mobile app with React Native
- 📡 Multi-language emotion classification

---

## 🧑‍💻 Author

**Your Name**  
Full-stack developer | AI Integrator | Cloud-native enthusiast

---

## 📄 License

MIT License — feel free to fork, adapt, and build on this project.

---

## 🌍 Live Demo (Optional)

👉 [Coming Soon] — hosted via Google Cloud Run with Porkbun domain integration.

---

## 🤝 Contributions

Open to contributions! Fork this repo, create a new branch, and submit a PR.

---
