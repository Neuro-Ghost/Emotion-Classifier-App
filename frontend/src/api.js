import axios from "axios";

const BASE_URL = "http://localhost:8000"; // adjust if your backend runs elsewhere

/**
 * Send base64 image to backend for face + emotion detection
 * @param {string} imageBase64
 * @returns {Promise<Object>} prediction {emotion, confidence}
 */
export const predictEmotionFromImage = async (imageBase64) => {
  try {
    const res = await axios.post(`${BASE_URL}/predict_face`, { image: imageBase64 });
    return res.data;
  } catch (err) {
    console.error("API Error:", err);
    return { emotion: "Error", confidence: 0 };
  }
};
