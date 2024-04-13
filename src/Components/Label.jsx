import React, { useState } from "react";

const Label = ({ onLabelClick }) => {
  // State to track multiple clicked labels
  const [clickedLabels, setClickedLabels] = useState([]);
  const contactLinks = [
    { label: "Email", link: "mailto: sophiefeng0117@gmail.com" },
    { label: "Instagram", link: "https://www.instagram.com/sophiefeng_art/" },
    {
      label: "Resume",
      link: "https://drive.google.com/file/d/1lx0gQpt_NsF4YF0ip-ZFBm6U7aXcsJWJ/view?usp=sharing",
    },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/sophie-feng-25a618301/",
    },
    // Add more items as needed
  ];

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
    <div className="flex flex-wrap mx-[10vw] text-black font-regular text-xs">
      <div className="w-full flex flex-row justify-left space-x-[5vw] mt-[2vh]">
        {/* First column */}
        <div className="justify-left w-64">
          {[
            "Poster",
            "Publication",
            "Illustration",
            "Pattern",
            "Motion Graphic",
            "Information Design",
            "Collection",
            "Website Design",
            "Packaging",
            "Editorial",
          ].map((label, index) => (
            <p
              key={index}
              className="underline  mt-2"
              onClick={() => handleLabelClick("#" + label)} // Use handleLabelClick for interaction
            >
              <span
                className={`${clickedLabels.includes("#" + label) ? "bg-black text-white px-1" : ""} hover:bg-black hover:text-white hover:px-1 hover:cursor-customHover`}
              >
                #{label}
              </span>
            </p>
          ))}
        </div>
        {/* Second column, adjust accordingly if needed */}
        <div className="justify-left w-64 ">
          {contactLinks.map((item, index) => (
            <p key={index} className="underline mt-2">
              <span className="hover:bg-black hover:text-white hover:px-1 ">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:cursor-customHover"
                >
                  {item.label}
                </a>
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Label;
