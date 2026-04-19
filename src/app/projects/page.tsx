'use client';

import { useState } from 'react';
import { FooterDesktop, FooterMobile } from '../components/Footer';
import { NavigationMenu } from '../components/NavigationMenu';
import { ImagePlaceholder } from '../components/ImagePlaceholder';

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Filmin',
      description: 'Rediseño de plataforma de streaming bajo demanda.',
    },
    {
      id: 2,
      title: 'Rainbox',
      description: 'Branding para estudio fotográfico enfocado en momentos vitales.',
    },
    {
      id: 3,
      title: 'Zumo de Fetos',
      description: 'Juego de mesa en colaboración con Mister Jägger y Xuri Fenton.',
    },
    {
      id: 4,
      title: 'Antes del Sí',
      description: 'Mini brand para estudio profesional de maquillaje.',
    },
    {
      id: 5,
      title: 'Project NQ',
      description: 'Manual de uso de teclados mecánicos.',
    },
  ];

  return (
    <>
      <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} variant="full" />

      {/* Desktop View */}
      <div className="hidden md:block bg-[#f7f3e8] relative w-full min-h-screen">
        {/* Header */}
        <div className="px-12 py-12 border-b border-[#5576e8]">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-6xl mb-4">Proyectos</h1>
        </div>

        {/* Projects Grid */}
        <div className="p-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col">
                <div className="h-80 mb-6">
                  <ImagePlaceholder />
                </div>
                <h3 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-2xl mb-3">{project.title}</h3>
                <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Desktop */}
        <section className="min-h-screen">
          <FooterDesktop />
        </section>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#f7f3e8] relative w-full min-h-screen">
        {/* Header — pt-20 leaves 40px for the under-construction banner */}
        <div className="px-6 pt-20 pb-8">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Proyectos</h1>
        </div>

        {/* Projects List */}
        <div className="px-6 space-y-8 pb-32">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col">
              <div className="h-64 mb-4">
                <ImagePlaceholder />
              </div>
              <h3 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl mb-2">{project.title}</h3>
              <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Mobile */}
        <section className="min-h-screen">
          <FooterMobile />
        </section>
      </div>
    </>
  );
}
