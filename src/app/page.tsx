'use client';

import { useMemo, useRef, useState } from 'react';

import Header from './components/Header';
import ProjectsLoop from './components/ProjectsLoop';
import { FooterDesktop, FooterMobile } from './components/Footer';

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
  const [currentPanel, setCurrentPanel] = useState<0 | 1 | 2>(0);
  const panelsWrapperRef = useRef<HTMLDivElement>(null);

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

  const gotoPanel = (next: 0 | 1 | 2) => {
    setCurrentPanel(next);
  };

  const goUp = () => gotoPanel((Math.max(0, currentPanel - 1) as 0 | 1 | 2));
  const goDown = () => gotoPanel((Math.min(2, currentPanel + 1) as 0 | 1 | 2));

  return (
    <main className="bg-[#f7f3e8]">
      <div className="hidden md:block min-h-screen bg-[#f7f3e8]">
        <Header />
        <section className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-3xl px-6">
            <ProjectsLoop projects={projectsData} />
          </div>
        </section>
        <FooterDesktop />
      </div>

      <div className="md:hidden w-full h-[100svh] overflow-hidden touch-none bg-[#f7f3e8]">
        <div
          ref={panelsWrapperRef}
          className="w-full flex flex-col transition-transform duration-500"
          style={{
            willChange: 'transform',
            transform: `translateY(-${currentPanel * 100}svh)`,
            height: '300svh',
          }}
        >
          <section id="header" className="h-[100svh] w-full shrink-0">
            <Header />
            <div className="fixed left-4 bottom-4 z-50 flex gap-3">
              <button
                type="button"
                onClick={goDown}
                className="rounded-full bg-[#f7f3e8] text-[#2f333e] px-6 py-4"
              >
                ↓
              </button>
            </div>
          </section>

          <section id="projects" className="h-[100svh] w-full shrink-0 overflow-hidden bg-[#f7f3e8]">
            <ProjectsLoop projects={projectsData} />
            <div className="fixed left-4 bottom-4 z-50 flex gap-3">
              <button
                type="button"
                onClick={goUp}
                className="rounded-full bg-[#f7f3e8] text-[#2f333e] px-6 py-4"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={goDown}
                className="rounded-full bg-[#f7f3e8] text-[#2f333e] px-6 py-4"
              >
                ↓
              </button>
            </div>
          </section>

          <section id="footer" className="h-[100svh] w-full shrink-0 bg-[#d42b57]">
            <div className="w-full h-full bg-[#d42b57]">
              <FooterMobile />
            </div>
            <div className="fixed left-4 bottom-4 z-50 flex gap-3">
              <button
                type="button"
                onClick={goUp}
                className="rounded-full bg-[#f7f3e8] text-[#2f333e] px-6 py-4"
              >
                ↑
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
