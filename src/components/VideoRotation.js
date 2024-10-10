import { useState, useEffect } from 'react';

const videoFiles = [
  '/videos/home-01.mp4',
  '/videos/home-02.mp4',
  '/videos/home-03.mp4',
  '/videos/home-04.mp4',
  '/videos/home-05.mp4',
];

const VideoRotation = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const videoCount = videoFiles.length;
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoCount);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover"
      src={videoFiles[currentVideoIndex]}
      autoPlay
      loop
      muted
    ></video>
  );
};

export default VideoRotation;
