'use client';

import { useEffect, useRef } from 'react';

export default function Header() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    if (!titleEl || !subtitleEl) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      titleEl.style.opacity = '1';
      subtitleEl.style.opacity = '1';
      titleEl.style.filter = 'none';
      subtitleEl.style.filter = 'none';
      return;
    }

    let split: any = null;
    let tl: any = null;

    (async () => {
      const gsapMod: any = await import('gsap');
      const gsap = gsapMod.gsap ?? gsapMod.default ?? gsapMod;

      let SplitText: any = null;
      try {
        const st: any = await import('gsap/SplitText');
        SplitText = st.SplitText ?? st.default ?? st;
      } catch {
        SplitText = null;
      }

      if (!SplitText) {
        gsap.set([titleEl, subtitleEl], { opacity: 1, y: 0, clearProps: 'filter' });
        return;
      }

      gsap.registerPlugin(SplitText);

      split = new SplitText(titleEl, { type: 'chars', charsClass: 'h-char' });

      gsap.set(split.chars, {
        opacity: 0,
        y: 14,
        filter: 'blur(2px)',
        willChange: 'transform, opacity, filter',
      });

      gsap.set(subtitleEl, {
        opacity: 0,
        y: 10,
        filter: 'blur(1.5px)',
        willChange: 'transform, opacity, filter',
      });

      tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(split.chars, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.03,
      })
        .to(
          subtitleEl,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
          },
          '-=0.25'
        )
        .set([split.chars, subtitleEl], { clearProps: 'willChange' });
    })();

    return () => {
      try {
        if (tl) tl.kill();
      } catch {}
      try {
        if (split && typeof split.revert === 'function') split.revert();
      } catch {}
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-16">
      <div className="flex flex-col items-center text-center gap-6 -translate-y-12">
        <h1
          ref={titleRef}
          className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-8xl leading-tight"
        >
          <span className="block">rudy</span>
          <span className="block">chávez</span>
        </h1>
        <p
          ref={subtitleRef}
          className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-[1.5rem] leading-snug"
        >
          diseño gráfico a tu medida
        </p>
      </div>
    </div>
  );
}
