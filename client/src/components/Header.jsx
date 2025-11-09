import React, { useEffect, useState } from "react";
import logo from "../images/languageLadder.png"; 

export default function Header({ darkMode, setDarkMode, setView, view }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo-title">
        <img src={logo} alt="Language Ladder Logo" className="app-logo" />
        <h1>Language Ladder</h1>
      </div>

      <div className="header-controls">
        <button
          className={`nav-btn ${view === "bank" ? "active" : ""}`}
          onClick={() => setView("bank")}
        >
          Word Bank
        </button>
        <button
          className={`nav-btn ${view === "review" ? "active" : ""}`}
          onClick={() => setView("review")}
        >
          Review Mode
        </button>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
}
