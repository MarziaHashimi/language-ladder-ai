import React from "react";

export default function WordCard({ word, onDelete }) {
  const colorMap = {
    easy: "card-easy",
    medium: "card-medium",
    hard: "card-hard",
  };

  return (
    <div className={`word-card ${colorMap[word.difficulty]}`}>
      <h3>{word.term}</h3>

      <p>
        <strong>Meaning:</strong> {word.meaning}
      </p>

      {word.synonyms && word.synonyms.length > 0 && (
        <p>
          <strong>Synonyms:</strong> {word.synonyms.join(", ")}
        </p>
      )}

      {word.translations && (
        <div>
          <p>
            <strong>Dari:</strong> {word.translations.Dari || "-"}
          </p>
          <p>
            <strong>Pashto:</strong> {word.translations.Pashto || "-"}
          </p>
        </div>
      )}

      {word.examples && word.examples.length > 0 && (
        <div className="sentences">
          <strong>AI Sentences:</strong>
          <ul>
            {word.examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      )}

      {word.notes && (
        <p>
          <em>Notes:</em> {word.notes}
        </p>
      )}

      <button className="delete-btn" onClick={() => onDelete(word.id)}>
        Delete
      </button>
    </div>
  );
}
