// src/components/FeedbackForm.jsx (or similar)
import React, { useState } from "react";

function FeedbackForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://smartcity.vercel.app/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log("Server response:", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FeedbackForm;

