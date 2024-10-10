'use client';

import { useState, useEffect } from 'react';
import PageTransition from '@/components/PageTransition';
import axios from 'axios';
import Link from 'next/link';

export default function DirectoryPage() {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    department: ''
  });
  const [personTypeMap, setPersonTypeMap] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);

  const sites = [
    { name: 'CEHD', url: 'https://cehd.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'CAREI', url: 'https://carei.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'CI', url: 'https://ci.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'EDPSYCH', url: 'https://edpsych.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'FSOS', url: 'https://fsos.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'ICD', url: 'https://icd.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'KIN', url: 'https://kin.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'OLPD', url: 'https://olpd.umn.edu/jsonapi/node/person', contentType: 'person' },
    { name: 'SSW', url: 'https://ssw.umn.edu/jsonapi/node/person', contentType: 'person' },
  ];

  const fetchSite = async (site, initial = false) => {
    const fetchData = async (url, accumulatedData = [], initial) => {
      try {
        const response = await axios.get('/api/proxy', { params: { url } });
        const data = response.data.data.map(person => ({ ...person, department: site.name }));
        const allData = [...accumulatedData, ...data];

        console.log(`Fetched ${data.length} records from ${site.name}. Total so far: ${allData.length}`);

        if (initial) {
          return allData;
        }

        const nextLink = response.data.links?.next?.href;
        if (nextLink) {
          console.log(`Next link found for ${site.name}: ${nextLink}`);
          return fetchData(nextLink, allData);
        } else {
          console.log(`No next link found for ${site.name}. Total records fetched: ${allData.length}`);
          return allData;
        }
      } catch (error) {
        console.error(`Error fetching data from ${site.name}:`, error);
        return accumulatedData;
      }
    };

    const initialUrl = `${site.url}?page[limit]=100`;
    return fetchData(initialUrl, [], initial);
  };

  const fetchPersonTypes = async (site) => {
    try {
      const url = `${site.url.split('/jsonapi')[0]}/jsonapi/taxonomy_term/person_type`;
      const response = await axios.get('/api/proxy', { params: { url } });
      const types = {};

      // Fetch details for each person type ID
      await Promise.all(response.data.data.map(async (type) => {
        const typeId = type.id;
        const typeUrl = `${site.url.split('/jsonapi')[0]}/jsonapi/taxonomy_term/person_type/${typeId}`;
        const typeResponse = await axios.get('/api/proxy', { params: { url: typeUrl } });
        types[typeId] = typeResponse.data.data.attributes.name;
      }));

      return types;
    } catch (error) {
      console.error(`Error fetching person types from ${site.name}:`, error);
      return {};
    }
  };

  useEffect(() => {
    const fetchInitialContent = async () => {
      try {
        const cehdSite = sites.find(site => site.name === 'CEHD');
        const [cehdPeople, cehdPersonTypes] = await Promise.all([
          fetchSite(cehdSite), // Fetch initial data recursively
          fetchPersonTypes(cehdSite)
        ]);

        setPeople(cehdPeople);
        setFilteredPeople(cehdPeople);
        setPersonTypeMap(prevMap => ({ ...prevMap, ...cehdPersonTypes }));
        setLoading(false);

        // Fetch the rest of the sites one by one
        await fetchRemainingContent(cehdPeople, cehdPersonTypes);
      } catch (e) {
        console.error('An error occurred while fetching the content:', e);
        setError('Failed to fetch content. Please try again later.');
        setLoading(false);
      }
    };

    const fetchRemainingContent = async (initialPeople, initialPersonTypes) => {
      try {
        setLoadingMore(true);
        const otherSites = sites.filter(site => site.name !== 'CEHD');

        for (const site of otherSites) {
          const [sitePeople, sitePersonTypes] = await Promise.all([
            fetchSite(site),
            fetchPersonTypes(site)
          ]);

          setPersonTypeMap(prevMap => ({ ...prevMap, ...sitePersonTypes }));
          const allPeople = [...initialPeople, ...sitePeople];
          setPeople(allPeople);
          setFilteredPeople(allPeople);
          initialPeople = allPeople; // Update initialPeople for the next iteration
        }

        setLoadingMore(false);
      } catch (e) {
        console.error('An error occurred while fetching the remaining content:', e);
        setError('Failed to fetch remaining content. Please try again later.');
        setLoadingMore(false);
      }
    };

    fetchInitialContent();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = people;
      if (filters.category) {
        result = result.filter(person => {
          const typeId = person.relationships.field_person_type.data[0]?.id;
          return personTypeMap[typeId] === filters.category;
        });
      }
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
      console.log(result)
    };

    applyFilters();
  }, [people, filters, personTypeMap]);

  useEffect(() => {
    let start = animatedCount;
    const end = filteredPeople.length;
    if (start === end) return;

    const duration = 500; // duration of the animation in ms
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));

    const timer = setInterval(() => {
      start += increment;
      setAnimatedCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [filteredPeople.length]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'department' && { category: '' }) // Reset category if department changes
    }));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <PageTransition>
      {isClient && (
<section className="">

<div className="relative w-full h-[1120px] bg-[#FFDE79]">
    <video
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="https://player.vimeo.com/progressive_redirect/playback/970909944/rendition/1080p/file.mp4?loc=external&signature=491f6a5e397a0adf16f1f82a2b211a482a98718e86fd379ef647b7ba60afd439"
      autoPlay
      loop
      muted
    ></video>
</div>

{/* <div className="w-full h-full p-8 font-['Open_Sans',_sans-serif] flex flex-col  h-[2470px]"> */}
<div className="w-full h-full p-10 pt-20 flex flex-col  h-[2470px]">
<div className="bg-[#7a0019] text-white text-md px-4 py-1 w-full md:max-w-[175px] mb-6">
            <Link href="/" className="text-white hover:underline">
              &larr; Back to Home
            </Link>
          </div>
          <h1 className="text-7xl font-black text-[#7a0019] mb-16">College Directory</h1>
          
          <form id="views-exposed-form-programs-block-1" className="bg-[#f0f0f0] p-4 mb-16 flex flex-wrap items-end">

            <div className="w-full lg:w-[450px] form-item lg:mr-4 my-4">
              <label htmlFor="search" className="block text-sm font-semibold mb-1">Search</label>
              <input 
                type="text"
                id="search" 
                name="search" 
                className="h-14 w-full lg:max-w-[500px] p-3 border border-gray-300 "
                onChange={(e) => {
                  handleFilterChange(e);
                  document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
                }}
                value={filters.search}
                placeholder="Search directory..."
              />
            </div>

            <div className="w-full lg:w-[350px] form-item lg:mr-4 my-4">
              <label htmlFor="department" className="block text-sm font-semibold mb-1">Department or Center</label>
              <select 
                id="department" 
                name="department" 
                className="w-full h-14 w-64 p-3 border border-gray-300 text-lg" // Added text-lg for larger font size
                style={{ position: 'relative', zIndex: 10 }} // Added style for better positioning
                onChange={(e) => {
                  handleFilterChange(e);
                  document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
                }}
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


            {filters.department && (
              <div className="w-full lg:w-[300px] form-item lg:mr-4 my-4">
                <label htmlFor="category" className="block text-sm font-semibold mb-1">Categories</label>
                <select 
                  id="category" 
                  name="category" 
                  className="w-full h-14 w-64 p-3 border border-gray-300 text-lg" // Added text-lg for larger font size
                  style={{ position: 'relative', zIndex: 10 }} // Added style for better positioning
                  onChange={(e) => {
                    handleFilterChange(e);
                    document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
                  }}
                  value={filters.category}
                >
                  <option value="">- Any -</option>
                  {Array.from(new Set(people
                    .filter(person => person.department === filters.department)
                    .map(person => {
                      const typeId = person.relationships.field_person_type.data[0]?.id;
                      return personTypeMap[typeId];
                    })
                  )).filter(Boolean).map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            )}
            

            <button 
              type="button" 
              className="w-full lg:w-auto h-14 bg-[#7a0019] text-white my-4 px-6 py-2  hover:bg-[#5a0013] transition-colors text-lg"
              onClick={() => {
                setFilters({ category: '', search: '', department: '' });
                document.getElementById('pagetop').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Reset
            </button>

            <div className="w-full lg:w-auto ml-4 my-4 flex flex-col justify-center h-[50px] text-xl text-gray-600">
              {animatedCount} {animatedCount === 1 ? 'person' : 'people'} found
            </div>
          </form>

          <div className="people-container flex-grow">
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
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-y-auto max-h-[2125px]">
                  {filteredPeople.map((person) => {
                    const typeId = person.relationships.field_person_type.data[0]?.id;
                    const category = personTypeMap[typeId] || 'Other';
                    return (
                      <li key={person.id}>
                      <Link href={person.attributes.metatag.find(meta => meta.attributes.property === "og:url")?.attributes.content} className="block border-2 bg-white hover:shadow-lg transition-shadow  overflow-hidden">
                      <div className="grid grid-cols-2 ">
                            <div className="col-span-1">
                              <img src={person.attributes.metatag.find(meta => meta.attributes.property === "og:image")?.attributes.content || '/default-profile-image.jpg'}
                                alt={person.attributes.title} 
                                className="w-full h-[350px] object-cover object-center "
                              />
                            </div>
                            <div className="col-span-1 p-6 flex flex-col justify-between">
                              <div> 
                              <h2 className="text-3xl font-bold text-[#7a0019] mb-2 break-words">{person.attributes.title}</h2>
                              <p className="text-xl font-light leading-tight text-[#333333] mb-2 break-words">{(person.attributes.field_person_working_title || person.attributes.field_person_wtitle)?.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</p>
                              <p className="text-lg text-gray-600 mb-2 break-words">{person.attributes.field_email}</p>
                              <p className="text-lg text-gray-600 mb-2 break-words">{person.attributes.field_phone}</p>
                              </div>
                              <div>
                              <p className="text-sm text-gray-500 mt-4 break-words">{person.department} | {category}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
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