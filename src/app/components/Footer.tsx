export function FooterDesktop() {
  return (
    <footer className="w-full h-full bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif]">
      <div className="h-full w-full px-12 py-10 flex flex-col">
        <div className="flex flex-col gap-4">
          <p className="text-5xl leading-none">rudy chávez</p>
          <p className="text-6xl leading-none">hi@rudychavez.es</p>
        </div>

        <div className="flex-1" />

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-2xl">Redes</p>
            <a className="text-3xl underline" href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="text-3xl underline" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="text-3xl underline" href="https://www.behance.net" target="_blank" rel="noreferrer">
              Behance
            </a>
          </div>

          <p className="text-xl">© 2026</p>
        </div>
      </div>
    </footer>
  );
}

export function FooterMobile() {
  return (
    <footer className="w-full h-full bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif]">
      <div className="h-full w-full px-6 py-8 flex flex-col">
        <div className="flex flex-col gap-3">
          <p className="text-3xl leading-none">rudy chávez</p>
          <p className="text-2xl leading-tight">hi@rudychavez.es</p>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col gap-3">
          <p className="text-xl">Redes</p>
          <a className="text-2xl underline" href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a className="text-2xl underline" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="text-2xl underline" href="https://www.behance.net" target="_blank" rel="noreferrer">
            Behance
          </a>
        </div>

        <p className="mt-8 text-lg text-center">© 2026</p>
      </div>
    </footer>
  );
}
