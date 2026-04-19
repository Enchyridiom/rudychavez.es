'use client';

import { useState } from 'react';
import { FooterDesktop, FooterMobile } from '../components/Footer';
import { NavigationMenu } from '../components/NavigationMenu';
import { useSubpageNav } from '../components/useSubpageNav';

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollToTop, scrollToBottom } = useSubpageNav();

  return (
    <>
      <NavigationMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        variant="up-down"
        onScrollToTop={scrollToTop}
        onScrollToBottom={scrollToBottom}
      />

      {/* Desktop View */}
      <div className="hidden md:block w-full">
        <section className="bg-[#5576e8] h-[100dvh] flex flex-col items-center justify-center">
          <div className="text-center space-y-12">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8]! text-8xl">Contacto</h1>
            <div className="space-y-6">
              <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-5xl">
                <a href="mailto:hi@rudychavez.es">hi@rudychavez.es</a>
              </p>
              <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-3xl">
                Si te cuadra, escríbeme
              </p>
            </div>
          </div>
        </section>

        <section className="h-[100dvh]">
          <FooterDesktop />
        </section>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full">
        <section className="bg-[#5576e8] h-[100dvh] flex flex-col items-center justify-center py-24 px-6">
          <div className="space-y-8 text-center">
            <h1 className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8]! text-5xl">Contacto</h1>
            <div className="space-y-4">
              <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-3xl">
                <a href="mailto:hi@rudychavez.es">hi@rudychavez.es</a>
              </p>
              <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-xl">
                Si te cuadra, escríbeme
              </p>
            </div>
          </div>
        </section>

        <section className="h-[100dvh]">
          <FooterMobile />
        </section>
      </div>
    </>
  );
}
