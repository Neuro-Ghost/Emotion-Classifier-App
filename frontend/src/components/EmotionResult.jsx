export default function EmotionResult({ result }) {
  if (!result) return null;

  return (
    <div style={{
      marginTop: "1rem",
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      width: "fit-content"
    }}>
      <h3>Emotion Prediction</h3>
      <p><strong>Emotion:</strong> {result.emotion}</p>
      <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
    </div>
  );
}
