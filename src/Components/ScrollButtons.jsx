import React, { useState, useEffect } from "react";

const ScrollButtons = () => {
  const [isTop, setIsTop] = useState(true);

  const scrollTo = (direction) => {
    const height = window.innerHeight * 1;
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
    <div className="mx-[10vw]">
      <button
        aria-label="Scroll Down"
        className="rounded-full text-6xl text-black hover:cursor-customHover"
        onClick={() => scrollTo("down")}
      >
        ↓
      </button>
    </div>
  );
};

export default ScrollButtons;
