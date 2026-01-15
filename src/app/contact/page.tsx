'use client';

import { useState } from 'react';
import { NavigationMenu } from '../components/NavigationMenu';

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-[#5576e8] relative w-full h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-12">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-8xl">Contacto</h1>
          <div className="space-y-6">
            <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-5xl">
              hi@rudychavez.es
            </p>
            <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-3xl">
              Si te cuadra, escríbeme
            </p>
          </div>
        </div>

        {/* Footer Desktop */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative p-0 h-screen" data-name="footer_desktop" data-node-id="1577:172">
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
      <div className="md:hidden bg-[#5576e8] relative w-full min-h-screen flex flex-col items-center justify-center py-16 px-6">
        {/* Navigation Menu */}
        <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Content */}
        <div className="space-y-8 text-center">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-5xl">Contacto</h1>
          <div className="space-y-4">
            <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-3xl">
              hi@rudychavez.es
            </p>
            <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-xl">
              Si te cuadra, escríbeme
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
