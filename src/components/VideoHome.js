import React from 'react';

// const videoFile = 'https://www.youtube.com/embed/FVRJGIGZ8CA?controls=0&showinfo=0&rel=0&modestbranding=1&autoplay=1';

const VideoHome = () => {
  return (
    // <iframe
    //   className="absolute top-0 left-0 w-full h-full object-cover"
    //   src={videoFile}
    //   frameBorder="0"
    //   allow="autoplay; encrypted-media"
    //   allowFullScreen
    // ></iframe>
    <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://player.vimeo.com/progressive_redirect/playback/970909944/rendition/1080p/file.mp4?loc=external&signature=491f6a5e397a0adf16f1f82a2b211a482a98718e86fd379ef647b7ba60afd439"
                autoPlay
                loop
                muted
              ></video>
  );
};

export default VideoHome;
