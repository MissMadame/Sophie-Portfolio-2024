import React, { useRef, useState } from "react";
import Header from "../Components/Header";
import Label from "../Components/Label.jsx";
import ProjectGrids from "../Components/ProjectGrids";
import ScrollButtons from "../Components/ScrollButtons";
import Footer from "../Components/Footer";

function Home() {
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleLabelClick = (labelsArray) => {
    setSelectedLabels(labelsArray);
  };

  return (
    <div className="font-BugrinoRegular">
      <div className="w-full h-auto bg-white">
        <Header />
        <Label
          onLabelClick={handleLabelClick}
          selectedLabels={selectedLabels}
        />
        <ScrollButtons />
        <ProjectGrids selectedLabels={selectedLabels} />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
