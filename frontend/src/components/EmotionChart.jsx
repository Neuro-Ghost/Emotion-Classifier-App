// src/components/EmotionChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function EmotionChart({ results }) {
  if (!results || results.length === 0) return null;

  // Count occurrences of each emotion
  const counts = results.reduce((acc, r) => {
    acc[r.emotion] = (acc[r.emotion] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map((key) => ({
    emotion: key,
    count: counts[key],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Emotion Distribution</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="emotion" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
