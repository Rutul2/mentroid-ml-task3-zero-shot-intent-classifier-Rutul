import { useState } from "react";

function ChatBox({ onResult, onLoading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      onLoading(true);

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
        throw new Error("Failed to classify message");
      }

      const data = await response.json();

      onResult(data);
      setMessage("");
    } catch (error) {
      console.error(error);

      onResult({
        error: "Unable to connect to the backend.",
      });
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your customer support message..."
        rows="4"
      />

      <button type="submit">Classify Intent</button>
    </form>
  );
}

export default ChatBox;
