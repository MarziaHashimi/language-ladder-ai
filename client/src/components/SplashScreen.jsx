import React, { useEffect, useState } from "react";
import logo from "../images/languagell.png"; 

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHidden(true), 500); // fade out after loading
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`splash-screen ${hidden ? "hidden" : ""}`}
    >
      <div className="splash-content">
        <img src={logo} alt="Language Ladder logo" className="splash-logo" />
        {/* <h1 className="splash-title">Language Ladder</h1> */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="splash-text">Loading Language Ladder...</p>
      </div>
    </div>
  );
}
