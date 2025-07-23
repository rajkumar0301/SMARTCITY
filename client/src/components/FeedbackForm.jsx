import React, { useState } from "react";

function FeedbackForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log("Server response:", data);
    alert("Feedback sent!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your feedback"
        rows="4"
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm;
