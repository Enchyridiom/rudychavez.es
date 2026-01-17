'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export type Project = {
  id: number;
  title: string;
  slug: string;
  image: string;
  rotation: number;
};

export default function ProjectsLoop({ projects }: { projects: Project[] }) {
  const loopProjects = [...projects, ...projects, ...projects];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const oneThird = el.scrollHeight / 3;
    el.scrollTop = oneThird;
  }, []);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ease = (x: number) => x * x * (3 - 2 * x);

    const measure = () => {
      rafRef.current = null;

      const containerRect = el.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;
      const range = containerRect.height / 2;

      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-project-card]'));
      let bestCard: HTMLElement | null = null;
      let bestT = -1;

      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const cardCenterY = r.top + r.height / 2;
        const dist = Math.abs(cardCenterY - centerY);
        const t = Math.max(0, Math.min(1, 1 - dist / range));
        const e = ease(t);

        const rotation = Number(card.dataset.rotation ?? '0');
        const scale = 0.92 + (1.0 - 0.92) * e;
        const vw = 78 + (90 - 78) * e;

        card.style.width = `${vw}vw`;
        card.style.maxWidth = '24rem';
        card.style.transform = `rotate(${rotation}deg) scale(${scale})`;

        const floatWrap = card.querySelector<HTMLElement>('[data-float-wrapper]');
        if (floatWrap) {
          const ampMax = 0.375;
          const ampMin = 0.0625;
          const amp = ampMax - (ampMax - ampMin) * e;

          floatWrap.style.setProperty('--floatAmp', `${amp}rem`);

          if (!floatWrap.style.getPropertyValue('--floatDur')) {
            const dur = 4 + Math.random() * 2;
            floatWrap.style.setProperty('--floatDur', `${dur.toFixed(2)}s`);
          }
        }

        card.setAttribute('data-center-t', t.toFixed(3));

        if (t > bestT) {
          bestT = t;
          bestCard = card;
        }
      }

      for (const card of cards) {
        if (card === bestCard) {
          card.setAttribute('data-centered', 'true');
        } else {
          card.removeAttribute('data-centered');
        }
      }
    };

    const requestMeasure = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(measure);
    };

    requestMeasure();
    el.addEventListener('scroll', requestMeasure, { passive: true });

    return () => {
      el.removeEventListener('scroll', requestMeasure);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="projects-loop h-screen w-full overflow-y-auto flex flex-col items-center gap-8 py-16"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {loopProjects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          aria-label={project.title}
          className="project-card flex items-center justify-center relative"
          data-project-card
          data-rotation={project.rotation}
        >
          <div data-float-wrapper className="project-float flex flex-col items-center justify-center p-2.5 relative w-full">
            <div className="project-media h-64 relative rounded-2xl shrink-0 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                draggable={false}
              />
            </div>
          </div>
        </Link>
      ))}
      <style jsx>{`
        @keyframes projectFloat {
          0%, 100% {
            transform: translateY(calc(var(--floatAmp, 0rem) * -1));
          }
          50% {
            transform: translateY(var(--floatAmp, 0rem));
          }
        }
        .project-float {
          animation: projectFloat var(--floatDur, 5s) ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
