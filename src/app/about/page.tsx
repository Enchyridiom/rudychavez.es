'use client';

import { useState } from 'react';
import { FooterDesktop, FooterMobile } from '../components/Footer';
import { NavigationMenu } from '../components/NavigationMenu';

const imgPortfolio2023V3FotoPerfil1 = "/assets/a93168c67dfb0440978f4dae3fecd46d44458f1c.png";
const imgImg24941 = "/assets/df5274278c9160cc81582939511bc1ce533d1fd4.png";
const imgImg28071 = "/assets/ecca3b6afb410287fb7ed0bbf06c432c8839289e.png";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-[#f7f3e8] relative w-full min-h-screen">
        {/* Header with image */}
        <div className="relative h-96">
          <img 
            src={imgPortfolio2023V3FotoPerfil1} 
            alt="Rudy Chávez" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-12 py-12 max-w-4xl mx-auto space-y-16">
          {/* Title */}
          <div>
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-6xl mb-4">Sobre mi</h1>
          </div>

          {/* Intro Section */}
          <div className="space-y-4">
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-lg leading-relaxed space-y-4">
              <p>Diseño productos digitales desde el análisis del problema y el contexto en el que existe.</p>
              <p>Trabajo principalmente con web, entendida como producto, sistema y experiencia, no solo como soporte visual.</p>
              <p>Mi enfoque parte de la claridad: entender qué se necesita resolver antes de decidir cómo debe verse.</p>
            </div>
          </div>

          {/* Cómo trabajo Section */}
          <div className="space-y-4">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Cómo trabajo</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-lg leading-relaxed space-y-4">
              <p>Empiezo definiendo el problema, no por la interfaz. Analizo con detalle cada factor que pueda afectar al resultado final antes de planteantear propuestas para que conseguir algo real y funcional.</p>
              <p>El diseño es una consecuencia de ese proceso: estructura, jerarquía y forma alineadas con una intención clara. UX y UI no se separan, se construyen juntas.</p>
            </div>
          </div>

          {/* Image */}
          <div className="h-80 rounded-2xl overflow-hidden bg-gray-200">
            <img src={imgImg24941} alt="Workspace" className="w-full h-full object-cover" />
          </div>

          {/* Web como medio Section */}
          <div className="space-y-4">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Web como medio</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-lg leading-relaxed space-y-4">
              <p>La web es el espacio donde desarrollo la mayor parte de mi trabajo. Me interesa por su capacidad de adaptación, su lógica estructural y su relación directa con el contenido y el uso real.</p>
              <p>Diseño pensando en sistemas que se entienden, se mantienen y funcionan con el tiempo.</p>
            </div>
          </div>

          {/* Image */}
          <div className="h-80 rounded-2xl overflow-hidden bg-gray-200">
            <img src={imgImg28071} alt="Team" className="w-full h-full object-cover" />
          </div>

          {/* Marco profesional Section */}
          <div className="space-y-4 pb-16">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Marco profesional</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-lg leading-relaxed space-y-4">
              <p>Colaboro en procesos donde el diseño tiene un papel estratégico, no decorativo.</p>
              <p>No concibo el diseño como una capa final, sino como una herramienta para ordenar, decidir y comunicar mejor.</p>
              <p>Encajo mejor en proyectos digitales que necesitan claridad, estructura y criterio. Webs y productos donde el diseño debe responder a un problema concreto y no solo a una estética.</p>
              <p>Me interesa trabajar con equipos o clientes que valoran el proceso tanto como el resultado.</p>
            </div>
          </div>
        </div>

        {/* Footer Desktop */}
        <FooterDesktop />
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#f7f3e8] relative w-full min-h-screen pb-24">
        {/* Navigation Menu */}
        <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} variant="full" />

        {/* Profile Image */}
        <div className="h-64 w-full overflow-hidden bg-gray-200">
          <img src={imgPortfolio2023V3FotoPerfil1} alt="Rudy" className="w-full h-full object-cover" />
        </div>

        {/* Title */}
        <div className="px-6 py-6">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Sobre mi</h1>
        </div>

        {/* Content */}
        <div className="px-6 space-y-8 pb-32">
          {/* Intro */}
          <div className="space-y-2">
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed space-y-2">
              <p>Diseño productos digitales desde el análisis del problema y el contexto en el que existe.</p>
              <p>Trabajo principalmente con web, entendida como producto, sistema y experiencia, no solo como soporte visual.</p>
              <p>Mi enfoque parte de la claridad: entender qué se necesita resolver antes de decidir cómo debe verse.</p>
            </div>
          </div>

          {/* Cómo trabajo */}
          <div className="space-y-4">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl">Cómo trabajo</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed space-y-2">
              <p>Empiezo definiendo el problema, no por la interfaz. Analizo con detalle cada factor que pueda afectar al resultado final antes de planteantear propuestas para que conseguir algo real y funcional.</p>
              <p>El diseño es una consecuencia de ese proceso: estructura, jerarquía y forma alineadas con una intención clara. UX y UI no se separan, se construyen juntas.</p>
            </div>
          </div>

          {/* Image */}
          <div className="h-56 rounded-lg overflow-hidden bg-gray-200">
            <img src={imgImg24941} alt="Workspace" className="w-full h-full object-cover" />
          </div>

          {/* Web como medio */}
          <div className="space-y-4">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl">Web como medio</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed space-y-2">
              <p>La web es el espacio donde desarrollo la mayor parte de mi trabajo. Me interesa por su capacidad de adaptación, su lógica estructural y su relación directa con el contenido y el uso real.</p>
              <p>Diseño pensando en sistemas que se entienden, se mantienen y funcionan con el tiempo.</p>
            </div>
          </div>

          {/* Image */}
          <div className="h-56 rounded-lg overflow-hidden bg-gray-200">
            <img src={imgImg28071} alt="Team" className="w-full h-full object-cover" />
          </div>

          {/* Marco profesional */}
          <div className="space-y-4">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl">Marco profesional</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed space-y-2">
              <p>Colaboro en procesos donde el diseño tiene un papel estratégico, no decorativo.</p>
              <p>No concibo el diseño como una capa final, sino como una herramienta para ordenar, decidir y comunicar mejor.</p>
              <p>Encajo mejor en proyectos digitales que necesitan claridad, estructura y criterio. Webs y productos donde el diseño debe responder a un problema concreto y no solo a una estética.</p>
              <p>Me interesa trabajar con equipos o clientes que valoran el proceso tanto como el resultado.</p>
            </div>
          </div>
        </div>

        {/* Footer Mobile */}
        <FooterMobile />
      </div>
    </>
  );
}
