//src/components/ReviewMode.jsx
import React, { useState } from "react";
import { getWordsFromStorage } from "../utils/storage";

export default function ReviewMode() {
  const [currentWord, setCurrentWord] = useState(null);

  const handleNext = () => {
    const words = getWordsFromStorage();
    if (words.length === 0) return alert("No words to review!");
    const random = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(random);
  };

  return (
    <div className="review-mode">
      <h2>🎯 Review Mode</h2>
      <button onClick={handleNext}>Show Random Word</button>
      {currentWord && (
        <div className="review-card">
          <h3>{currentWord.term}</h3>
          <p><strong>Meaning:</strong> {currentWord.meaning}</p>
          <p><strong>Notes:</strong> {currentWord.notes}</p>
          {/* <p><strong>AI Sentences:</strong> {currentWord.sentences}</p> */}
        </div>
      )}
    </div>
  );
}
