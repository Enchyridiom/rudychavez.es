'use client';

import { useState } from 'react';
import { FooterDesktop, FooterMobile } from '../../components/Footer';
import { NavigationMenu } from '../../components/NavigationMenu';

const imgFondoGalaxiaSmall1 = "/assets/e6ed01b188bbabfae71969eab6045d957f38b8ce.png";
const imgImg7489 = "/assets/461557d8858972c7ad087bd74d3e728a7c103362.png";
const imgLogoPortada1 = "/assets/a712d7e007c14436b75b649428e99022ebb534cb.png";
const imgImg7480 = "/assets/a7aa777341fc3e7d1d632e1586e9ddd40d62903a.png";
const imgZdfFotoCajasLateral = "/assets/15dfd11525eb9ba9b3d82057ffd5b4ae39d7e3e9.png";
const imgZdfFotoPlanoGeneralCajasApiladas = "/assets/16862e7c42af9ca3040e445018837edabee6d1db.png";
const imgImg7490 = "/assets/a77cf454902651af6cecc5970cc7e093c6e1f07f.png";
const imgZdfFotoMontajeMockup = "/assets/8ec621d5a8f898d488493e569976b20d9627484b.png";
const imgZdfFotoPlanoGeneralCajasFrontal = "/assets/297c6c36568ebb92a414934f57a08bc336848245.png";
const imgZdfFotoJuegosApilados = "/assets/1c151532bb2c0724a2188b64d81a48de412a4fc1.png";
const imgCroquisZdf11 = "/assets/30eaa80ebac03baa746ceee2f30b19723fc0b1a6.png";
const imgScreenshot20260110At1646571 = "/assets/8acd9cf6c93c571d27eecf7fff38de29ff47bcf0.png";
const imgScreenshot20260110At1643411 = "/assets/3e5346ec84d1a9d1ff47eeccafa900f680c26830.png";
const imgImg39751 = "/assets/6b22cf6f61fa5f5298a9ee8e2d2c51af9b559467.png";
const imgPlancha1 = "/assets/33d9ff4669bb55901d80d42d6fe31b2f6b315ad1.png";
const imgImg2408 = "/assets/1cb75b4def5e3a595e3f110b47d023c5719c1484.png";
const imgAnversoCaja2X1 = "/assets/cb96aa7404c9057c040c79203da77777a5fd1401.png";
const imgPlancha11 = "/assets/196fe30dacf664fc6c6de54b7b338969c72b45f2.png";
const imgAnverso4X2 = "/assets/3e30464019dc5320656fd1620e3d3df5638617a3.png";
const imgReverso12 = "/assets/b87806864ce13d268f8113f572b719f16c8b798e.png";
const imgZdfFotoPlanoMedioJuegoDesplegado = "/assets/3131708038181ce396db6d51507192995b978f30.png";
const imgZdfFotoContraportadaFrontal1 = "/assets/d7421b25979b32d9359e3ca2fa7fe23c2dee00b8.png";
const imgZdfFotoPortadaFrontal = "/assets/848951e3d6282fc98e2c1a74852bc2720e65ce3a.png";
const imgZdfFotoPresentacionCartas = "/assets/9d3d313fe73cfb5c574b33f17731f725e7283a24.png";
const imgZdfFotoPlanoGeneralJuegoDesplegado = "/assets/f6ed1c943dbe0d9887d9642cc186a349fcfd2a65.png";
const imgImg7548 = "/assets/df6f23c48ce370b5a3400ebe72badcc9d4cf76fa.png";

