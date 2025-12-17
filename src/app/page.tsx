'use client';

import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Proyectos', href: '#' },
    { label: 'Sobre mi', href: '#' },
    { label: 'Contacto', href: '#' },
  ];

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-white relative w-full" data-name="rudychavez.es /home – Desktop" data-node-id="1503:16">
        {/* Header Section */}
        <div className="flex flex-col h-screen items-center justify-center px-8 py-0 bg-white" data-name="header" data-node-id="1503:17">
          <div className="flex items-center justify-center" data-name="h1" data-node-id="1503:18">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-8xl text-center leading-tight" data-node-id="1503:19">
              <div>rudy</div>
              <div>chávez</div>
            </h1>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col gap-4 h-screen items-center justify-center px-2.5 py-0 bg-white" data-name="main" data-node-id="1503:20">
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1503:21" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1503:22" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1503:23" />
        </div>

        {/* Footer Section */}
        <div className="bg-[#d42b57] h-screen text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden flex items-center justify-start p-0 relative" data-name="footer" data-node-id="1503:24">
          <div className="w-full h-full relative">
            {/* First Column - Sitemap */}
            <div className="absolute left-12 top-1/2 transform -translate-y-1/2">
              <p className="text-4xl md:text-5xl font-bold mb-4" data-node-id="1503:25">
                Sitemap
              </p>
              <p className="text-2xl font-light mb-2" data-node-id="1503:28">
                Proyectos
              </p>
              <p className="text-2xl font-light" data-node-id="1503:31">
                About
              </p>
            </div>

            {/* Second Column - Redes */}
            <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2">
              <p className="text-4xl md:text-5xl font-bold mb-4" data-node-id="1503:26">
                Redes
              </p>
              <p className="text-2xl font-light mb-2" data-node-id="1503:29">
                Behance
              </p>
              <p className="text-2xl font-light" data-node-id="1503:32">
                Instagram
              </p>
            </div>

            {/* Third Column - Contacto */}
            <div className="absolute left-2/3 top-1/2 transform -translate-y-1/2">
              <p className="text-4xl md:text-5xl font-bold mb-4" data-node-id="1503:27">
                Contacto
              </p>
              <p className="text-2xl font-light" data-node-id="1503:30">
                hi@rudychavez.es
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#f7f3e8] relative w-full min-h-screen pb-24" data-name="rudychavez.es /home – Mobile" data-node-id="1446:1720">
        {/* Mobile Menu Modal */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-[#d42b57] z-50 rounded-2xl md:hidden flex flex-col items-center justify-between px-8 py-20 bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-48px)] animate-in fade-in zoom-in duration-300"
            data-name="rudychavez.es /nav – Mobile" 
            data-node-id="1446:1787"
          >
            {/* Menu Items */}
            <div className="flex flex-col gap-6 items-center w-full">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-2xl font-medium text-center hover:opacity-80 transition-opacity"
                  data-node-id={item.label === 'Home' ? '1446:1788' : item.label === 'Proyectos' ? '1502:3' : item.label === 'Sobre mi' ? '1446:2027' : '1446:2029'}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-2xl font-medium hover:opacity-80 transition-opacity"
              data-node-id="1446:2031"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Menu Button - Sticky at Bottom */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed left-1/2 transform -translate-x-1/2 bottom-6 bg-[#d42b57] text-[#f7f3e8] px-10 py-4 rounded-full font-['Mint_Grotesk',sans-serif] text-base font-medium z-30 shadow-lg hover:opacity-90 transition-opacity" 
          data-name="menu_bar" 
          data-node-id="1446:1755"
        >
          {menuOpen ? 'Cerrar' : 'Menu'}
        </button>

        {/* Header Section */}
        <div className="flex flex-col h-screen items-center justify-center px-8 py-0 bg-[#f7f3e8]" data-name="header" data-node-id="1446:1752">
          <div className="flex items-center justify-center" data-name="h1" data-node-id="1446:1753">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-6xl text-center leading-tight" data-node-id="1446:1754">
              <div>rudy</div>
              <div>chávez</div>
            </h1>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col gap-4 h-screen items-center justify-center px-2.5 py-0 bg-[#f7f3e8]" data-name="main" data-node-id="1446:2007">
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1446:2033" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1446:2034" />
          <div className="bg-[#5576e8] h-64 rounded-2xl w-96" data-name="container" data-node-id="1446:2035" />
        </div>

        {/* Footer Section */}
        <div className="bg-[#d42b57] h-screen text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative" data-name="footer" data-node-id="1446:2010">
          <div className="relative w-full h-full px-6 py-16">
            {/* Sitemap Column */}
            <div className="mb-12">
              <p className="text-2xl font-bold mb-3" data-node-id="1502:4">
                Sitemap
              </p>
              <p className="text-base font-light mb-2" data-node-id="1502:5">
                Proyectos
              </p>
              <p className="text-base font-light" data-node-id="1502:6">
                About
              </p>
            </div>

            {/* Redes Column */}
            <div className="mb-12">
              <p className="text-2xl font-bold mb-3" data-node-id="1502:10">
                Redes
              </p>
              <p className="text-base font-light mb-2" data-node-id="1502:11">
                Behance
              </p>
              <p className="text-base font-light" data-node-id="1502:12">
                Instagram
              </p>
            </div>

            {/* Contacto Column */}
            <div>
              <p className="text-2xl font-bold mb-3" data-node-id="1502:13">
                Contacto
              </p>
              <p className="text-base font-light" data-node-id="1502:14">
                hi@rudychavez.es
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
