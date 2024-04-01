import React, { Suspense, useState } from "react";
import Header from "../Components/Header";
import Label from "../Components/Label.jsx";
import ProjectGrids from "../Components/ProjectGrids";
import ScrollButtons from "../Components/ScrollButtons";
const Gradient = React.lazy(() => import("../Components/Gradient.jsx"));

function Home() {
  const [selectedLabels, setSelectedLabels] = useState([]);

  // This function now expects an array of labels
  const handleLabelClick = (labelsArray) => {
    // Directly set the new labels array
    setSelectedLabels(labelsArray);
  };

  return (
    <div className="bg-black">
      <div className="relative w-full h-1/2-screen flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex-grow-0 z-0">
            <Gradient />
          </div>
        </Suspense>
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
  );
}

export default Home;
