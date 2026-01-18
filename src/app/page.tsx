'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import Header from './components/Header';
import ProjectsLoop from './components/ProjectsLoop';
import { FooterDesktop, FooterMobile } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu';

type Project = {
  id: number;
  title: string;
  slug: string;
  image: string;
  rotation: number;
};

const imgProject01 = '/projects/project01/project_cover_filmin.png';
const imgProject02 = '/projects/project02/project_cover_zumo-de-fetos.png';
const imgProject03 = '/projects/project03/project_cover_rainbox.png';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<0 | 1 | 2>(0);

  const navScrollRef = useRef(false);
  const navScrollTimerRef = useRef<number | null>(null);

  const projectsData: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Filmin',
        slug: 'filmin',
        image: imgProject01,
        rotation: -2,
      },
      {
        id: 2,
        title: 'Zumo de fetos',
        slug: 'zumo-de-fetos',
        image: imgProject02,
        rotation: 1,
      },
      {
        id: 3,
        title: 'Rainbox',
        slug: 'rainbox',
        image: imgProject03,
        rotation: -1,
      },
    ],
    []
  );

  useEffect(() => {
    const el = sectionsRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = window.innerHeight || 1;
        const next = Math.round(el.scrollTop / h);
        const clamped = (Math.max(0, Math.min(2, next)) as 0 | 1 | 2);

        if (!navScrollRef.current && clamped === 1) {
          const target = h;
          if (Math.abs(el.scrollTop - target) > 2) {
            el.scrollTop = target;
          }
        }

        setActiveSection(clamped);
      });
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      if (navScrollTimerRef.current) window.clearTimeout(navScrollTimerRef.current);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  const sectionIds: Array<'header' | 'projects' | 'footer'> = ['header', 'projects', 'footer'];

  const scrollToSection = (idx: 0 | 1 | 2) => {
    navScrollRef.current = true;
    if (navScrollTimerRef.current) window.clearTimeout(navScrollTimerRef.current);

    document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    navScrollTimerRef.current = window.setTimeout(() => {
      navScrollRef.current = false;
    }, 700);
  };

  const goUp = () => {
    if (activeSection === 0) return;
    scrollToSection(((activeSection - 1) as 0 | 1 | 2));
  };

  const goDown = () => {
    if (activeSection === 2) return;
    scrollToSection(((activeSection + 1) as 0 | 1 | 2));
  };

  return (
    <main className="bg-[#f7f3e8] text-[#2f333e]">
      <div
        ref={sectionsRef}
        className="h-screen w-full overflow-y-scroll overscroll-y-none scroll-smooth snap-y snap-mandatory"
      >
        <section id="header" className="h-screen w-full shrink-0 snap-start overflow-hidden">
          <Header />
        </section>

        <section id="projects" className="h-screen w-full shrink-0 snap-start overflow-hidden bg-[#f7f3e8]">
          <ProjectsLoop projects={projectsData} />
        </section>

        <section id="footer" className="h-screen w-full shrink-0 snap-start overflow-hidden bg-[#d42b57]">
          <div className="hidden md:block h-full">
            <FooterDesktop />
          </div>
          <div className="md:hidden h-full">
            <FooterMobile />
          </div>
        </section>
      </div>

      <div className="fixed left-0 right-0 bottom-0 z-50">
        <NavigationMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          variant="mobile"
          onScrollToTop={goUp}
          onScrollToBottom={goDown}
          tone={activeSection === 2 ? 'footer' : 'default'}
        />
      </div>
    </main>
  );
}