import React, { forwardRef } from "react";

const AudioPlayer = forwardRef((props, ref) => {
  return (
    <audio ref={ref} loop controls>
      <source
        src="The House in Fata Morgana OST - Comical.mp3"
        type="audio/mpeg"
      />
      Your browser does not support the audio tag.
    </audio>
  );
});

export default AudioPlayer;
