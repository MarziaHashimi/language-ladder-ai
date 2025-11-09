//src/components/WordList.jsx
import React, { useState, useEffect } from "react";
import { getWordsFromStorage, saveWordToStorage } from "../utils/storage";
import WordCard from "./WordCard";

export default function WordList({ words, setWords }) { 
   const [search, setSearch] = React.useState("");
 

  const handleDelete = (id) => {
    const updated = words.filter((w) => w.id !== id);
    saveWordToStorage(updated);
    setWords(updated);
  };

  const filtered = words.filter((w) =>
    w.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="word-list">
      <h2>My Vocabulary</h2>
      <input
        type="text"
        placeholder="Search words..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {filtered.length === 0 ? (
          <p>No words found.</p>
        ) : (
          filtered.map((word) => (
            <WordCard key={word.id} word={word} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
