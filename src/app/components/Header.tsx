'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

export default function Header() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const line1El = line1Ref.current;
    const line2El = line2Ref.current;
    if (!titleEl || !subtitleEl || !line1El || !line2El) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      line1El.textContent = 'rudy';
      line2El.textContent = 'chávez';
      gsap.set([subtitleEl], { opacity: 1, y: 0, clearProps: 'filter' });
      return;
    }

    gsap.set([line1El, line2El], { opacity: 1, clearProps: 'filter' });

    gsap.set(subtitleEl, {
      opacity: 0,
      y: 12,
      filter: 'blur(1.5px)',
      willChange: 'transform, opacity, filter',
    });

    line1El.textContent = 'rudy';
    line2El.textContent = 'chávez';

    const tl = gsap.timeline();

    tl.to(line1El, {
      duration: 1.1,
      scrambleText: {
        text: 'rudy',
        chars: 'lowerCase',
        speed: 0.7,
        revealDelay: 0.1,
      },
      ease: 'power4.out',
    }, 0)
      .to(line2El, {
        duration: 1.0,
        scrambleText: {
          text: 'chávez',
          chars: 'lowerCase',
          speed: 0.7,
          revealDelay: 0.1,
        },
        ease: 'power4.out',
      }, 0)
      .to(
        subtitleEl,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          clearProps: 'willChange',
        },
        '-=0.61'
      );

    return () => {
      tl.kill();
      line1El.textContent = 'rudy';
      line2El.textContent = 'chávez';
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-16">
      <div className="flex flex-col items-center text-center gap-6 -translate-y-12">
        <h1
          ref={titleRef}
          className="font-['Mint_Grotesk',sans-serif] text-[#5576e8] text-8xl leading-tight"
        >
          <span ref={line1Ref} className="block">rudy</span>
          <span ref={line2Ref} className="block">chávez</span>
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
