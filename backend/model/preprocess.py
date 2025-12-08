# model/preprocess.py
import numpy as np
import cv2

def preprocess_face(face_img):
    """
    face_img: grayscale face cropped from original frame
    returns: normalized 48x48x1 numpy array ready for model
    """
    face_resized = cv2.resize(face_img, (48, 48), interpolation=cv2.INTER_AREA)
    face_normalized = face_resized.astype("float") / 255.0
    face_normalized = np.reshape(face_normalized, (1, 48, 48, 1))
    return face_normalized
