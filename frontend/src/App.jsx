import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const classifyMessage = async () => {
    if (!message.trim()) {
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch("http://localhost:8000/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);

      setResult({
        error: "Could not connect to the backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Zero-Shot Intent Classifier</h1>

        <p>Customer Support Message Routing</p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter customer support message..."
        />

        <button onClick={classifyMessage} disabled={loading}>
          {loading ? "Classifying..." : "Classify Intent"}
        </button>

        {/* Error */}

        {result?.error && <div className="error">{result.error}</div>}

        {/* Classification Result */}

        {result && !result.error && (
          <div className="result">
            <h2>Classification Result</h2>

            <p>
              <strong>Message:</strong> {result.message}
            </p>

            <p>
              <strong>Predicted Intent:</strong> {result.intent}
            </p>

            <p>
              <strong>Route:</strong> {result.route}
            </p>

            <p>
              <strong>Fallback:</strong> {result.fallback ? "Yes" : "No"}
            </p>

            {/* All Intent Scores */}

            <h3>Intent Confidence</h3>

            {result.scores.map((item) => (
              <div className="score" key={item.intent}>
                <div className="score-header">
                  <span>{item.intent}</span>

                  <span>{(item.confidence * 100).toFixed(2)}%</span>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${item.confidence * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
