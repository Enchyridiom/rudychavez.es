'use client';

import { useState, useEffect, useRef } from 'react';
import { FooterDesktop, FooterMobile } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu';
import InfiniteScroll from 'infinite-scroll';

const imgProject01 = "http://localhost:3845/assets/9cc448b6415cd3c5ccaff9fc14842bb8a364ea35.png";
const imgProject02 = "http://localhost:3845/assets/8692216ed1fece7375dae6f69b8c2bfba2fc407b.png";
const imgProject03 = "http://localhost:3845/assets/1c151532bb2c0724a2188b64d81a48de412a4fc1.png";
const imgProject04 = "http://localhost:3845/assets/3b344ce9e6ed198303cf64c6daabaf4c81bf2c1b.png";
const imgProject05 = "http://localhost:3845/assets/a20c202ba781a2580b6a253386051331d499f765.png";

const projectsData = [
  { id: 1, title: "Filmin", image: imgProject01, rotation: 0 },
  { id: 2, title: "Rainbox", image: imgProject02, rotation: 2 },
  { id: 3, title: "Zumo de Fetos", image: imgProject03, rotation: 1 },
  { id: 4, title: "Antes del Sí", image: imgProject04, rotation: -2 },
  { id: 5, title: "Project NQ", image: imgProject05, rotation: 0 },
  { id: 6, title: "Filmin", image: imgProject01, rotation: 1 },
  { id: 7, title: "Rainbox", image: imgProject02, rotation: -1 },
  { id: 8, title: "Zumo de Fetos", image: imgProject03, rotation: 2 },
  { id: 9, title: "Antes del Sí", image: imgProject04, rotation: -2 },
  { id: 10, title: "Project NQ", image: imgProject05, rotation: 1 },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(projectsData.slice(0, 5));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const infScrollRef = useRef<InfiniteScroll | null>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    infScrollRef.current = new InfiniteScroll(scrollContainerRef.current, {
      path: () => '',
      responseType: 'text',
      status: '.page-load-status',
      history: false,
      onInit: function() {
        console.log('Infinite Scroll initialized');
      },
    });

    const handleLoadMore = () => {
      setDisplayedProjects(prev => {
        const nextIndex = prev.length;
        const newProjects = projectsData.slice(nextIndex, nextIndex + 5);
        if (newProjects.length > 0) {
          return [...prev, ...newProjects];
        }
        return prev;
      });
    };

    scrollContainerRef.current.addEventListener('last-scroll.infiniteScroll', handleLoadMore);

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('last-scroll.infiniteScroll', handleLoadMore);
      }
      if (infScrollRef.current) {
        infScrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-[#f7f3e8] relative w-full" data-name="rudychavez.es /home – Desktop" data-node-id="1525:221">
        {/* Header Section */}
        <div className="flex flex-col h-screen items-center justify-center px-8 py-0 bg-[#f7f3e8]" data-name="header" data-node-id="1525:222">
          <div className="flex items-center justify-center" data-name="h1" data-node-id="1525:223">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-8xl text-center leading-tight" data-node-id="1525:224">
              <div>rudy</div>
              <div>chávez</div>
            </h1>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col gap-4 h-screen items-center justify-center px-2.5 py-0 bg-[#f7f3e8]" data-name="main" data-node-id="1525:225">
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1525:226" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1525:227" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1525:228" />
        </div>

        {/* Footer Section */}
        <FooterDesktop />
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#f7f3e8] relative w-full min-h-screen pb-24" data-name="rudychavez.es /home – Mobile" data-node-id="1525:177">
        {/* Navigation Menu */}
        <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Header Section */}
        <div className="flex flex-col h-screen items-center justify-center px-8 py-0 bg-[#f7f3e8]" data-name="header" data-node-id="1525:178">
          <div className="flex items-center justify-center" data-name="h1" data-node-id="1525:179">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-8xl text-center leading-tight" data-node-id="1525:180">
              <div>rudy</div>
              <div>chávez</div>
            </h1>
          </div>
        </div>

        {/* Projects Infinite Scroll Section */}
        <div 
          ref={scrollContainerRef}
          className="h-screen bg-[#f7f3e8] overflow-y-auto flex flex-col gap-4 items-center py-8 px-2.5" 
          data-name="scroll" 
          data-node-id="1525:1039"
        >
          {displayedProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-center relative w-96" style={{ transform: `rotate(${project.rotation}deg)` }}>
              <div className="flex flex-col items-center justify-center p-2.5 relative w-96">
                <div className="h-64 relative rounded-2xl shrink-0 w-96 overflow-hidden">
                  <img 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl" 
                    src={project.image} 
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="page-load-status" data-text="Cargando..."></div>
        </div>

        {/* Footer Section */}
        <FooterMobile className="bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative h-screen" />
      </div>
    </>
  );
}
