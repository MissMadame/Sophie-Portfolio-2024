import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import ProjectPage from "./Pages/ProjectPage.jsx";
import AudioPlayer from "./Components/AudioPlayer"; // This will be our audio player component

function App() {
  return (
    <BrowserRouter>
      <div>
        <AudioPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
