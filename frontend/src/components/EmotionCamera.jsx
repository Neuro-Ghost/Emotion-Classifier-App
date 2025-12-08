import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { predictEmotionFromImage } from "../api";
import EmotionResult from "./EmotionResult";

export default function EmotionCamera() {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);

  // Capture frame and send to backend
  const captureFrame = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot({ width: 224, height: 224 });
    if (!imageSrc) return;

    const res = await predictEmotionFromImage(imageSrc);
    setResult(res);
  };

  useEffect(() => {
    const interval = setInterval(captureFrame, 1000); // every 1 second
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={{ facingMode: "user" }}
        style={{ borderRadius: "8px" }}
      />
      <EmotionResult result={result} />
    </div>
  );
}
