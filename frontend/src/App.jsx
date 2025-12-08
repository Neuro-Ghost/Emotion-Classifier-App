import { useState } from "react";
import EmotionCamera from "./components/EmotionCamera";
import EmotionChart from "./components/EmotionChart";

function App() {
  const [results, setResults] = useState([]);

  const addResult = (res) => {
    setResults((prev) => [...prev, res]);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Live Emotion Detector</h1>
      <EmotionCamera onAddResult={addResult} />
      <EmotionChart results={results} />
    </div>
  );
}

export default App;
