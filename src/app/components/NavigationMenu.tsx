'use client';

import type { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from 'react';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type Variant = 'up-down' | 'back-forward' | 'full' | 'mobile';

type Props = {
  variant?: Variant;
  menuOpen?: boolean;
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
  onScrollToTop?: () => void;
  onScrollToBottom?: () => void;
  onBack?: () => void;
  onForward?: () => void;
  tone?: 'default' | 'footer';
};

function stop(e: SyntheticEvent) {
  e.stopPropagation();
}

function ArrowButton({
  label,
  onClick,
  children,
  tone,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  tone?: 'default' | 'footer';
  disabled?: boolean;
}) {
  const className =
    tone === 'footer'
      ? 'w-12 h-12 rounded-full bg-[#f7f3e8] text-[#d42b57] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#2f333e] hover:text-[#f7f3e8] active:bg-[#2f333e] active:text-[#f7f3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f333e]'
      : 'w-12 h-12 rounded-full bg-[#d42b57] text-[#f7f3e8] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#5576e8] active:bg-[#5576e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5576e8]';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
    >
      <span className="font-['Mint_Grotesk',sans-serif] text-xl leading-none">{children}</span>
    </button>
  );
}

function NavBar({ children }: { children: ReactNode }) {
  return (
    <div
      className="gsap-ignore fixed inset-x-0 bottom-6 z-50 flex justify-center"
      onPointerDown={stop}
      onTouchStart={stop}
    >
      <div className="flex gap-3 items-center">{children}</div>
    </div>
  );
}

