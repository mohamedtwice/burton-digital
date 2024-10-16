'use client';

import { useState, useEffect } from 'react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import awardsData from '../../../public/data/cehd_awards.json'; // Import the awards data

const CEHDAwardsPage = () => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [filteredAwards, setFilteredAwards] = useState(awardsData);
  const [filters, setFilters] = useState({
    search: '',
    department: ''
  });

  useEffect(() => {
    const applyFilters = () => {
      let result = awardsData;

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(award => 
          award.Name.toLowerCase().includes(searchTerm) ||
          award.Award.toLowerCase().includes(searchTerm)
        );
      }
      if (filters.department) {
        result = result.filter(award => award.Department.toLowerCase() === filters.department.toLowerCase());
      }
      setFilteredAwards(result);
    };

    applyFilters();
  }, [filters]);

  const handleSearchChange = (e) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      search: e.target.value
    }));
  };

  const handleDepartmentChange = (e) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      department: e.target.value
    }));
  };

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
        <div id="pagetop" className="w-full h-full p-10 pt-10 flex flex-col h-[2470px]">
            
            <Link href="/" className="bg-[#7a0019] text-white text-md px-4 py-1 w-full md:max-w-[175px] mb-6 text-white transform transition-transform hover:scale-105 active:scale-95 no-underline">
              &larr; Back to Home
            </Link>
            
          <h1 className="text-6xl font-black text-[#7a0019] mb-8">CEHD Awards</h1>
          <div className="">
            <h3 className="text-2xl font-bold mb-3">Congratulations to our 2024 CEHD Faculty, Staff, and Student award-winners!</h3>
            <p className="text-xl mb-8">The CEHD Awards and Honors program recognizes outstanding work in the college each year through a variety of awards. Award recipients are nominated by their peers and award winners are recognized at the annual college Spring Assembly.</p>
          </div>

          <form className="bg-[#f0f0f0] p-4 mb-8 inline-flex flex-wrap items-end w-max	">
            {/* <div className="w-full lg:w-[450px] form-item lg:mr-4 my-4">
              <label htmlFor="search" className="block text-sm font-semibold mb-1">Search</label>
              <input 
                type="text"
                id="search" 
                name="search" 
                className="h-14 w-full lg:max-w-[500px] p-3 border border-gray-300"
                onChange={handleSearchChange}
                value={filters.search}
                placeholder="Search awards..."
                onFocus={(e) => e.target.setAttribute('inputmode', 'text')}
              />
            </div> */}

            <div className="w-full lg:w-[350px] form-item lg:mr-4 my-4">
              <label htmlFor="department" className="block text-sm font-semibold mb-1">Department</label>
              <select 
                id="department" 
                name="department" 
                className="w-full h-14 w-64 p-3 border border-gray-300 text-lg"
                onChange={handleDepartmentChange}
                value={filters.department}
              >
                <option value="">- Any -</option>
                {Array.from(new Set(awardsData.map(award => award.Department))).map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <button 
              type="button" 
              className="w-full lg:w-auto h-14 bg-[#7a0019] text-white my-4 px-6 py-2  hover:bg-[#5a0013] transition-colors text-lg"
              onClick={() => {
                setFilters({ search: '', department: '' });
                document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Reset
            </button>

            <div className="w-full lg:w-auto ml-4 my-4 flex flex-col justify-center h-[50px] text-md text-gray-600">
              {filteredAwards.length} {filteredAwards.length === 1 ? 'awardee' : 'awardees'} found
            </div>
          </form>

          <div className="people-container flex-grow">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-[2125px]">
              {filteredAwards.map((award, index) => (
                <li key={index}>
                  {award.Link ? (
                    <Link href={award.Link} className="block border-0 bg-[#f9f7f6] hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="grid grid-cols-2">
                        <div className="col-span-1">
                          <img src={award.Image || '/default-profile-image.jpg'}
                            alt={award.Name} 
                            className="w-full h-[250px] object-cover object-center"
                          />
                        </div>
                        <div className="col-span-1 p-4 flex flex-col justify-between">
                          <div>
                            <h2 className="text-lg font-bold text-[#7a0019] mb-2">{award.Name}</h2>
                            <p className="text-sm text-gray-600 mb-2">{award.Award}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mt-4">{award.Department}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="block border-2 bg-white hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="grid grid-cols-2">
                        <div className="col-span-1">
                          <img src={award.Image || '/default-profile-image.jpg'}
                            alt={award.Name} 
                            className="w-full h-[250px] object-cover object-center"
                          />
                        </div>
                        <div className="col-span-1 p-6 flex flex-col justify-between">
                          <div>
                            <h2 className="text-lg font-bold text-[#7a0019] mb-2">{award.Name}</h2>
                            <p className="text-sm text-gray-600 mb-2">{award.Award}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mt-4">{award.Department}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default CEHDAwardsPage;