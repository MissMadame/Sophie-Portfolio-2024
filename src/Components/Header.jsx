import React from "react";
import "./Header.css"; // Make sure this path is correct

const Header = () => {
  return (
    // This div takes up 50% of the viewport height
    <div className="flex flex-wrap mx-[10vw] mt-[10vh] md:mt-[15vh] text-black font-bold text-xl md:text-3xl ">
      {/* Center content with margin auto and use viewport width for sizing */}
      <div className="w-full lg:w-4/5  flex flex-col justify-left ">
        {/* Adjust margin left to emulate column start, using vw units for responsiveness */}
        <p className="Blend">Hi, I am Sophie Feng.</p>
        <p className="Blend">
          I am currently pursuing BFA in{" "}
          <span className="font-BugrinoBold cursor-pointer">
            <a
              href="https://www.risd.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rhode Island School of Design
            </a>
          </span>
          ,
        </p>
        <p className="Blend">
          pursuing BFA in Graphic Design and Illustration.
        </p>
      </div>
      {/* Repeat for other sections, adjusting marginLeft as needed */}
      <div className="w-full flex flex-row justify-left space-x-[5vw] mt-[10vw]">
        {/* First column */}
        <div className="justify-left w-64">
          <p className="Blend">I am working on ↓</p>
        </div>
        {/* Second column */}
        <div className="justify-left w-64">
          <p className="Blend">Here is my ↓</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
