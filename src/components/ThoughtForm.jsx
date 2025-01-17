import React, { useState } from "react";

const ThoughtForm = ({ setThoughts }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.length < 5 || message.length > 140) {
      setError("Message must be between 5 and 140 characters");
      return;
    }

    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
        setMessage("");
        setError(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What's making you happy right now?"
      ></textarea>
      <button type="submit">❤️ Send Happy Thought ❤️</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ThoughtForm;
