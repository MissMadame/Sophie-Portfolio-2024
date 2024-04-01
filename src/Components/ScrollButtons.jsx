import React, { useState, useEffect } from "react";

const ScrollButtons = () => {
  const [isTop, setIsTop] = useState(true);

  const scrollTo = (direction) => {
    const height = window.innerHeight * 1.2;
    window.scrollBy({
      top: direction === "down" ? height : -height,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const shouldBeFixed = window.scrollY > window.innerHeight;
    setIsTop(!shouldBeFixed);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${isTop ? "relative" : "fixed top-0 bg-black"} w-full z-20`}
      style={{ left: 0, right: 0 }}
    >
      <div className="mx-[10vw] flex justify-between text-lg">
        {/* Adjust padding as needed to control the banner's height and the buttons' spacing */}
        {/* Scroll Up Button */}
        <button
          aria-label="Scroll Up"
          className="p-2 text-white rounded-full"
          onClick={() => scrollTo("up")}
        >
          ↑
        </button>

        {/* Scroll Down Button */}
        <button
          aria-label="Scroll Down"
          className="p-2 text-white rounded-full"
          onClick={() => scrollTo("down")}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default ScrollButtons;
