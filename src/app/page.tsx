'use client';

import { useState, useEffect, useRef } from 'react';
import { FooterDesktop, FooterMobile } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu';
import Header from './components/Header';
import ProjectsLoop from './components/ProjectsLoop';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const imgProject01 = "/projects/filmin/project_cover_filmin.png";
const imgProject02 = "/projects/zumo-de-fetos/project_cover_zumo-de-fetos.png";
const imgProject03 = "/projects/rainbox/project_cover_rainbox.png";

const projectsData = [
  { id: 1, title: "Filmin", slug: "filmin", image: imgProject01, rotation: 0 },
  { id: 2, title: "Zumo de Fetos", slug: "zumo-de-fetos", image: imgProject02, rotation: 2 },
  { id: 3, title: "Rainbox", slug: "rainbox", image: imgProject03, rotation: 1 },
  { id: 4, title: "Filmin", slug: "filmin", image: imgProject01, rotation: -2 },
  { id: 5, title: "Zumo de Fetos", slug: "zumo-de-fetos", image: imgProject02, rotation: 0 },
  { id: 6, title: "Rainbox", slug: "rainbox", image: imgProject03, rotation: 1 },
  { id: 7, title: "Filmin", slug: "filmin", image: imgProject01, rotation: -1 },
  { id: 8, title: "Zumo de Fetos", slug: "zumo-de-fetos", image: imgProject02, rotation: 2 },
  { id: 9, title: "Rainbox", slug: "rainbox", image: imgProject03, rotation: -2 },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPanel, setCurrentPanel] = useState(0);
  const isAnimatingRef = useRef(false);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const limitBounceTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const gotoSection = (index: number) => {
    if (isAnimatingRef.current) return;
    if (index < 0 || index > 2) return;

    const container = mobileContainerRef.current;
    if (!container) return;

    isAnimatingRef.current = true;
    setCurrentPanel(index);

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

  const showLimitFeedback = (direction: 'up' | 'down') => {
    if (isAnimatingRef.current) return;

    const targetEl =
      currentPanel === 0 ? document.getElementById('header') :
      currentPanel === 2 ? document.getElementById('footer') :
      null;

    if (!targetEl) return;

    if (limitBounceTweenRef.current && limitBounceTweenRef.current.isActive()) return;

    const offset = direction === 'up' ? 14 : -14;

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

  const handleScrollToTop = () => {
    if (currentPanel === 1) {
      gotoSection(0);
    } else if (currentPanel === 2) {
      gotoSection(1);
    } else if (currentPanel === 0) {
      showLimitFeedback('up');
    }
  };

  const handleScrollToBottom = () => {
    if (currentPanel === 1) {
      gotoSection(2);
    } else if (currentPanel === 0) {
      gotoSection(1);
    } else if (currentPanel === 2) {
      showLimitFeedback('down');
    }
  };

  return (
    <>
      <div className="hidden md:block bg-[#f7f3e8] relative w-full">
        <div className="flex flex-col h-screen items-center justify-center px-8 py-0 bg-[#f7f3e8]">
          <Header />
        </div>

        <div className="flex flex-col gap-4 h-screen items-center justify-center px-2.5 py-0 bg-[#f7f3e8]">
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" />
        </div>

        <FooterDesktop />
      </div>

      <div 
        ref={mobileContainerRef}
        className="md:hidden bg-[#f7f3e8] relative w-full h-[100svh] overflow-y-auto touch-none"
      >
        <NavigationMenu 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          variant="up-down"
          onScrollToTop={handleScrollToTop}
          onScrollToBottom={handleScrollToBottom}
        />

        <div 
          id="header" 
          className="flex flex-col h-[100svh] items-center justify-center px-8 py-0 bg-[#f7f3e8] overscroll-contain"
        >
          <Header />
        </div>

        <div 
          id="projects"
          className="h-[100svh] bg-[#f7f3e8] overflow-y-auto touch-pan-y overscroll-contain flex flex-col gap-4 items-center py-8 px-2.5" 
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <ProjectsLoop projects={projectsData} />
        </div>

        <div id="footer" className="h-[100svh] overscroll-contain">
          <FooterMobile />
        </div>
      </div>
    </>
  );
}
