# Emotion App

**Live Emotion Detection Web App** using React and FastAPI. Captures webcam video, detects faces with OpenCV, and predicts 7 emotions in real time using a Keras model. Includes live emotion display and dynamic charting.

---

## Features

- Real-time emotion detection from webcam
- Detects 7 emotions: Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral
- Confidence display and color-coded emotion labels
- Live emotion chart to track trends over time
- Clean and responsive UI
- Robust backend with face detection and model preprocessing

---

## Tech Stack

- **Frontend:** React.js, Axios, React Webcam, Recharts
- **Backend:** Python, FastAPI, OpenCV, TensorFlow/Keras, Pillow
- **Development Tools:** Node.js, npm

---

## Backend Setup

```
cd backend
python -m venv env
# Activate environment:
# Windows: env\Scripts\activate
# Mac/Linux: source env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
``` 

## Frontend Setup

```
cd frontend
npm install
npm start
```
