// src/components/WordForm.jsx
import React, { useState } from "react";
import { saveWordToStorage, getWordsFromStorage } from "../utils/storage";
import { generateAIResponse } from "../api/openaiClient";

export default function WordForm({ setWords }) {
  const [term, setTerm] = useState("");
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);

  const handleAddWord = async (e) => {
    e.preventDefault();
    if (!term.trim()) return alert("Please enter a word.");

    setLoading(true);

    const aiResponse = await generateAIResponse({ term });

    let parsed;
    try {
      // Attempt to parse the JSON output
      parsed = JSON.parse(aiResponse);
    } catch {
      console.warn("⚠️ AI did not return valid JSON. Using fallback parsing.");
      parsed = {
        meaning: "Meaning not found.",
        translations: { Dari: "-", Pashto: "-" },
        examples: [aiResponse],
        synonyms: [],
      };
    }

    const newWord = {
      id: Date.now(),
      term,
      meaning: parsed.meaning || "Meaning not found",
      translations: parsed.translations || {},
      synonyms: parsed.synonyms || [],
      examples: parsed.examples || [],
      notes,
      difficulty,
    };

    const words = getWordsFromStorage();
    words.push(newWord);
    saveWordToStorage(words);
    setWords([...words]); 

    setTerm("");
    setNotes("");
    setLoading(false);
    alert("✅ Word added with AI meaning, translation, and examples!");
  };

  return (
    <form className="word-form" onSubmit={handleAddWord}>
      <h2>Add New Word</h2>
      <input
        type="text"
        placeholder="Enter a word..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">🟢 Easy</option>
        <option value="medium">🟡 Medium</option>
        <option value="hard">🔴 Hard</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Add Word + AI Practice"}
      </button>
    </form>
  );
}
