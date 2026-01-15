'use client';

import { useState } from 'react';
import { FooterDesktop, FooterMobile } from '../components/Footer';
import { NavigationMenu } from '../components/NavigationMenu';

const imgProject02 = "http://localhost:3845/assets/8692216ed1fece7375dae6f69b8c2bfba2fc407b.png";
const imgProject04 = "http://localhost:3845/assets/a20c202ba781a2580b6a253386051331d499f765.png";
const imgProject05 = "http://localhost:3845/assets/3b344ce9e6ed198303cf64c6daabaf4c81bf2c1b.png";
const imgProject01 = "http://localhost:3845/assets/9cc448b6415cd3c5ccaff9fc14842bb8a364ea35.png";
const img = "http://localhost:3845/assets/1c151532bb2c0724a2188b64d81a48de412a4fc1.png";

type ProjectsCoverProps = {
  className?: string;
  property1?: "project 01" | "project 02" | "project 03" | "project 04" | "project 05";
};

function ProjectsCover({ className, property1 = "project 01" }: ProjectsCoverProps) {
  if (property1 === "project 02") {
    return (
      <div className={className} data-name="Property 1=project 02" data-node-id="1530:1201">
        <div className="absolute inset-0 rounded-[16px]" data-name="project 02" data-node-id="1530:1180">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgProject02} />
        </div>
      </div>
    );
  }
  if (property1 === "project 04") {
    return (
      <div className={className} data-name="Property 1=project 04" data-node-id="1530:1204">
        <div className="absolute inset-0 rounded-[8px]" data-name="project 04" data-node-id="1530:1192">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgProject04} />
        </div>
      </div>
    );
  }
  if (property1 === "project 05") {
    return (
      <div className={className} data-name="Property 1=project 05" data-node-id="1530:1203">
        <div className="absolute inset-0 rounded-[8px]" data-name="project 05" data-node-id="1530:1197">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgProject05} />
        </div>
      </div>
    );
  }
  return (
    <div className={className} data-name="Property 1=project 01" data-node-id="1530:1200">
      <div className="absolute inset-0 rounded-[8px]" data-name="project 01" data-node-id="1530:1199">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgProject01} />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Filmin",
      description: "Rediseño de plataforma de streaming bajo demanda.",
      image: "project 01"
    },
    {
      id: 2,
      title: "Rainbox",
      description: "Branding para estudio fotográfico enfocado en momentos vitales.",
      image: "project 02"
    },
    {
      id: 3,
      title: "Zumo de Fetos",
      description: "Juego de mesa en colaboración con Mister Jägger y Xuri Fenton.",
      image: "project 03"
    },
    {
      id: 4,
      title: "Antes del Sí",
      description: "Mini brand para estudio profesional de maquillaje.",
      image: "project 04"
    },
    {
      id: 5,
      title: "Project NQ",
      description: "Manual de uso de teclados mecánicos.",
      image: "project 05"
    }
  ];

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-[#f7f3e8] relative w-full min-h-screen">
        {/* Header */}
        <div className="px-12 py-12 border-b border-[#5576e8]">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-6xl mb-4">Proyectos</h1>
        </div>

        {/* Projects Grid */}
        <div className="p-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {projects.map((project, idx) => {
              let image = imgProject01;
              if (project.image === "project 02") image = imgProject02;
              else if (project.image === "project 03") image = img;
              else if (project.image === "project 04") image = imgProject04;
              else if (project.image === "project 05") image = imgProject05;

              return (
                <div key={project.id} className="flex flex-col">
                  <div className="h-80 rounded-2xl overflow-hidden mb-6 bg-gray-200">
                    <img src={image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-2xl mb-3">{project.title}</h3>
                  <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed">{project.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Desktop */}
        <FooterDesktop />
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#f7f3e8] relative w-full min-h-screen pb-24">
        {/* Navigation Menu */}
        <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Header */}
        <div className="px-6 py-8">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Proyectos</h1>
        </div>

        {/* Projects List */}
        <div className="px-6 space-y-8 pb-32">
          {projects.map((project) => {
            let image = imgProject01;
            if (project.image === "project 02") image = imgProject02;
            else if (project.image === "project 03") image = img;
            else if (project.image === "project 04") image = imgProject04;
            else if (project.image === "project 05") image = imgProject05;

            return (
              <div key={project.id} className="flex flex-col">
                <div className="h-64 rounded-2xl overflow-hidden mb-4 bg-gray-200">
                  <img src={image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl mb-2">{project.title}</h3>
                <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed">{project.description}</p>
              </div>
            );
          })}
        </div>

        {/* Footer Mobile */}
        <FooterMobile className="fixed bottom-0 left-0 right-0 bg-[#d42b57] h-screen text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative" />
      </div>
    </>
  );
}
