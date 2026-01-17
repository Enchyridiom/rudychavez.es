'use client';

import type { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from 'react';
import Link from 'next/link';

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
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  tone?: 'default' | 'footer';
}) {
  const className =
    tone === 'footer'
      ? 'w-12 h-12 rounded-full bg-[#f7f3e8] text-[#d42b57] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#2f333e] hover:text-[#f7f3e8] active:bg-[#2f333e] active:text-[#f7f3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f333e]'
      : 'w-12 h-12 rounded-full bg-[#d42b57] text-[#f7f3e8] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#5576e8] active:bg-[#5576e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5576e8]';

  return (
    <button type="button" aria-label={label} onClick={onClick} className={className}>
      <span className="font-['Mint_Grotesk',sans-serif] text-xl leading-none">{children}</span>
    </button>
  );
}

function MenuButton({
  menuOpen,
  setMenuOpen,
  tone,
}: {
  menuOpen?: boolean;
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
  tone?: 'default' | 'footer';
}) {
  const className =
    tone === 'footer'
      ? 'h-12 px-5 rounded-full bg-[#f7f3e8] text-[#d42b57] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#2f333e] hover:text-[#f7f3e8] active:bg-[#2f333e] active:text-[#f7f3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f333e]'
      : 'h-12 px-5 rounded-full bg-[#d42b57] text-[#f7f3e8] flex items-center justify-center select-none transition-colors duration-150 hover:bg-[#5576e8] active:bg-[#5576e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5576e8]';

  return (
    <button
      type="button"
      aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      onClick={() => setMenuOpen?.((v) => !v)}
      className={className}
    >
      <span className="font-['Mint_Grotesk',sans-serif] text-base">Menu</span>
    </button>
  );
}

function NavBar({ children }: { children: ReactNode }) {
  return (
    <div
      className="gsap-ignore fixed left-1/2 -translate-x-1/2 bottom-6 z-30 flex gap-3 items-center"
      onPointerDown={stop}
      onTouchStart={stop}
    >
      {children}
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
  const effectiveVariant: Exclude<Variant, 'mobile'> = variant === 'mobile' ? 'up-down' : variant;

  return (
    <>
      {menuOpen ? (
        <div
          className="gsap-ignore fixed inset-0 bg-[#d42b57] z-50"
          onPointerDown={stop}
          onTouchStart={stop}
        >
          <div className="h-full w-full flex items-center justify-center px-8">
            <div className="w-full max-w-sm flex flex-col items-center gap-8">
              <nav className="w-full">
                <ul className="w-full flex flex-col items-center gap-6 text-[#f7f3e8]">
                  <li>
                    <Link
                      href="/"
                      className="font-['Mint_Grotesk',sans-serif] text-4xl underline underline-offset-4 hover:text-[#76e384]"
                      onClick={() => setMenuOpen?.(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="font-['Mint_Grotesk',sans-serif] text-4xl underline underline-offset-4 hover:text-[#76e384]"
                      onClick={() => setMenuOpen?.(false)}
                    >
                      Proyectos
                    </Link>
                  </li>
                </ul>

                <ul className="w-full flex flex-col items-center gap-4 mt-6 text-[#f7f3e8]">
                  <li>
                    <Link
                      href="/projects/filmin"
                      className="font-['Mint_Grotesk',sans-serif] text-2xl underline underline-offset-4 hover:text-[#76e384]"
                      onClick={() => setMenuOpen?.(false)}
                    >
                      Filmin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects/zumo-de-fetos"
                      className="font-['Mint_Grotesk',sans-serif] text-2xl underline underline-offset-4 hover:text-[#76e384]"
                      onClick={() => setMenuOpen?.(false)}
                    >
                      Zumo de fetos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects/rainbox"
                      className="font-['Mint_Grotesk',sans-serif] text-2xl underline underline-offset-4 hover:text-[#76e384]"
                      onClick={() => setMenuOpen?.(false)}
                    >
                      Rainbox
                    </Link>
                  </li>
                </ul>

                <ul className="w-full flex flex-col items-center gap-6 mt-8 text-[#f7f3e8]">
                  <li>
                    <Link
                      href="/about"
                      className="font-['Mint_Grotesk',sans-serif] text-4xl underline underline-offset-4 hover:text-[#76e384]"
                      onClick={() => setMenuOpen?.(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="font-['Mint_Grotesk',sans-serif] text-4xl underline underline-offset-4 hover:text-[#76e384]"
                      onClick={() => setMenuOpen?.(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen?.(false)}
                className="h-12 px-5 rounded-full bg-[#f7f3e8] text-[#5576e8] flex items-center justify-center select-none"
              >
                <span className="font-['Mint_Grotesk',sans-serif] text-base">Cerrar</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {effectiveVariant === 'up-down' && (
        <NavBar>
          <ArrowButton label="Ir arriba" onClick={onScrollToTop} tone={tone}>
            ↑
          </ArrowButton>
          <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} tone={tone} />
          <ArrowButton label="Ir abajo" onClick={onScrollToBottom} tone={tone}>
            ↓
          </ArrowButton>
        </NavBar>
      )}

      {effectiveVariant === 'back-forward' && (
        <NavBar>
          <ArrowButton label="Atrás" onClick={onBack} tone={tone}>
            ←
          </ArrowButton>
          <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} tone={tone} />
          <ArrowButton label="Adelante" onClick={onForward} tone={tone}>
            →
          </ArrowButton>
        </NavBar>
      )}

      {effectiveVariant === 'full' && (
        <NavBar>
          <ArrowButton label="Atrás" onClick={onBack} tone={tone}>
            ←
          </ArrowButton>
          <ArrowButton label="Ir arriba" onClick={onScrollToTop} tone={tone}>
            ↑
          </ArrowButton>
          <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} tone={tone} />
          <ArrowButton label="Ir abajo" onClick={onScrollToBottom} tone={tone}>
            ↓
          </ArrowButton>
          <ArrowButton label="Adelante" onClick={onForward} tone={tone}>
            →
          </ArrowButton>
        </NavBar>
      )}
    </>
  );
}
