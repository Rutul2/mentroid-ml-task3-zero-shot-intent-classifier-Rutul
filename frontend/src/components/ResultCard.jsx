function ResultCard({ result }) {
  if (!result) {
    return null;
  }

  if (result.error) {
    return (
      <div className="result-card error-card">
        <h2>⚠️ Connection Error</h2>

        <p>{result.error}</p>
      </div>
    );
  }

  const confidence = (result.confidence * 100).toFixed(2);

  return (
    <div
      className={
        result.fallback
          ? "result-card fallback-card"
          : "result-card success-card"
      }
    >
      <div className="result-header">
        <h2>
          {result.fallback ? "👤 Human Support Required" : "🤖 Intent Detected"}
        </h2>
      </div>

      <div className="result-item">
        <span>Intent</span>

        <strong>{result.intent}</strong>
      </div>

      <div className="result-item">
        <span>Confidence</span>

        <strong>{confidence}%</strong>
      </div>

      <div className="confidence-bar">
        <div
          className="confidence-fill"
          style={{
            width: `${result.confidence * 100}%`,
          }}
        />
      </div>

      <div className="result-item">
        <span>Route</span>

        <strong>{result.route}</strong>
      </div>

      <div className="result-item">
        <span>Fallback</span>

        <strong>{result.fallback ? "Yes" : "No"}</strong>
      </div>

      {result.fallback && (
        <div className="fallback-message">
          The system could not confidently determine your intent. Your request
          has been routed to a human support agent.
        </div>
      )}
    </div>
  );
}

export default ResultCard;
