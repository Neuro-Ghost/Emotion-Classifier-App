# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cv2
import numpy as np
from PIL import Image
from io import BytesIO
import base64

from model.predictor import predict_emotion  # Your predictor wrapper

# --------------------------
# FastAPI app
# --------------------------
app = FastAPI(title="Live Emotion Detection API")

# --------------------------
# CORS middleware
# --------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, OPTIONS
    allow_headers=["*"],
)

# --------------------------
# Request model
# --------------------------
class ImageData(BaseModel):
    image: str  # base64 image string

# --------------------------
# Face detector
# --------------------------
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# --------------------------
# POST endpoint
# --------------------------
@app.post("/predict_face")
def predict_face(data: ImageData):
    try:
        # Decode base64 image
        if "," in data.image:
            img_bytes = base64.b64decode(data.image.split(",")[1])
        else:
            img_bytes = base64.b64decode(data.image)
        img = np.array(Image.open(BytesIO(img_bytes)))

        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

        # Detect faces
        faces = face_cascade.detectMultiScale(
            gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30)
        )

        if len(faces) == 0:
            return {"emotion": "No Face Detected", "confidence": 0}

        # Only predict the first face
        x, y, w, h = faces[0]
        face_roi = gray[y:y+h, x:x+w]

        # Get emotion prediction
        result = predict_emotion(face_roi)
        return result

    except Exception as e:
        # Return error message for debugging
        return {"emotion": "Error", "confidence": 0, "detail": str(e)}
