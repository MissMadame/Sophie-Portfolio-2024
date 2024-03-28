import React from "react";

const Label = () => {
  return (
    // This div takes up 50% of the viewport height
    <div className="flex flex-wrap mx-[10vw] text-white font-bold text-xs ">
      {/* Repeat for other sections, adjusting marginLeft as needed */}
      <div className="w-full flex flex-row justify-left space-x-[5vw] mt-[2vh]">
        {/* First column */}
        <div className="justify-left underline w-64">
          <p>#Poster</p>
          <p>#Publication</p>
          <p>#Illustration</p>
          <p>#Patterns</p>
          <p>#Motion Graphics</p>
          <p>#Information Design</p>
          <p>#Collection</p>
          <p>#website Design</p>
          <p>#Packaging</p>
        </div>
        {/* Second column */}
        <div className=" justify-left underline w-64">
          <p>EMAIL</p>
          <p>INSTAGRAM</p>
          <p>RESUME</p>
          <p>LINKEDIN</p>
        </div>
      </div>
    </div>
  );
};

export default Label;