export function NavigationMenu({
  variant = 'mobile',
  menuOpen,
  setMenuOpen,
  onScrollToTop,
  onScrollToBottom,
  onBack,
  onForward,
  tone,
}: Props) {
  const motionRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  // Etapa 3 refs (manual morph)
  const pillRef = useRef<HTMLButtonElement | null>(null);
  const overlayBoxRef = useRef<HTMLDivElement | null>(null);
  const pillLabelRef = useRef<HTMLSpanElement | null>(null);
  const overlayLinksRef = useRef<HTMLDivElement | null>(null);

  const [isMorphing, setIsMorphing] = useState(false);
  const [showOverlayContent, setShowOverlayContent] = useState(false);

  useLayoutEffect(() => {
    // Lock body scroll when the menu is open
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!setMenuOpen) return;

    const pillEl = pillRef.current;
    const boxEl = overlayBoxRef.current;

    // Fallback: if refs are missing, just toggle state.
    if (!pillEl || !boxEl) {
      setIsMorphing(false);
      setShowOverlayContent(false);
      setMenuOpen((v) => !v);
      return;
    }

    const willOpen = !menuOpen;

    // Backdrop fade
    const backdrop = backdropRef.current;
    if (backdrop) {
      gsap.killTweensOf(backdrop);
      gsap.to(backdrop, {
        opacity: willOpen ? 1 : 0,
        duration: willOpen ? 0.22 : 0.18,
        ease: 'power2.out',
        pointerEvents: willOpen ? 'auto' : 'none',
      });
    }

    // Measure the pill rect as the animation start.
    const pillRect = pillEl.getBoundingClientRect();

    // Target rect: centered box using 80dvw / 70dvh as proportions.
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetW = Math.round(vw * 0.8);
    const targetH = Math.round(vh * 0.7);
    const targetLeft = Math.round((vw - targetW) / 2);
    const targetTop = Math.round((vh - targetH) / 2);

    setIsMorphing(true);

    // Ensure overlay container is visible before animating open.
    if (willOpen) {
      setMenuOpen(true);
      setShowOverlayContent(false);

      // Reset any in-flight tweens
      gsap.killTweensOf([boxEl, pillLabelRef.current, overlayLinksRef.current]);

      // Hide the pill to avoid seeing a duplicate behind the overlay during/after the morph
      gsap.killTweensOf(pillEl);
      gsap.to(pillEl, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
        onStart: () => {
          pillEl.style.pointerEvents = 'none';
        },
      });

      // Start box exactly over the pill.
      gsap.set(boxEl, {
        display: 'flex',
        left: pillRect.left,
        top: pillRect.top,
        width: pillRect.width,
        height: pillRect.height,
        borderRadius: 9999,
        opacity: 1,
      });

      // Animate pill label out (down + fade)
      if (pillLabelRef.current) {
        gsap.fromTo(
          pillLabelRef.current,
          { y: 0, opacity: 1 },
          { y: 10, opacity: 0, duration: 0.2, ease: 'power2.out' }
        );
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          setIsMorphing(false);
        },
      });

      // Morph box to centered target.
      tl.to(
        boxEl,
        {
          left: targetLeft,
          top: targetTop,
          width: targetW,
          height: targetH,
          duration: 0.55,
        },
        0
      );

      // Radius should relax earlier so it doesn't feel "pill" for too long
      tl.to(
        boxEl,
        {
          borderRadius: 48,
          duration: 0.22,
          ease: 'power2.out',
        },
        0.08
      );
      tl.to(
        boxEl,
        {
          borderRadius: 24,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.20
      );

      // Reveal overlay links near the end of the morph.
      tl.call(
        () => {
          setShowOverlayContent(true);
        },
        [],
        0.35
      );

      // Animate overlay links in (up + fade, stagger)
      tl.fromTo(
        overlayLinksRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' },
        0.38
      );

      return;
    }

    // Close: animate box back to the pill, then hide.
    setShowOverlayContent(false);
    pillEl.style.pointerEvents = 'none';

    gsap.killTweensOf([boxEl, pillLabelRef.current, overlayLinksRef.current]);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setIsMorphing(false);
        setMenuOpen(false);
        // Hide box completely
        gsap.set(boxEl, { display: 'none' });
        // Restore pill label
        if (pillLabelRef.current) gsap.set(pillLabelRef.current, { clearProps: 'transform,opacity' });

        // Restore the pill itself
        gsap.killTweensOf(pillEl);
        gsap.to(pillEl, {
          opacity: 1,
          duration: 0.12,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            pillEl.style.pointerEvents = '';
            pillEl.style.opacity = '';
          },
        });
      },
    });

    tl.to(
      boxEl,
      {
        left: pillRect.left,
        top: pillRect.top,
        width: pillRect.width,
        height: pillRect.height,
        duration: 0.55,
      },
      0
    );

    // Keep corners slightly rounded while shrinking, then snap to pill at the end
    tl.to(
      boxEl,
      {
        borderRadius: 48,
        duration: 0.28,
        ease: 'power2.in',
      },
      0
    );
    tl.to(
      boxEl,
      {
        borderRadius: 9999,
        duration: 0.18,
        ease: 'power2.in',
      },
      0.37
    );

    // Fade pill label back in a bit before close ends
    if (pillLabelRef.current) {
      tl.to(
        pillLabelRef.current,
        { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
        0.35
      );
    }
  };

  const effectiveVariant: Exclude<Variant, 'mobile'> = variant === 'mobile' ? 'up-down' : variant;

  const handleUp =
    onScrollToTop ??
    (() => {
      document.getElementById('header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

  const handleDown =
    onScrollToBottom ??
    (() => {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

  return (
    <>
      <div
        ref={backdropRef}
        className="gsap-ignore fixed inset-0 z-40 bg-[#f7f3e8]/40 backdrop-blur-sm"
        style={{ opacity: menuOpen || isMorphing ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        onClick={toggleMenu}
      />

      {effectiveVariant === 'up-down' && (
        <NavBar>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Ir arriba" onClick={handleUp} tone={tone} disabled={menuOpen || isMorphing}>
                ↑
              </ArrowButton>
            )}
          </div>
          <div ref={motionRef} className="gsap-ignore">
            <button
              ref={pillRef}
              type="button"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={toggleMenu}
              className={
                tone === 'footer'
                  ? 'h-12 px-6 rounded-full bg-[#f7f3e8] text-[#d42b57] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#2f333e] hover:text-[#f7f3e8] active:bg-[#2f333e] active:text-[#f7f3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f333e]'
                  : 'h-12 px-6 rounded-full bg-[#d42b57] text-[#f7f3e8] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#5576e8] active:bg-[#5576e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5576e8]'
              }
            >
              <span ref={pillLabelRef} className="font-['Mint_Grotesk',sans-serif] text-base">Menu</span>
            </button>
          </div>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Ir abajo" onClick={handleDown} tone={tone} disabled={menuOpen || isMorphing}>
                ↓
              </ArrowButton>
            )}
          </div>
        </NavBar>
      )}

      {effectiveVariant === 'back-forward' && (
        <NavBar>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Atrás" onClick={onBack} tone={tone} disabled={menuOpen || isMorphing}>
                ←
              </ArrowButton>
            )}
          </div>
          <div ref={motionRef} className="gsap-ignore">
            <div
              // keep content as-is for now (Etapa 3: up-down only)
              className=""
            />
          </div>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Adelante" onClick={onForward} tone={tone} disabled={menuOpen || isMorphing}>
                →
              </ArrowButton>
            )}
          </div>
        </NavBar>
      )}

      {effectiveVariant === 'full' && (
        <NavBar>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Atrás" onClick={onBack} tone={tone} disabled={menuOpen || isMorphing}>
                ←
              </ArrowButton>
            )}
          </div>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Ir arriba" onClick={handleUp} tone={tone} disabled={menuOpen || isMorphing}>
                ↑
              </ArrowButton>
            )}
          </div>
          <div ref={motionRef} className="gsap-ignore">
            <div
              // keep content as-is for now (Etapa 3: up-down only)
              className=""
            />
          </div>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Ir abajo" onClick={handleDown} tone={tone} disabled={menuOpen || isMorphing}>
                ↓
              </ArrowButton>
            )}
          </div>
          <div className="w-12 h-12">
            {!menuOpen && !isMorphing && (
              <ArrowButton label="Adelante" onClick={onForward} tone={tone} disabled={menuOpen || isMorphing}>
                →
              </ArrowButton>
            )}
          </div>
        </NavBar>
      )}

      <div
        ref={overlayBoxRef}
        className="gsap-ignore fixed z-50 bg-[#d42b57] text-[#f7f3e8] items-center justify-center"
        style={{ display: menuOpen || isMorphing ? 'flex' : 'none' }}
        onPointerDown={stop}
        onTouchStart={stop}
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-8">
          {showOverlayContent && (
            <div ref={overlayLinksRef} className="w-full flex flex-col items-center gap-8">
              <nav className="w-full flex flex-col items-center gap-8">
                <Link
                  href="/"
                  className="font-['Mint_Grotesk',sans-serif] text-4xl no-underline hover:text-[#2f333e] active:text-[#2f333e]"
                  onClick={() => setMenuOpen?.(false)}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="font-['Mint_Grotesk',sans-serif] text-4xl no-underline hover:text-[#2f333e] active:text-[#2f333e]"
                  onClick={() => setMenuOpen?.(false)}
                >
                  Proyectos
                </Link>
                <Link
                  href="/about"
                  className="font-['Mint_Grotesk',sans-serif] text-4xl no-underline hover:text-[#2f333e] active:text-[#2f333e]"
                  onClick={() => setMenuOpen?.(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="font-['Mint_Grotesk',sans-serif] text-4xl no-underline hover:text-[#2f333e] active:text-[#2f333e]"
                  onClick={() => setMenuOpen?.(false)}
                >
                  Contacto
                </Link>
              </nav>

              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={toggleMenu}
                className="mt-24 h-12 px-5 rounded-full bg-[#f7f3e8] text-[#d42b57] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#2f333e] hover:text-[#f7f3e8] active:bg-[#2f333e] active:text-[#f7f3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f333e]"
              >
                <span className="font-['Mint_Grotesk',sans-serif] text-base">Cerrar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
