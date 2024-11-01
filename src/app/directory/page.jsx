'use client';

import { useState, useEffect } from 'react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import peopleData from '../../../public/data/people.json'; // Adjust the path as necessary

export default function DirectoryPage() {
  const [people, setPeople] = useState(peopleData);
  const [filteredPeople, setFilteredPeople] = useState(peopleData);
  const [loading, setLoading] = useState(false); // No need to fetch, so not loading
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    department: ''
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const applyFilters = () => {
      let result = people;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(person => 
          person.attributes.title.toLowerCase().includes(searchTerm) ||
          (person.attributes.field_person_working_title && person.attributes.field_person_working_title.toLowerCase().includes(searchTerm)) ||
          (person.attributes.field_person_wtitle && person.attributes.field_person_wtitle.toLowerCase().includes(searchTerm)) ||
          (person.attributes.field_email && person.attributes.field_email.toLowerCase().includes(searchTerm))
        );
      }
      if (filters.department) {
        result = result.filter(person => person.department.toLowerCase() === filters.department.toLowerCase());
      }
      setFilteredPeople(result);
    };

    applyFilters();
  }, [people, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'department') {
      const container = document.querySelector('.people-container');
      if (container) {
        container.scrollTop = 0; // Scroll the container to the top
      }
    }
  };

  const handleReset = () => {
    setFilters({ search: '', department: '' });
    const container = document.querySelector('.people-container');
    if (container) {
      container.scrollTop = 0; // Scroll the container to the top
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <PageTransition>
      {isClient && (
<section className="">

<div className="w-full h-full p-10 pt-10 flex flex-col  h-[2470px]">
            
            <button onClick={() => window.location.href = '/'} className="bg-[#7a0019] text-white text-md px-4 py-1 w-full md:max-w-[175px] mb-6 text-white transform transition-transform hover:scale-105 active:scale-95 no-underline">
              &larr; Back to Home
            </button>

          <h1 className="text-6xl font-black text-[#7a0019] mb-8">College Directory</h1>
          
          <form id="views-exposed-form-programs-block-1" className="bg-[#f0f0f0] py-2 px-8 mb-10 flex flex-wrap items-end w-max">

            <div className="w-full lg:w-[350px] form-item lg:mr-4 my-4">
              <label htmlFor="department" className="block text-sm font-semibold mb-1">Department or Center</label>
              <select 
                id="department" 
                name="department" 
                className="w-full h-14 w-64 p-3 border border-gray-300 text-lg" // Added text-lg for larger font size
                style={{ position: 'relative', zIndex: 10 }} // Added style for better positioning
                onChange={handleFilterChange}
                value={filters.department}
              >
                <option value="">- Any -</option>
                <option value="CEHD">CEHD</option>
                <option value="CAREI">CAREI</option>
                <option value="CI">CI</option>
                <option value="EDPSYCH">EDPSYCH</option>
                <option value="FSOS">FSOS</option>
                <option value="ICD">ICD</option>
                <option value="KIN">KIN</option>
                <option value="OLPD">OLPD</option>
                <option value="SSW">SSW</option>
              </select>
            </div>

            <button 
              type="button" 
              className="w-full lg:w-auto h-14 bg-[#7a0019] text-white my-4 px-6 py-2  hover:bg-[#5a0013] transition-colors text-lg"
              onClick={handleReset}
            >
              Reset
            </button>

            <div className="w-full lg:w-auto ml-4 my-4 flex flex-col justify-center h-[50px] text-xl text-gray-600 transition-all duration-300">
              {filteredPeople.length} {filteredPeople.length === 1 ? 'person' : 'people'} found
            </div>
          </form>

          <div className="people-container flex-grow overflow-y-auto">
            {loading ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold mb-4">Loading Directory Data</h2>
                <p className="text-gray-600">Please wait while we fetch the latest information...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">Error</h2>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : (
              <>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[990px]">
                  {filteredPeople.map((person) => {
                    return (
                      <li key={person.id} className="h-full">
                      {/* <Link href={person.attributes.metatag.find(meta => meta.attributes.property === "og:url")?.attributes.content} className="block border-0 bg-[#f9f7f6] hover:shadow-lg transition-shadow  overflow-hidden"> */}
                      <div className="block h-full border-0 bg-[#f9f7f6] hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="grid grid-cols-2 h-full">
                            <div className="h-full col-span-1">
                              <img src={person.attributes.metatag.find(meta => meta.attributes.property === "og:image")?.attributes.content || '/default-profile-image.jpg'}
                                alt={person.attributes.title} 
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="col-span-1 p-4 flex flex-col justify-between h-full">
                              <div> 
                              <h2 className="text-md font-bold text-[#7a0019] mb-2 break-words">{person.attributes.title}</h2>
                              <p className="text-sm font-light leading-tight text-[#333333] mb-2 break-words">{(person.attributes.field_person_working_title || person.attributes.field_person_wtitle)?.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</p>
                              </div>
                              <div>
                              <p className="text-sm text-gray-500 mt-4 break-words">{person.department}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {loadingMore && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading more people...</p>
                  </div>
                )}
                {!loadingMore && filteredPeople.length === 0 && (
                  <p className="text-xl text-gray-600 text-center py-8">No people found matching the current filters.</p>
                )}
              </>
            )}
          </div>
        </div>
        </section>
      )}
    </PageTransition>
  );
}
