'use client';

import { useRouter } from 'next/navigation';

interface NavigationMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  variant?: 'full' | 'back-forward' | 'up-down';
  onScrollToTop?: () => void;
  onScrollToBottom?: () => void;
}

function ArrowUp() {
  return <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-base leading-normal">↑</p>;
}

function ArrowDown() {
  return <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-base leading-normal">↓</p>;
}

function ArrowBack() {
  return <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-base leading-normal">←</p>;
}

function ArrowForward() {
  return <p className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-base leading-normal">→</p>;
}

function NavUpDown({ menuOpen, setMenuOpen, onScrollToTop, onScrollToBottom }: any) {
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-30 flex gap-3 items-center">
      {/* Up Button */}
      <button
        onClick={onScrollToTop}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowUp />
      </button>

      {/* Menu Button */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-[#d42b57] text-[#f7f3e8] px-8 py-4 rounded-full font-['Mint_Grotesk',sans-serif] text-lg font-medium shadow-lg hover:opacity-90 transition-opacity" 
      >
        Menu
      </button>

      {/* Down Button */}
      <button
        onClick={onScrollToBottom}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowDown />
      </button>
    </div>
  );
}

function NavBackForward({ menuOpen, setMenuOpen }: any) {
  const router = useRouter();

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-30 flex gap-3 items-center">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowBack />
      </button>

      {/* Menu Button */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-[#d42b57] text-[#f7f3e8] px-8 py-4 rounded-full font-['Mint_Grotesk',sans-serif] text-lg font-medium shadow-lg hover:opacity-90 transition-opacity" 
      >
        Menu
      </button>

      {/* Forward Button */}
      <button
        onClick={() => router.forward()}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowForward />
      </button>
    </div>
  );
}

function NavFull({ menuOpen, setMenuOpen, onScrollToTop, onScrollToBottom }: any) {
  const router = useRouter();

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-30 flex gap-3 items-center">
      {/* Up Button */}
      <button
        onClick={onScrollToTop}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowUp />
      </button>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowBack />
      </button>

      {/* Menu Button */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-[#d42b57] text-[#f7f3e8] px-8 py-4 rounded-full font-['Mint_Grotesk',sans-serif] text-lg font-medium shadow-lg hover:opacity-90 transition-opacity" 
      >
        Menu
      </button>

      {/* Forward Button */}
      <button
        onClick={() => router.forward()}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowForward />
      </button>

      {/* Down Button */}
      <button
        onClick={onScrollToBottom}
        className="bg-[#d42b57] text-[#f7f3e8] w-[35px] h-[35px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        <ArrowDown />
      </button>
    </div>
  );
}

export function NavigationMenu({ 
  menuOpen, 
  setMenuOpen, 
  variant = 'back-forward',
  onScrollToTop,
  onScrollToBottom,
}: NavigationMenuProps) {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Proyectos', href: '/projects' },
    { label: 'Sobre mi', href: '/about' },
    { label: 'Contacto', href: '/contact' },
  ];

  return (
    <>
      {/* Navigation Bar - varies by variant */}
      {variant === 'full' && (
        <NavFull 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          onScrollToTop={onScrollToTop}
          onScrollToBottom={onScrollToBottom}
        />
      )}

      {variant === 'back-forward' && (
        <NavBackForward 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
        />
      )}

      {variant === 'up-down' && (
        <NavUpDown 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          onScrollToTop={onScrollToTop}
          onScrollToBottom={onScrollToBottom}
        />
      )}

      {/* Mobile Menu Modal */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-[#d42b57] z-50 rounded-2xl md:hidden flex flex-col items-center justify-between px-8 py-20 bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-48px)] animate-in fade-in zoom-in duration-300"
        >
          <div className="flex flex-col gap-6 items-center w-full">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-2xl font-medium text-center hover:opacity-80 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="font-['Mint_Grotesk',sans-serif] text-[#f7f3e8] text-2xl font-medium hover:opacity-80 transition-opacity"
          >
            Cerrar
          </button>
        </div>
      )}
    </>
  );
}
