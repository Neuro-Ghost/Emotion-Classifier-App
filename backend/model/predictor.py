# model/predictor.py
import tensorflow as tf
import numpy as np
from .preprocess import preprocess_face

# Load emotion model
model = tf.keras.models.load_model("model/emotion_model.h5")

# 7-class emotions
EMOTION_LABELS = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

def predict_emotion(face_img):
    """
    face_img: cropped grayscale face
    returns: dict {emotion, confidence}
    """
    x = preprocess_face(face_img)
    pred = model.predict(x)[0]
    idx = np.argmax(pred)
    confidence = float(pred[idx])

    # Handle uncertain predictions
    if confidence < 0.1:
        emotion = "Uncertain"
    else:
        emotion = EMOTION_LABELS[idx]

    return {"emotion": emotion, "confidence": confidence, "raw": pred.tolist()}
