'use client';

import { useEffect, useState, useRef } from 'react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import data from '@/data/deansList.json';

const DeanListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [highlightedLetter, setHighlightedLetter] = useState(null);
  const [showResetButton, setShowResetButton] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);

  useEffect(() => {
    setFilteredData(
      data.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    resetInactivityTimeout();
  };

  const handleLetterClick = (letter) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      setTimeout(() => {
        scrollContainerRef.current.scrollTo({
          top: element.offsetTop - scrollContainerRef.current.offsetTop,
          behavior: 'smooth',
        });
      }, 500);
      setHighlightedLetter(letter);
      setShowResetButton(true);
      resetInactivityTimeout();
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setHighlightedLetter(null);
    setShowResetButton(false);
    resetInactivityTimeout();
  };

  const handleResetButtonClick = () => {
    setHighlightedLetter(null);                        
    document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
    setShowResetButton(false);
    resetInactivityTimeout();
  };

  const startScrolling = () => {
    document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
    if (scrollContainerRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        scrollContainerRef.current.scrollBy({
          top: 1,
          behavior: 'smooth',
        });
      }, 20);
    }
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  const resetInactivityTimeout = () => {
    stopScrolling();
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      setHighlightedLetter(null);
      startScrolling();
    }, 4000);
  };

  useEffect(() => {
    startScrolling();
    return () => {
      stopScrolling();
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, []);

  // Filter the alphabet to only include letters with data
  const filteredAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter =>
    filteredData.some(({ name }) => name.startsWith(letter))
  );

  return (
    <PageTransition>
      <section>
        {/* <div className="relative w-full h-[1140px] bg-[#FFDE79]">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="https://player.vimeo.com/progressive_redirect/playback/970909944/rendition/1080p/file.mp4?loc=external&signature=491f6a5e397a0adf16f1f82a2b211a482a98718e86fd379ef647b7ba60afd439"
            autoPlay
            loop
            muted
          ></video>
        </div> */}
        <div id="pagetop" className="w-full h-full p-10 pt-10 flex flex-col h-[1340px]">
            
                        
            <button onClick={() => window.location.href = '/'} className="bg-[#7a0019] text-white text-md px-4 py-1 w-full md:max-w-[175px] mb-6 text-white transform transition-transform hover:scale-105 active:scale-95 no-underline">
              &larr; Back to Home
            </button>

          <h1 className="text-6xl font-black text-[#7a0019] mb-6">CEHD Dean&apos;s List</h1>
          <div className="">
            <h3 className="text-2xl font-bold mb-3">Congratulations to all students on the dean&#39;s list!</h3>
            <p className="text-xl mb-8">Students on the dean&#39;s list have achieved a 3.666 GPA or higher, completed at least 12 A/F credits, and received no N grades.</p>
          </div>
          {/* <div className="flex mb-16">
            <div className="bg-gray-200 w-full p-6 flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border text-xl h-16 p-2 flex-grow"
                onFocus={resetInactivityTimeout}
              />
              <button
                onClick={handleReset}
                className="ml-2 p-2 px-6 text-white border bg-red-500"
              >
                Reset
              </button>
            </div>
          </div> */}
          <div className="flex overflow-y-auto h-[100%] px-10">
            <div className="sticky top-0 flex flex-col mr-4 flex-grow max-w-20 overflow-y-auto">
              <ul className="flex flex-col w-full justify-end items-center p-4 gap-3 bg-[#ffde79]">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                  <li key={letter} className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        handleLetterClick(letter);
                        document.getElementById(`letter-${letter}`).scrollIntoView({ behavior: 'smooth' });
                        document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`leading-[1em] text-2xl font-bold bg-[#ffde79] text=gray-700 ${highlightedLetter === letter ? 'text-[#7a0019]' : ''}`}
                    >
                      {letter}
                    </button>
                    {highlightedLetter === letter && (
                      <button
                        onClick={handleResetButtonClick}
                        className="bg-[#ffde79] text-red-500 hover:underline"
                      >
                        Reset
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div ref={scrollContainerRef} className="flex-grow h-[2000px] overflow-y-auto">
              {filteredAlphabet.map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="mb-4">
                  <h2 id={`header-${letter}`} className="text-2xl font-bold mb-6 bg-white sticky top-0 z-10 text-[#7a0019]">{letter}</h2>
                  <ul className="grid grid-cols-3 gap-4">
                    {filteredData
                      .filter(({ name }) => name.startsWith(letter))
                      .map(({ name }, index) => (
                        <li
                          key={index}
                          className={` p-4 h-16 flex text-lg text-center items-center justify-center cursor-pointer ${
                            highlightedLetter === letter ? 'bg-[#ffde7a]' : 'bg-[#f9f7f6]'
                          }`}
                          onClick={resetInactivityTimeout}
                        >
                          {name}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default DeanListPage;