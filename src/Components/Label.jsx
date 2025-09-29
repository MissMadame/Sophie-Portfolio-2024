import React, { useState } from "react";

const Label = ({ onLabelClick }) => {
  const [clickedLabels, setClickedLabels] = useState([]);
  const contactLinks = [
    { label: "Email", link: "mailto: sophiefeng0117@gmail.com" },
    { label: "Instagram", link: "https://www.instagram.com/sophie___feng/" },
    {
      label: "Resume",
      link: "https://drive.google.com/file/d/1xwCuzKuBTYUNCGfPbieR-XQ2pl9NbbpN/edit",
    },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/sophie-feng-25a618301/",
    },
  ];

  const handleLabelClick = (label) => {
    const isLabelSelected = clickedLabels.includes(label);
    const updatedClickedLabels = isLabelSelected
      ? clickedLabels.filter((selectedLabel) => selectedLabel !== label)
      : [...clickedLabels, label];

    setClickedLabels(updatedClickedLabels);
    onLabelClick(updatedClickedLabels);
  };

  return (
    <div className="flex flex-wrap mx-[10vw] text-black text-base">
      <div className="w-full flex flex-row justify-left space-x-[10vw] mt-[2vh]">
        {/* First column for hashtags */}
        <div className="justify-left w-64">
          <p className="flex flex-wrap items-center">
            {[
              "Branding"
              "Motion",
              "Poster",
              "Publication",
              "Illustration",
              "Pattern",
              "Collection",
            ].map((label, index) => (
              <span
                key={index}
                onClick={() => handleLabelClick(label)}
                className={`mt-1 mx-1 underline ${
                  clickedLabels.includes(label)
                    ? "bg-black text-white px-1"
                    : "hover:bg-black hover:text-white hover:px-1 hover:cursor-customHover"
                }`}
              >
                ✶{label}
              </span>
            ))}
          </p>
        </div>
        {/* Second column for contact links */}
        <div className="justify-left w-64">
          {contactLinks.map((item, index) => (
            <p key={index} className="mt-1 mx-1">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:bg-black hover:text-white hover:px-1 hover:cursor-customHover"
              >
                {item.label}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Label;
