import Link from 'next/link';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import gopherWayImage from '../../public/images/wbs_hero.webp'
import campusMapsImage from '../../public/images/bus_banner.webp'
import cehdAwardsImage from '../../public/images/cehd-awards.avif'
import deanRodriguezImage from '../../public/images/DeanRodriguez.avif'
import directoryImage from '../../public/images/Faculty_Splash_f22.avif'

const INACTIVITY_TIMEOUT = 20000; // 20 seconds

const HomePage = () => {

  console.log(gopherWayImage)
  return (
    <PageTransition>
        <div className="flex flex-col">
          <div className="w-full bg-white">
        <main>
          <section className="grid grid-cols-2 gap-8 p-10 !pt-10 !pb-0 h-[670px]">
          <div className="w-full ">
          <a key="1" href="/cehd-directory/" className="relative w-full h-[100%] touch:bg-[#5a0013] touch:scale-105 active:scale-110" style={{ touchAction: 'manipulation', transform: 'scale(1.05)' }}>
                  <div className="absolute inset-0">
                    <Image
                      src={directoryImage.src}
                      alt="People Directory"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center right"
                    />
                  </div>
                  <div className={`relative flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}>
                    <h2 className="text-white text-4xl font-black mb-6 bg-[#7a0019] px-4 py-2 border-l-8 border-[#FFDE79]">People Directory</h2>
                    <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-xl font-bold px-6 py-2 shadow-lg">Tap here to find CEHD Faculty and Staff.</span>
                  </div>
                </a>
                </div>
              <div className="w-full h-[100%] flex flex-col gap-8">
                <div className="relative w-full h-[50%] flex">
                  <div className="w-[70%] h-full" style={{ backgroundImage: `url(${gopherWayImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                      <div className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}>
                        <h2 className="text-white text-4xl font-black mb-6 bg-[#7a0019] px-4 py-2 border-l-8 border-[#FFDE79]" style={{ textShadow: '2px 2px 4px #7a0019' }}>
                          Gopher Way
                        </h2>
                        <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg w-[95%]">
                          Scan this QR code to navigate the tunnels and skyways that connect our campus
                        </span>
                      </div>
                  </div>
                  <div className="w-[30%] h-full flex items-center justify-center relative">
                    <Image src="/images/arrow-right-down.svg" alt="Arrow Right Down" className="absolute top-0 h-16 -ml-6" width={64} height={64} />
                    <div className="w-24 h-24 bg-white p-2" style={{ backgroundImage: `url('/images/z-GopherWay-Burton.svg')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
                  </div>
                </div>
                <div className="relative w-full h-[50%] flex">
                  <div className="w-[70%] h-full relative" style={{ backgroundImage: `url(${campusMapsImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                    <div className={`flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}>
                        <h2 className="text-white text-4xl font-black mb-6 bg-[#7a0019] px-4 py-2 border-l-8 border-[#FFDE79]">
                          Campus Maps
                        </h2>
                        <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg w-[95%]">
                          Scan ths QR code to find more information about campus buildings
                        </span>
                    </div>
                  </div>

                  <div className="w-[30%] h-full flex items-center justify-center relative">
                    <div className="w-24 h-24 bg-white p-2" style={{ backgroundImage: `url('/images/z-Buildings-Burton.svg')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
                    <Image src="/images/arrow-right-top.svg" alt="Arrow Right Up" className="absolute bottom-0 h-16 -ml-6" width={64} height={64} />
                  </div>
                </div>
              
              </div>
            </section>


              <section className="grid grid-cols-2 gap-8 p-10 h-[670px]">
              <div className="w-full ">
                <a key="3" href="/cehd-awards/" className="relative w-full h-[100%] touch:bg-[#5a0013] touch:scale-105 active:scale-110" style={{ touchAction: 'manipulation', transform: 'scale(1.05)' }}>
                  <div className="absolute inset-0">
                    <Image
                      src={cehdAwardsImage.src}
                      alt="CEHD Awards"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top center"
                    />
                  </div>
                  <div
                    className={`relative flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}
                  >
                    <h2 className="text-white text-4xl font-black mb-6 bg-[#7a0019] px-4 py-2 border-l-8 border-[#FFDE79]">
                      CEHD Awards
                    </h2>
                    <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg">
                      Congratulations to our 2024 CEHD Faculty, Staff, and Student award-winners!
                    </span>
                  </div>
                </a>
                
              </div>
              <div className="w-full h-full">

              <a key="6" href="/deans-list/" className="relative w-full h-[100%] touch:bg-[#5a0013] touch:scale-105 active:scale-110" style={{ touchAction: 'manipulation', transform: 'scale(1.05)' }}>
                <div className="absolute inset-0">
                  <Image
                    src={deanRodriguezImage.src}
                    alt="Dean Rodriguez"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top center"
                  />
                </div>
                <div
                  className={`relative flex flex-col items-start justify-between cursor-pointer w-full h-full p-8`}
                >
                  <h2 className="text-white text-4xl font-black mb-6 bg-[#7a0019] px-4 py-2 border-l-8 border-[#FFDE79]">
                    CEHD Dean&apos;s List
                  </h2>
                  <span className="bg-[#FFDE79] text-[#7a0019] border-l-8 border-[#7a0019] text-md font-bold px-6 py-2 shadow-lg">
                    Congratulations to our scholars on the Spring 2024 Dean&apos;s list
                  </span>
                </div>
              </a>
              </div>
            </section>
            </main>
          </div>
        </div>
    </PageTransition>
  );
};

export default HomePage;