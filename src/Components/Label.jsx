import React, { useState } from "react";

const Label = ({ onLabelClick }) => {
  // State to track multiple clicked labels
  const [clickedLabels, setClickedLabels] = useState([]);

  const handleLabelClick = (label) => {
    const isLabelSelected = clickedLabels.includes(label);
    if (isLabelSelected) {
      // If label is already selected, remove it from the clickedLabels array
      setClickedLabels(
        clickedLabels.filter((selectedLabel) => selectedLabel !== label)
      );
    } else {
      // If label is not selected, add it to the clickedLabels array
      setClickedLabels([...clickedLabels, label]);
    }

    // Update the selection in parent component accordingly
    isLabelSelected
      ? onLabelClick(
          clickedLabels.filter((selectedLabel) => selectedLabel !== label)
        )
      : onLabelClick([...clickedLabels, label]);
  };

  return (
    <div className="flex flex-wrap mx-[10vw] text-white font-bold text-xs">
      <div className="w-full flex flex-row justify-left space-x-[5vw] mt-[2vh]">
        {/* First column */}
        <div className="justify-left w-64">
          {[
            "Poster",
            "Publication",
            "Illustration",
            "Patterns",
            "Motion Graphics",
            "Information Design",
            "Collection",
            "website Design",
            "Packaging",
          ].map((label, index) => (
            <p
              key={index}
              className="underline cursor-pointer"
              onClick={() => handleLabelClick("#" + label)} // Use handleLabelClick for interaction
            >
              <span
                className={`${clickedLabels.includes("#" + label) ? "bg-white text-black px-1" : ""} hover:bg-white hover:text-black hover:px-1`}
              >
                #{label}
              </span>
            </p>
          ))}
        </div>
        {/* Second column, adjust accordingly if needed */}
        <div className="justify-left w-64">
          {["EMAIL", "INSTAGRAM", "RESUME", "LINKEDIN"].map((label, index) => (
            <p
              key={index}
              className="underline cursor-pointer"
              onClick={() => handleLabelClick(label)} // Use handleLabelClick for interaction
            >
              <span
                className={`${clickedLabels.includes(label) ? "bg-white text-black px-1" : ""} hover:bg-white hover:text-black hover:px-1`}
              >
                {label}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Label;
