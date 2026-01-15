import { ReactNode } from 'react';

interface NavigationMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export function NavigationMenu({ menuOpen, setMenuOpen }: NavigationMenuProps) {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Proyectos', href: '/projects' },
    { label: 'Sobre mi', href: '/about' },
    { label: 'Contacto', href: '/contact' },
  ];

  return (
    <>
      {/* Menu Button */}
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-30 flex gap-4 items-center">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-[#d42b57] text-[#f7f3e8] px-8 py-4 rounded-full font-['Mint_Grotesk',sans-serif] text-lg font-medium shadow-lg hover:opacity-90 transition-opacity" 
        >
          Menu
        </button>
      </div>

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
