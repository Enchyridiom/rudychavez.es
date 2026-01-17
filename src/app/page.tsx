

'use client';

import { useMemo, useState } from 'react';

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

  return (
    <main className="bg-[#f7f3e8] text-[#2f333e]">
      <div className="min-h-screen">
        <section id="header" className="h-screen w-full overflow-hidden">
          <Header />
        </section>

        <section id="projects" className="h-screen w-full overflow-hidden bg-[#f7f3e8]">
          <ProjectsLoop projects={projectsData} />
        </section>

        <section id="footer" className="h-screen w-full overflow-hidden bg-[#d42b57]">
          <div className="hidden md:block h-full">
            <FooterDesktop />
          </div>
          <div className="md:hidden h-full">
            <FooterMobile />
          </div>
        </section>

        <div className="fixed left-0 right-0 bottom-0 z-50">
          <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} variant="mobile" />
        </div>
      </div>
    </main>
  );
}