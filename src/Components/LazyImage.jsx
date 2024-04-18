import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, placeholder, style }) => {
  const [imageSrc, setImageSrc] = useState(placeholder); // Initially load with placeholder
  const [loaded, setLoaded] = useState(false); // State to track when the real image has loaded
  const imageRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!loaded && entry.isIntersecting) {
            setImageSrc(src); // Only change src if the image hasn't loaded yet and the component is visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "75%",
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, loaded]); // Depend on the 'loaded' state to avoid unnecessary re-observing if the image is already loaded

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      style={{ ...style, opacity: loaded ? 1 : 0.5 }}
      onLoad={() => setLoaded(true)} // Set loaded to true when the image has fully loaded
      className="transition-opacity duration-500 ease-in-out"
    />
  );
};

export default LazyImage;
