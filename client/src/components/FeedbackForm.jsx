// client/src/components/FeedbackForm.jsx
import React, { useState } from "react";

const FeedbackForm = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Feedback submitted successfully!");
        setMessage("");
      } else {
        setStatus("Error: " + data.error?.message || "Unknown error");
      }
    } catch (err) {
      setStatus("Failed to submit feedback.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your feedback"
        rows="4"
        required
      ></textarea>
      <br />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default FeedbackForm;
