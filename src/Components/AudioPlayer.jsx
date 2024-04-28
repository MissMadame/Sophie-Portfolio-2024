import React, { useRef, useState } from "react";

function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => console.error("Audio play failed", error));
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="LOVE DIVE.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
      {!isPlaying ? (
        <button onClick={handlePlay}>Play Audio</button>
      ) : (
        <button
          onClick={() => {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      )}
    </div>
  );
}

export default AudioPlayer;
