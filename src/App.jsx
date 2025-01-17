import React, { useState, useEffect } from "react";
import ThoughtList from "./components/ThoughtList";
import ThoughtForm from "./components/ThoughtForm";
import "./App.css";

const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <ThoughtForm setThoughts={setThoughts} />
      {loading ? <p>Loading thoughts...</p> : <ThoughtList thoughts={thoughts} setThoughts={setThoughts} />}
    </div>
  );
};

export default App;
