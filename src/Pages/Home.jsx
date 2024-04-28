import React, { useRef, useState } from "react";
import Header from "../Components/Header";
import Label from "../Components/Label.jsx";
import ProjectGrids from "../Components/ProjectGrids";
import ScrollButtons from "../Components/ScrollButtons";
import Gradient from "../Components/Gradient";
import Footer from "../Components/Footer";
import AudioPlayer from "../Components/AudioPlayer";

function Home() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLabelClick = (labelsArray) => {
    setSelectedLabels(labelsArray);
  };

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
    <div className="font-BugrinoRegular">
      <div className="w-full h-auto bg-white">
        <div
          onClick={handleGradientClick}
          className="w-full h-[6vh] overflow-hidden relative hover:cursor-customHover"
        >
          <Gradient style={{ position: "absolute", bottom: 10 }} />
        </div>
        <Header />
        <Label
          onLabelClick={handleLabelClick}
          selectedLabels={selectedLabels}
        />
        <ScrollButtons />
        <ProjectGrids selectedLabels={selectedLabels} />
        <Footer />
        <AudioPlayer ref={audioRef} />
      </div>
    </div>
  );
}

export default Home;
