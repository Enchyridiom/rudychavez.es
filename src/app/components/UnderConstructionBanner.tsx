'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STORAGE_KEY = 'uc-banner-dismissed';

export function UnderConstructionBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || !bannerRef.current) return;
    gsap.fromTo(
      bannerRef.current,
      { y: '-100%' },
      { y: '0%', duration: 0.5, ease: 'power3.out' }
    );
  }, [visible]);

  const dismiss = () => {
    if (!bannerRef.current) return;
    gsap.to(bannerRef.current, {
      y: '-100%',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        sessionStorage.setItem(STORAGE_KEY, '1');
        setVisible(false);
      },
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center h-[2.5rem] px-12 bg-[#2f333e] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] text-xs md:text-sm whitespace-nowrap overflow-hidden"
      style={{ fontFeatureSettings: '"ss03" 1' }}
    >
      <span className="md:hidden">Sitio en construcción</span>
      <span className="hidden md:inline">Sitio en construcción — algunas secciones están en desarrollo</span>
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f7f3e8] hover:text-[#76e384] transition-colors cursor-pointer"
        aria-label="Cerrar aviso"
      >
        ✕
      </button>
    </div>
  );
}
