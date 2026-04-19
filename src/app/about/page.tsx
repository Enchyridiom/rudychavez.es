'use client';

import { useState } from 'react';
import { FooterDesktop, FooterMobile } from '../components/Footer';
import { NavigationMenu } from '../components/NavigationMenu';
import { ImagePlaceholder } from '../components/ImagePlaceholder';

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} variant="full" />

      {/* Desktop View */}
      <div className="hidden md:block bg-[#f7f3e8] relative w-full min-h-screen">
        {/* Header placeholder */}
        <div className="relative h-96 px-12 pt-12">
          <ImagePlaceholder />
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

          {/* Image placeholder */}
          <div className="h-80">
            <ImagePlaceholder />
          </div>

          {/* Web como medio Section */}
          <div className="space-y-4">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Web como medio</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-lg leading-relaxed space-y-4">
              <p>La web es el espacio donde desarrollo la mayor parte de mi trabajo. Me interesa por su capacidad de adaptación, su lógica estructural y su relación directa con el contenido y el uso real.</p>
              <p>Diseño pensando en sistemas que se entienden, se mantienen y funcionan con el tiempo.</p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="h-80">
            <ImagePlaceholder />
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
        <section className="min-h-screen">
          <FooterDesktop />
        </section>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#f7f3e8] relative w-full min-h-screen">
        {/* Profile placeholder */}
        <div className="h-64 w-full px-6 pt-16">
          <ImagePlaceholder />
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

          {/* Image placeholder */}
          <div className="h-56">
            <ImagePlaceholder />
          </div>

          {/* Web como medio */}
          <div className="space-y-4">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl">Web como medio</h2>
            <div className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-base leading-relaxed space-y-2">
              <p>La web es el espacio donde desarrollo la mayor parte de mi trabajo. Me interesa por su capacidad de adaptación, su lógica estructural y su relación directa con el contenido y el uso real.</p>
              <p>Diseño pensando en sistemas que se entienden, se mantienen y funcionan con el tiempo.</p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="h-56">
            <ImagePlaceholder />
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
        <section className="min-h-screen">
          <FooterMobile />
        </section>
      </div>
    </>
  );
}
