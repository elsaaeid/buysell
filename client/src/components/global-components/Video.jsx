import React from 'react';

const Video = ({ src, poster, controls = true, autoPlay = false, loop = false, muted = false }) => {
  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
};

export default Video;
