'use client';

import { useEffect, useState, useRef } from 'react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';

const DeanListPage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [highlightedLetter, setHighlightedLetter] = useState(null);
  const [showResetButton, setShowResetButton] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);

  // Fetch Data from Public Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      const sheetId = "1SRfe0gDyDSPj3bpySQRQg7UHDwBZO1MRe3KuptqRd4M"; // Replace with actual Google Sheet ID
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

      try {
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2)); // Remove JSONP wrapper

        const names = json.table.rows.map(row => row.c[0]?.v).slice(1); // Extract Column A & skip header
        setData(names.map(name => ({ name }))); // Convert to expected format
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter Data Based on Search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

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
        <div id="pagetop" className="w-full h-full p-10 pt-10 flex flex-col h-[1340px]">
            
            <button 
              onClick={() => window.location.href = '/'} 
              className="bg-[#7a0019] text-white text-md px-4 py-1 w-full md:max-w-[175px] mb-6 transform transition-transform hover:scale-105 active:scale-95 touch:bg-[#5a0013] touch:scale-95"
              style={{ touchAction: 'manipulation' }}
            >
              &larr; Back to Home
            </button>

          <h1 className="text-6xl font-black text-[#7a0019] mb-6">CEHD Dean&apos;s List</h1>
          <div>
            <h3 className="text-2xl font-bold mb-3">Congratulations to all students on the dean&#39;s list!</h3>
            <p className="text-xl mb-8">Students on the dean&#39;s list have achieved a 3.666 GPA or higher, completed at least 12 A/F credits, and received no N grades.</p>
          </div>

          <div className="flex overflow-y-auto h-[100%] px-10">
            <div className="sticky top-0 flex flex-col mr-4 flex-grow max-w-20 overflow-y-auto">
              <ul className="flex flex-col w-full justify-end items-center p-4 !px-6 gap-3 bg-[#ffde79]">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                  <li key={letter} className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        handleLetterClick(letter);
                        document.getElementById(`letter-${letter}`).scrollIntoView({ behavior: 'smooth' });
                        document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`leading-[1em] text-2xl font-bold bg-[#ffde79] text-gray-700 ${
                        highlightedLetter === letter ? 'text-[#7a0019]' : ''
                      }`}
                    >
                      {letter}
                    </button>
                    {highlightedLetter === letter && (
                      <button
                        onClick={handleResetButtonClick}
                        className="bg-[#ffde79] text-red-500 hover:underline text-[10px]"
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
                          className={`p-4 h-16 flex text-lg text-center items-center justify-center cursor-pointer ${
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