// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WordForm from "./components/WordForm";
import WordList from "./components/WordList";
import ReviewMode from "./components/ReviewMode";
import ScrollToTopButton from "./components/ScrollToTopButton"; 
import SplashScreen from "./components/SplashScreen";
import { getWordsFromStorage } from "./utils/storage"; 
import "./styles.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState("bank"); // "bank" or "review"
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]); 

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
        setWords(getWordsFromStorage()); 
      const timer = setTimeout(() => setLoading(false), 3000); // 3s splash
  return () => clearTimeout(timer);
  }, [darkMode]);

  return (
  <>
    {loading && <SplashScreen />} {/* Splash Screen visible first */}

    {!loading && ( /* Only show app after loading is done */
      <div className="app-container">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setView={setView}
          view={view}
        />

        {view === "bank" ? (
        <WordForm setWords={setWords} />
         ) :(
         <ReviewMode />
        )}
        <WordList words={words} setWords={setWords} />

        <ScrollToTopButton />
      </div>
    )}
  </>
);
}
