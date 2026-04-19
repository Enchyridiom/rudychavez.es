'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

const STORAGE_KEY = 'uc-banner-dismissed';
const TEXT_SHORT = 'Sitio en construcción';
const TEXT_FULL = 'Sitio en construcción — algunas secciones están en desarrollo';

export function UnderConstructionBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const shortRef = useRef<HTMLSpanElement | null>(null);
  const fullRef = useRef<HTMLSpanElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const banner = bannerRef.current;
    const shortEl = shortRef.current;
    const fullEl = fullRef.current;
    const closeEl = closeRef.current;
    if (!banner || !shortEl || !fullEl || !closeEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(banner, { y: '0%' });
      shortEl.textContent = TEXT_SHORT;
      fullEl.textContent = TEXT_FULL;
      gsap.set(closeEl, { opacity: 1 });
      return;
    }

    // Clear text before scramble so we don't briefly show final text
    shortEl.textContent = '';
    fullEl.textContent = '';
    gsap.set(closeEl, { opacity: 0 });

    const tl = gsap.timeline();

    tl.fromTo(
      banner,
      { y: '-100%' },
      { y: '0%', duration: 0.6, ease: 'power4.out' },
      0
    )
      .to(
        shortEl,
        {
          duration: 0.8,
          scrambleText: {
            text: TEXT_SHORT,
            chars: 'lowerCase',
            speed: 0.7,
            revealDelay: 0.1,
          },
          ease: 'power4.out',
        },
        '-=0.35'
      )
      .to(
        fullEl,
        {
          duration: 0.8,
          scrambleText: {
            text: TEXT_FULL,
            chars: 'lowerCase',
            speed: 0.7,
            revealDelay: 0.1,
          },
          ease: 'power4.out',
        },
        '<'
      )
      .to(
        closeEl,
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, [visible]);

  const dismiss = () => {
    if (!bannerRef.current) return;
    gsap.to(bannerRef.current, {
      y: '-100%',
      duration: 0.35,
      ease: 'power3.in',
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
      style={{ fontFeatureSettings: '"ss03" 1', transform: 'translateY(-100%)' }}
    >
      <span ref={shortRef} className="md:hidden">{TEXT_SHORT}</span>
      <span ref={fullRef} className="hidden md:inline">{TEXT_FULL}</span>
      <button
        ref={closeRef}
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f7f3e8] hover:text-[#76e384] transition-colors cursor-pointer"
        aria-label="Cerrar aviso"
      >
        ✕
      </button>
    </div>
  );
}
