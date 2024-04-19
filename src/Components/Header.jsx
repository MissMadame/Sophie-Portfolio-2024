import React from "react";
import "./Header.css"; // Make sure this path is correct

const Header = () => {
  return (
    // This div takes up 50% of the viewport height
    <div className="flex flex-wrap mx-[10vw] mt-[5vh] text-black font-bold text-lg">
      {/* Center content with margin auto and use viewport width for sizing */}
      <div className="w-full ">
        {/* Adjust margin left to emulate column start, using vw units for responsiveness */}
        <p>
          Sophie Feng is a graphic designer and illustrator currently studying
          at{" "}
          <span className="hover:bg-black hover:text-white hover:px-1 font-BugrinoBold ">
            <a
              href="https://www.risd.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:cursor-customHover"
            >
              Rhode Island School of Design
            </a>
          </span>
          .
        </p>
      </div>
      {/* Repeat for other sections, adjusting marginLeft as needed */}
      <div className="w-full flex flex-row justify-left space-x-[10vw] mt-[5vh]">
        {" "}
        {/* First column */}
        <div className="justify-left w-64">
          <p>I am working on ↓</p>
        </div>
        {/* Second column */}
        <div className="justify-left w-64">
          <p>Here is my ↓</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
