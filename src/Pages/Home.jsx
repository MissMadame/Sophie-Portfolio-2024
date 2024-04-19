// Home.jsx
import React, { useState } from "react";
import Header from "../Components/Header";
import Label from "../Components/Label.jsx";
import ProjectGrids from "../Components/ProjectGrids";
import ScrollButtons from "../Components/ScrollButtons";
import Gradient from "../Components/Gradient"; // Adjust the path as necessary
import Footer from "../Components/Footer"; // Adjust the path as necessary

function Home() {
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleLabelClick = (labelsArray) => {
    setSelectedLabels(labelsArray);
  };

  return (
    <div className="font-BugrinoRegular">
      <div className="w-full h-auto bg-white">
        <div className="w-full h-[6vh] overflow-hidden relative">
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
        <div className="w-full h-[6vh] overflow-hidden relative">
          <Gradient style={{ position: "absolute", bottom: 10 }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
