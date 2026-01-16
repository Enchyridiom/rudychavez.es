'use client';

import { useState, useEffect, useRef } from 'react';
import { FooterDesktop, FooterMobile } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/all';

const imgProject01 = "/projects/project01/project_cover_filmin.png";
const imgProject02 = "/projects/project02/project_cover_zumo de fetos.png";
const imgProject03 = "/projects/project03/project_cover_rainbox.png";

const projectsData = [
  { id: 1, title: "Filmin", image: imgProject01, rotation: 0 },
  { id: 2, title: "Zumo de Fetos", image: imgProject02, rotation: 2 },
  { id: 3, title: "Rainbox", image: imgProject03, rotation: 1 },
  { id: 4, title: "Filmin", image: imgProject01, rotation: -2 },
  { id: 5, title: "Zumo de Fetos", image: imgProject02, rotation: 0 },
  { id: 6, title: "Rainbox", image: imgProject03, rotation: 1 },
  { id: 7, title: "Filmin", image: imgProject01, rotation: -1 },
  { id: 8, title: "Zumo de Fetos", image: imgProject02, rotation: 2 },
  { id: 9, title: "Rainbox", image: imgProject03, rotation: -2 },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(projectsData.slice(0, 3));
  const [currentPanel, setCurrentPanel] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const infScrollRef = useRef<any>(null);
  const isAnimatingRef = useRef(false);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<any>(null);

  // Registrar plugins GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin, Observer);
  }, []);

  const gotoPanel = (index: number) => {
    if (isAnimatingRef.current) return;
    if (index < 0 || index > 2) return;

    isAnimatingRef.current = true;
    setCurrentPanel(index);

    const container = mobileContainerRef.current;
    if (!container) return;

    gsap.to(container, {
      scrollTo: { y: index * window.innerHeight, autoKill: false },
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });
  };

  const handleScrollToTop = () => {
    gotoPanel(0);
  };

  const handleScrollToBottom = () => {
    gotoPanel(2);
  };

  // Setup GSAP Observer para panel snap en mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return; // Solo en mobile

    const projectsPanel = scrollContainerRef.current;
    if (!projectsPanel) return;

    observerRef.current = Observer.create({
      target: mobileContainerRef.current,
      type: 'wheel,touch',
      onUp: () => {
        if (isAnimatingRef.current) return;
        
        // Si estamos en projects y no está en el top, no cambiar panel
        if (currentPanel === 1 && projectsPanel.scrollTop > 0) {
          return;
        }
        
        gotoPanel(currentPanel - 1);
      },
      onDown: () => {
        if (isAnimatingRef.current) return;
        
        // Si estamos en projects y no está en el bottom, no cambiar panel
        if (currentPanel === 1) {
          const isAtBottom = projectsPanel.scrollHeight - projectsPanel.scrollTop <= projectsPanel.clientHeight + 10;
          if (!isAtBottom) {
            return;
          }
        }
        
        gotoPanel(currentPanel + 1);
      },
      tolerance: 10,
      preventDefault: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, [currentPanel]);

  // Setup infinite scroll
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Importación dinámica de InfiniteScroll para evitar window is not defined en SSR
    import('infinite-scroll').then(({ default: InfiniteScroll }) => {
      infScrollRef.current = new InfiniteScroll(scrollContainerRef.current!, {
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

      scrollContainerRef.current!.addEventListener('last-scroll.infiniteScroll', handleLoadMore);
    });

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('last-scroll.infiniteScroll', () => {});
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
      <div 
        ref={mobileContainerRef}
        className="md:hidden bg-[#f7f3e8] relative w-full h-[100svh] overflow-y-auto snap-y snap-mandatory" 
        data-name="rudychavez.es /home – Mobile" 
        data-node-id="1525:177"
      >
        {/* Navigation Menu - up/down variant for panel snap */}
        <NavigationMenu 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          variant="up-down"
          onScrollToTop={handleScrollToTop}
          onScrollToBottom={handleScrollToBottom}
        />

        {/* Panel 1: Header Section */}
        <div 
          id="header" 
          className="flex flex-col h-[100svh] items-center justify-center px-8 py-0 bg-[#f7f3e8] snap-start snap-always" 
          data-name="header" 
          data-node-id="1525:178"
        >
          <div className="flex items-center justify-center" data-name="h1" data-node-id="1525:179">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-8xl text-center leading-tight" data-node-id="1525:180">
              <div>rudy</div>
              <div>chávez</div>
            </h1>
          </div>
        </div>

        {/* Panel 2: Projects Infinite Scroll Section */}
        <div 
          id="projects"
          ref={scrollContainerRef}
          className="h-[100svh] bg-[#f7f3e8] overflow-y-auto flex flex-col gap-4 items-center py-8 px-2.5 snap-start snap-always" 
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

        {/* Panel 3: Footer Section */}
        <div id="footer" className="h-[100svh] snap-start snap-always">
          <FooterMobile className="bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative h-full" />
        </div>
      </div>
    </>
  );
}
