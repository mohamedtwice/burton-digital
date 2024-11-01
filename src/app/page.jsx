'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PageTransition from '@/components/PageTransition';
import gopherWayImage from '../../public/images/gopher_way.jpg'
import deanRodriguezImage from '../../public/images/DeanRodriguez.webp'
import directoryImage from '../../public/images/Faculty_Splash_2.webp'
import VideoRotation from '@/components/VideoRotation';
import VideoHome from '@/components/VideoHome';
const MotionMain = dynamic(() => import('../components/MotionMain'), { ssr: false });
const MotionDiv = dynamic(() => import('../components/MotionDiv'), { ssr: false });

const INACTIVITY_TIMEOUT = 20000; // 20 seconds

const HomePage = () => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const intervalId = setInterval(() => {
      if (Date.now() - lastInteractionTime > INACTIVITY_TIMEOUT) {
        // Reset to home page after inactivity
        window.history.pushState(null, '', '/');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastInteractionTime, isClient]);

  const handleInteraction = () => {
    if (!isClient) return;
    setLastInteractionTime(Date.now());
  };

  const options = [
    { id: 1, title: 'People Directory', href: '/directory', color: 'bg-blue-400', gridArea: 'people' },
    { id: 2, title: 'Gopher Way', href: 'https://z.umn.edu/GopherWay-Burton', color: 'bg-green-400', gridArea: 'map' },
    { id: 5, title: 'Campus Maps', href: 'https://z.umn.edu/Buildings-Burton', color: 'bg-purple-400', gridArea: 'building' },
    { id: 3, title: 'CEHD Awards', href: '/cehd', color: 'bg-yellow-400' },
    { id: 4, title: "CEHD Dean's List", href: '/kin', color: 'bg-red-400' },
  ];

  console.log(gopherWayImage)
  return (
    <PageTransition>
      {isClient && (
        <MotionMain className="flex flex-col">
          <div className="w-full bg-white" onClick={handleInteraction}>

        <header>
          {/* <div className="relative w-full h-[1140px] bg-[#FFDE79]"> */}
              {/* <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://player.vimeo.com/progressive_redirect/playback/970909944/rendition/1080p/file.mp4?loc=external&signature=491f6a5e397a0adf16f1f82a2b211a482a98718e86fd379ef647b7ba60afd439"
                autoPlay
                loop
                muted
              ></video> */}
              {/* <VideoHome /> */}
          {/* </div> */}
        </header>

        <main>
          {/* <div className="grid grid-cols-2 gap-10 p-12 h-[1020px] p-10"> */}
          
          <section className="grid grid-cols-2 gap-8 p-12 !pb-0 h-[670px]">
          <div className="w-full h-full">
              <div className="relative w-full h-[100%]" style={{ backgroundImage:  `url(${directoryImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center right' }}>
                  <Link key="1" href="/directory/" passHref className=" ">
                    <MotionDiv
                      className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h2 className="text-white text-4xl font-black" style={{ textShadow: '2px 2px 4px #7a0019' }}>People Directory</h2>
                     <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-xl font-bold px-6 py-2 shadow-lg">Tap here to find CEHD Faculty and Staff.</span>
                    </MotionDiv>
                  </Link>
                </div>
              </div>
              <div className="w-full h-[100%] flex flex-col gap-8">
                <div className="relative w-full h-[50%] flex">
                  <div className="w-[70%] h-full" style={{ backgroundImage: `url('https://pts.umn.edu/sites/pts.umn.edu/files/2024-05/wbs_hero.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                      <div className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}>
                        <h2 className="text-white text-4xl font-black mb-6" style={{ textShadow: '2px 2px 4px #7a0019' }}>Gopher Way</h2>
                        <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg w-[95%]">Navigate the tunnels and skyways that connect our campus</span>
                      </div>
                  </div>
                  <div className="w-[30%] h-full flex items-center justify-center relative">
                    <img src="/images/arrow-right-down.svg" alt="Arrow Right Down" className="absolute top-0 h-16 -ml-6" />
                    <div className="w-24 h-24 bg-white p-2" style={{ backgroundImage: `url('/images/z-GopherWay-Burton.svg')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
                  </div>
                </div>
                <div className="relative w-full h-[50%] flex">
                  <div className="w-[70%] h-full relative" style={{ backgroundImage: `url('https://pts.umn.edu/sites/pts.umn.edu/files/2023-10/bus_banner.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                    <div className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}>
                        <h2 className="text-white text-4xl font-black mb-6" style={{ textShadow: '2px 2px 4px #7a0019' }}>Campus Maps</h2>
                        <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg w-[95%]">Find more information about campus buildings</span>
                    </div>
                  </div>

                  <div className="w-[30%] h-full flex items-center justify-center relative">
                    <div className="w-24 h-24 bg-white p-2" style={{ backgroundImage: `url('/images/z-Buildings-Burton.svg')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
                    <img src="/images/arrow-right-top.svg" alt="Arrow Right Up" className="absolute bottom-0 h-16 -ml-6" />
                  </div>
                </div>
                
                {/* <div className="relative w-full h-[10%] py-10">
                <Link key="7" href="https://campusmaps.umn.edu/" passHref className="">
                  <MotionDiv
                    className={`text-[#FFDE79] border-l-8 border-[#FFDE79] p-6 text-sm font-bold bg-[#7a0019] cursor-pointer w-full h-[10%] inline-flex flex-row items-center w-auto`}
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l7 7-7 7M21 3l-7 7 7 7" />
                    </svg>
                    Tap here for more campus map information.
                  </MotionDiv>
                </Link>
                </div> */}
                
              </div>
            </section>


            {/* <div className="relative h-[510px] py-5 mx-10">
              <VideoRotation />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
                <a
                  href="https://cehd.umn.edu"
                  className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-2xl font-bold px-6 py-2 shadow-lg"
                >
                  Visit CEHD
                </a>
              </div>
            </div> */}

              {/* <div className="grid grid-cols-2 gap-10 p-10 h-[920px]"> */}
              <section className="grid grid-cols-2 gap-10 p-10 h-[670px]">
              <div className="w-full ">
                {/* <div className="relative w-full h-[47%]" style={{ backgroundImage: `url('https://www.cehd.umn.edu/sites/cehd/files/styles/coh_x_large/public/2024-06/2022_CEHD%20Commencement_NicoleNeri_001.jpg?itok=3CIk2jmR')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                  <Link key="2" href="https://www.cehd.umn.edu/about" passHref className=" ">
                    <MotionDiv
                      className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h2 className="text-white text-6xl font-black" style={{ textShadow: '2px 2px 4px #7a0019' }}>CEHD History</h2>
                     <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-2xl font-bold px-6 py-2 shadow-lg">More than 100 years of excellence</span>
                    </MotionDiv>
                  </Link>
                </div> */}
                <div className="relative w-full h-[100%] -10" style={{ backgroundImage: `url('https://pbs.twimg.com/media/GY03trTXwAAHuM5?format=jpg&name=large')`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
                <Link key="3" href="/cehd-awards/" passHref className="">
                    <MotionDiv
                      className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h2 className="text-white text-4xl font-black" style={{ textShadow: '2px 2px 4px #7a0019' }}>CEHD Awards</h2>
                     <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg">Learn about outstanding work in the college</span>
                    </MotionDiv>
                  </Link>
                </div>
                
              </div>
              <div className="w-full h-full">

              <div className="relative w-full h-[100%]" style={{ backgroundImage: `url(${deanRodriguezImage.src})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
              <Link key="6" href="/deans-list/" passHref className="">
              <MotionDiv
                      className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h2 className="text-white text-4xl font-black" style={{ textShadow: '2px 2px 4px #7a0019' }}>CEHD Dean&apos;s List</h2>
                     <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg">Congratulations to our scholars on the list</span>
                    </MotionDiv>
                  </Link>
                </div>
              </div>
            </section>
            </main>
          </div>
        </MotionMain>
      )}
    </PageTransition>
  );
};

export default HomePage;