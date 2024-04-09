// Home.jsx
import React, { useState } from "react";
import Header from "../Components/Header";
import Label from "../Components/Label.jsx";
import ProjectGrids from "../Components/ProjectGrids";
import ScrollButtons from "../Components/ScrollButtons";
import GradientWrapper from "../Components/GradientWrapper"; // Adjust the path as necessary

function Home() {
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleLabelClick = (labelsArray) => {
    setSelectedLabels(labelsArray);
  };

  return (
    <GradientWrapper>
      {" "}
      {/* Wrap the entire content with GradientWrapper */}
      <div className="bg-black font-BugrinoRegular">
        <div className="relative w-full h-1/2-screen flex flex-col">
          {/* Gradient is now part of GradientWrapper, so no need to include it here */}
          <Header />
          <div className="flex-grow z-50">
            <Label
              onLabelClick={handleLabelClick}
              selectedLabels={selectedLabels}
            />
          </div>
        </div>
        <div className="w-full h-auto bg-black">
          <ScrollButtons />
          <ProjectGrids selectedLabels={selectedLabels} />
        </div>
      </div>
    </GradientWrapper>
  );
}

export default Home;
