import React from "react";

const Footer = () => {
  return (
    <div className="mx-[10vw] text-sm text-black mt-[20vh]  mb-[10vh]">
      (*^ ‿ ⁢*) Typeset in{" "}
      <a
        href="https://gunesmuhittin.com/bugrino/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:cursor-customHover"
        style={{ color: "inherit", textDecoration: "underline" }}
        onMouseOver={(e) => {
          e.target.style.color = "white";
          e.target.style.backgroundColor = "black";
        }}
        onMouseOut={(e) => {
          e.target.style.color = "inherit";
          e.target.style.backgroundColor = "transparent";
        }}
      >
        Bugrino
      </a>
      ; Last update on April 2024.
    </div>
  );
};

export default Footer;
