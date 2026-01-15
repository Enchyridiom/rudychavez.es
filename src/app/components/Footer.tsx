export function FooterDesktop() {
  return (
    <div className="bg-[#d42b57] text-[#f7f3e8] font-['Mint_Grotesk',sans-serif] overflow-hidden relative p-0 h-screen" data-name="footer_desktop" data-node-id="1577:172">
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
  );
}

export function FooterMobile({ className }: { className?: string }) {
  return (
    <div className={className} data-name="footer" data-node-id="1528:275">
      <p className="absolute left-[calc(50%-44.5px)] text-[24px] top-[698px] whitespace-pre" data-node-id="1525:1165">
        © 2026
      </p>
      <p className="absolute left-[calc(50%-172.5px)] text-[40px] top-[244px] whitespace-pre" data-node-id="1525:191">
        hi@rudychavez.es
      </p>
      <p className="absolute left-[calc(50%-172.5px)] text-[20px] top-[397px] whitespace-pre" data-node-id="1525:1170">
        Redes
      </p>
      <p className="absolute left-[calc(50%-172.5px)] text-[24px] top-[445px] w-[162px] whitespace-pre-wrap" data-node-id="1525:1172">
        Instagram
      </p>
      <p className="absolute left-[calc(50%-172.5px)] text-[24px] top-[487px] w-[162px] whitespace-pre-wrap" data-node-id="1525:1173">
        LinkedIn
      </p>
      <p className="absolute left-[calc(50%-172.5px)] text-[24px] top-[529px] w-[162px] whitespace-pre-wrap" data-node-id="1525:1174">
        Behance
      </p>
      <p className="absolute left-[calc(50%-172.5px)] text-[36px] top-[175px] whitespace-pre" data-node-id="1525:1169">
        rudy chávez
      </p>
    </div>
  );
}