export default function ZumoDeFetosPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-[#f7f3e8] relative w-full min-h-screen">
        {/* Header */}
        <div className="px-12 py-12 border-b border-[#5576e8]">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-6xl mb-4">Zumo de Fetos</h1>
          <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-xl mb-8 max-w-2xl">
            Juego de mesa en colaboración con Mister Jägger y Xuri Fenton.
          </p>
          <p className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-sm mb-4">
            Proyecto de diseño de packaging y sistema físico.
          </p>
        </div>

        {/* Content */}
        <div className="px-12 py-12 max-w-7xl mx-auto space-y-16">
          {/* Hero Image */}
          <div className="h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-600 to-purple-700 flex items-center justify-center p-8">
            <img src={imgLogoPortada1} alt="Zumo de Fetos Logo" className="h-full object-contain" />
          </div>

          {/* Briefing Section */}
          <div className="space-y-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Briefing</h2>
            <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-lg leading-relaxed max-w-3xl">
              El proyecto consistía en diseñar el packaging completo del juego a partir de una gráfica ya definida, asegurando una experiencia de uso clara en la lectura de reglas, el manejo de los componentes y el guardado tras cada partida.
            </p>
            <div className="space-y-2 text-sm font-['Mint_Grotesk',sans-serif] text-[#2f333e]">
              <p>Cliente: Míster Jägger</p>
              <p>Colaboración: Xuri Fenton (ilustración)</p>
              <p>Duración: 8 meses</p>
              <p>Software: Figma, Adobe Photoshop, Illustrator, InDesign</p>
            </div>
          </div>

          {/* Solución Section */}
          <div className="space-y-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Solución</h2>
            <div className="space-y-4 font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-lg leading-relaxed max-w-3xl">
              <p>Se diseñó un sistema de packaging compacto y funcional, alineado con el ritmo del juego.</p>
              <p>La caja, alargada y fácil de sujetar con una sola mano, prioriza la portabilidad y el uso inmediato.</p>
              <p>Las instrucciones se resolvieron en un pliego A5 plegado, apoyado en diagramas e iconografía para reducir la fricción en la comprensión de las reglas.</p>
              <p>El interior se organizó en secciones claras para todos los componentes, facilitando su identificación y un guardado rápido e intuitivo tras la partida.</p>
            </div>
          </div>

          {/* Proceso Section */}
          <div className="space-y-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Proceso</h2>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="h-64 rounded-xl overflow-hidden bg-gray-200">
                <img src={imgZdfFotoPlanoGeneralCajasApiladas} alt="Cajas apiladas" className="w-full h-full object-cover" />
              </div>
              <div className="h-64 rounded-xl overflow-hidden bg-gray-200">
                <img src={imgZdfFotoMontajeMockup} alt="Mockup" className="w-full h-full object-cover" />
              </div>
              <div className="h-64 rounded-xl overflow-hidden bg-gray-200">
                <img src={imgZdfFotoJuegosApilados} alt="Juegos apilados" className="w-full h-full object-cover" />
              </div>
              <div className="h-64 rounded-xl overflow-hidden bg-gray-200">
                <img src={imgZdfFotoPlanoGeneralCajasFrontal} alt="Cajas frontal" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Resultado Section */}
          <div className="space-y-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-4xl">Resultado</h2>
            <div className="space-y-6">
              <div className="h-96 rounded-xl overflow-hidden bg-gray-200">
                <img src={imgZdfFotoPlanoGeneralJuegoDesplegado} alt="Juego desplegado" className="w-full h-full object-cover" />
              </div>
              <div className="h-96 rounded-xl overflow-hidden bg-gray-200">
                <img src={imgZdfFotoPresentacionCartas} alt="Presentación cartas" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Desktop */}
        <div className="bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative p-0 h-screen" data-name="footer_desktop" data-node-id="1577:172">
          <p className="absolute left-[49px] text-[32px] top-[480px]" data-node-id="1577:173">
            Redes
          </p>
          <p className="absolute left-[49px] text-[36px] top-[672px]" data-node-id="1577:174">
            Behance
          </p>
          <p className="absolute left-[49px] text-[36px] top-[546px]" data-node-id="1577:175">
            Instagram
          </p>
          <p className="absolute left-[49px] text-[36px] top-[609px]" data-node-id="1577:176">
            LinkedIn
          </p>
          <p className="absolute left-[calc(50%-45px)] text-[24px] top-[880px]" data-node-id="1577:177">
            © 2026
          </p>
          <p className="absolute left-[calc(50%-707px)] text-[48px] top-[183px]" data-node-id="1577:178">
            rudy chávez
          </p>
          <p className="absolute left-[calc(50%-707px)] text-[64px] top-[269px]" data-node-id="1577:179">
            hi@rudychavez.es
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#f7f3e8] relative w-full min-h-screen pb-24">
        {/* Navigation Menu */}
        <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} variant="full" />

        {/* Header and Content from Figma Mobile Design */}
        <div className="overflow-y-auto pb-32">
          {/* Cover with gradient background */}
          <div className="h-96 relative overflow-hidden bg-gradient-to-b from-blue-600 to-purple-700 flex items-center justify-center p-6">
            <img src={imgLogoPortada1} alt="Logo" className="h-64 object-contain" />
          </div>

          {/* Title */}
          <div className="px-6 py-6">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-3xl">Zumo de fetos</h1>
          </div>

          {/* Subtitle and metadata */}
          <div className="px-6 py-2 space-y-2">
            <p className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xs">Proyecto de diseño de packaging y sistema físico.</p>
            <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-sm leading-relaxed">
              Zumo de Fetos es un juego de mesa basado en la mentira, la deducción y la tensión entre decisiones ocultas.
            </p>
          </div>

          {/* Briefing Section */}
          <div className="px-6 py-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl mb-4">Briefing</h2>
            <p className="font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-sm leading-relaxed mb-4">
              El proyecto consistía en diseñar el packaging completo del juego a partir de una gráfica ya definida, asegurando una experiencia de uso clara en la lectura de reglas, el manejo de los componentes y el guardado tras cada partida.
            </p>
            <div className="space-y-1 text-xs font-['Mint_Grotesk',sans-serif] text-[#2f333e]">
              <p>Cliente: Míster Jägger</p>
              <p>Colaboración: Xuri Fenton (ilustración)</p>
              <p>Duración: 8 meses</p>
              <p>Software: Figma, Adobe Photoshop, Illustrator, InDesign</p>
            </div>
          </div>

          {/* Separator */}
          <div className="px-2 py-2 flex justify-center">
            <div className="h-px bg-[#5576e8] w-4/5"></div>
          </div>

          {/* Solución Section */}
          <div className="px-6 py-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl mb-4">Solución</h2>
            <div className="space-y-2 font-['Mint_Grotesk',sans-serif] text-[#2f333e] text-sm leading-relaxed">
              <p>Se diseñó un sistema de packaging compacto y funcional, alineado con el ritmo del juego.</p>
              <p>La caja, alargada y fácil de sujetar con una sola mano, prioriza la portabilidad y el uso inmediato.</p>
              <p>Las instrucciones se resolvieron en un pliego A5 plegado, apoyado en diagramas e iconografía para reducir la fricción en la comprensión de las reglas.</p>
              <p>El interior se organizó en secciones claras para todos los componentes, facilitando su identificación y un guardado rápido e intuitivo tras la partida.</p>
            </div>
          </div>

          {/* Proceso Section */}
          <div className="px-6 py-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl mb-4">Proceso</h2>
            <div className="space-y-3">
              <div className="h-48 rounded-lg overflow-hidden bg-gray-200">
                <img src={imgZdfFotoPlanoGeneralCajasApiladas} alt="Cajas" className="w-full h-full object-cover" />
              </div>
              <div className="h-48 rounded-lg overflow-hidden bg-gray-200">
                <img src={imgZdfFotoJuegosApilados} alt="Juegos" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Resultado Section */}
          <div className="px-6 py-6">
            <h2 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-xl mb-4">Resultado</h2>
            <div className="space-y-3">
              <div className="h-56 rounded-lg overflow-hidden bg-gray-200">
                <img src={imgZdfFotoPlanoGeneralJuegoDesplegado} alt="Resultado" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Mobile */}
        <FooterMobile className="fixed bottom-0 left-0 right-0 bg-[#d42b57] h-screen text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative" />
      </div>
    </>
  );
}
