'use client';

import { useState } from 'react';
import { FooterDesktop, FooterMobile } from '../../components/Footer';
import { NavigationMenu } from '../../components/NavigationMenu';

export default function FilminPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} variant="full" />

      {/* Desktop */}
      <div className="hidden md:block w-full">
        <section className="bg-[#f7f3e8] min-h-screen flex items-center justify-center px-12">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-8xl leading-tight text-center">
            Próximamente
          </h1>
        </section>
        <section className="min-h-screen">
          <FooterDesktop />
        </section>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full">
        <section className="bg-[#f7f3e8] min-h-screen flex items-center justify-center px-6">
          <h1 className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-5xl leading-tight text-center">
            Próximamente
          </h1>
        </section>
        <section className="min-h-screen">
          <FooterMobile />
        </section>
      </div>
    </>
  );
}
