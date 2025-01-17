import React from "react";
import { formatDistanceToNow } from "date-fns";

const ThoughtItem = ({ thought, setThoughts }) => {
  const handleLike = () => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thought._id}/like`, {
      method: "POST",
    })
      .then(() => {
        setThoughts((prevThoughts) =>
          prevThoughts.map((item) =>
            item._id === thought._id ? { ...item, hearts: item.hearts + 1 } : item
          )
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="thought">
      <p>{thought.message}</p>
      <div className="heart-container">
        <button className="heart-button" onClick={handleLike}>
          <span className="heart-icon">❤️</span>
        </button>
        <span className="heart-count">x {thought.hearts}</span>
      </div>
      <small>
        {formatDistanceToNow(new Date(thought.createdAt), { addSuffix: true })}
      </small>
    </div>
  );
};

export default ThoughtItem;
