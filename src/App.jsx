import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gradient from "./Components/Gradient";
import AudioPlayer from "./Components/AudioPlayer";
import Home from "./Pages/Home";
import ProjectPage from "./Pages/ProjectPage";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGradientClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Audio play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Router>
      <div className="w-full h-auto bg-white">
        <div
          onClick={handleGradientClick}
          className="w-full h-[6vh] overflow-hidden relative hover:cursor-customHover"
        >
          <Gradient style={{ position: "absolute", top: 0 }} />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          {/* Add more routes as needed */}
        </Routes>

        <div
          onClick={handleGradientClick}
          className="w-full h-[6vh] overflow-hidden relative hover:cursor-customHover"
        >
          <Gradient style={{ position: "absolute", bottom: 0 }} />
        </div>
        <AudioPlayer ref={audioRef} />
      </div>
    </Router>
  );
}

export default App;
