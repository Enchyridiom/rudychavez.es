'use client';

import { useState, useEffect, useRef } from 'react';
import { FooterDesktop, FooterMobile } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu';
import Header from './components/Header';
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
  const loadMoreHandlerRef = useRef<null | (() => void)>(null);
  const limitBounceTweenRef = useRef<gsap.core.Tween | null>(null);

  // Registrar plugins GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin, Observer);
  }, []);

  // Navegar a una sección específica con animación GSAP
  const gotoSection = (index: number) => {
    if (isAnimatingRef.current) return;
    if (index < 0 || index > 2) return;

    const container = mobileContainerRef.current;
    if (!container) return;

    isAnimatingRef.current = true;
    setCurrentPanel(index);

    // Use the container height (100svh) instead of window.innerHeight to avoid mismatch on mobile browser UI.
    const panelHeight = container.getBoundingClientRect().height;

    gsap.to(container, {
      scrollTo: { y: index * panelHeight, autoKill: false },
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });
  };

  // Feedback visual de límite estilo iOS (rubber-band) sin mover el scroll real
  const showLimitFeedback = (direction: 'up' | 'down') => {
    if (isAnimatingRef.current) return;

    // Solo tiene sentido en los límites: header (arriba) o footer (abajo)
    const targetEl =
      currentPanel === 0 ? document.getElementById('header') :
      currentPanel === 2 ? document.getElementById('footer') :
      null;

    if (!targetEl) return;

    // Evitar solapar bounces
    if (limitBounceTweenRef.current && limitBounceTweenRef.current.isActive()) return;

    const offset = direction === 'up' ? 14 : -14; // iOS-like: empuja en sentido contrario al intento

    // Animación corta con yoyo para simular “tope” físico
    limitBounceTweenRef.current = gsap.fromTo(
      targetEl,
      { y: 0 },
      {
        y: offset,
        duration: 0.12,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
        clearProps: 'transform',
      }
    );
  };

  // Handlers para las flechas del menú
  const handleScrollToTop = () => {
    if (currentPanel === 1) {
      // Desde projects, ir a header
      gotoSection(0);
    } else if (currentPanel === 2) {
      // Desde footer, ir a projects
      gotoSection(1);
    } else if (currentPanel === 0) {
      // En header, mostrar feedback de límite superior
      showLimitFeedback('up');
    }
  };

  const handleScrollToBottom = () => {
    if (currentPanel === 1) {
      // Desde projects, ir a footer
      gotoSection(2);
    } else if (currentPanel === 0) {
      // Desde header, ir a projects
      gotoSection(1);
    } else if (currentPanel === 2) {
      // En footer, mostrar feedback de límite inferior
      showLimitFeedback('down');
    }
  };

  // Setup GSAP Observer para panel snap en mobile
  // IMPORTANTE: Solo intercepta scroll en HEADER (#header) y FOOTER (#footer)
  // En PROJECTS (#projects), el scroll es nativo/infinito y NO cambia de sección
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return; // Solo en mobile

    const projectsPanel = scrollContainerRef.current;
    const headerPanel = document.getElementById('header');
    const footerPanel = document.getElementById('footer');
    if (!projectsPanel || !headerPanel || !footerPanel) return;

    // Observer para HEADER: solo captura scroll/touch vertical
    const headerObserver = Observer.create({
      target: headerPanel,
      type: 'wheel,touch',
      onUp: () => {
        if (isAnimatingRef.current || currentPanel !== 0) return;
        // En el límite superior, mostrar feedback
        showLimitFeedback('up');
      },
      onDown: () => {
        if (isAnimatingRef.current || currentPanel !== 0) return;
        // Navegar a projects
        gotoSection(1);
      },
      tolerance: 10,
      preventDefault: true,
      ignore: '.gsap-ignore',
      allowClicks: true,
    });

    // Observer para FOOTER: solo captura scroll/touch vertical
    const footerObserver = Observer.create({
      target: footerPanel,
      type: 'wheel,touch',
      onUp: () => {
        if (isAnimatingRef.current || currentPanel !== 2) return;
        // Navegar a projects
        gotoSection(1);
      },
      onDown: () => {
        if (isAnimatingRef.current || currentPanel !== 2) return;
        // En el límite inferior, mostrar feedback
        showLimitFeedback('down');
      },
      tolerance: 10,
      preventDefault: true,
      ignore: '.gsap-ignore',
      allowClicks: true,
    });

    // PROJECTS: NO tiene Observer, el scroll es nativo
    // La navegación entre secciones desde projects solo ocurre por las flechas

    return () => {
      headerObserver?.kill();
      footerObserver?.kill();
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

      loadMoreHandlerRef.current = handleLoadMore;

      scrollContainerRef.current!.addEventListener('last-scroll.infiniteScroll', handleLoadMore);
    });

    return () => {
      if (scrollContainerRef.current) {
        if (loadMoreHandlerRef.current) {
          scrollContainerRef.current.removeEventListener('last-scroll.infiniteScroll', loadMoreHandlerRef.current);
        }
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
          <Header />
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
        className="md:hidden bg-[#f7f3e8] relative w-full h-[100svh] overflow-y-auto touch-none" 
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
          className="flex flex-col h-[100svh] items-center justify-center px-8 py-0 bg-[#f7f3e8] overscroll-contain" 
          data-name="header" 
          data-node-id="1525:178"
        >
          <Header />
        </div>

        {/* Panel 2: Projects Infinite Scroll Section */}
        <div 
          id="projects"
          ref={scrollContainerRef}
          className="h-[100svh] bg-[#f7f3e8] overflow-y-auto touch-pan-y overscroll-contain flex flex-col gap-4 items-center py-8 px-2.5" 
          data-name="scroll" 
          data-node-id="1525:1039"
          style={{ WebkitOverflowScrolling: 'touch' }}
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
        <div id="footer" className="h-[100svh] overscroll-contain">
          <FooterMobile className="bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative h-full" />
        </div>
      </div>
    </>
  );
}
