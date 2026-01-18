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
  const repeatCount = 7;
  const loopProjects = Array.from({ length: repeatCount }, () => projects).flat();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const segment = el.scrollHeight / repeatCount;
    el.scrollTop = segment * Math.floor(repeatCount / 2);
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
        const signed = (cardCenterY - centerY) / range;
        const dist = Math.abs(cardCenterY - centerY);
        const t = Math.max(0, Math.min(1, 1 - dist / range));
        const e = ease(t);

        const rotation = 0;
        const scale = 0.84 + (1.0 - 0.84) * e;
        card.style.transform = `scale(${scale})`;

        const pill = card.querySelector<HTMLElement>('[data-title-pill]');
        if (pill) {
          const start = 0.55;
          const end = 0.85;
          const p = Math.max(0, Math.min(1, (t - start) / (end - start)));
          const pe = ease(p);

          const opacity = pe * pe;
          const pillScale = 0.95 + (1.0 - 0.95) * pe;

          const offsetMaxPx = r.height * 0.9;
          const movePx = signed * offsetMaxPx * (1 - pe);

          pill.style.opacity = opacity.toFixed(3);
          pill.style.transform = `translate(-50%, -50%) translateY(${movePx.toFixed(1)}px) scale(${pillScale})`;
        }

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
      className="projects-loop h-full w-full overflow-y-scroll overscroll-contain flex flex-col items-center gap-6 py-16"
      style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorY: 'contain', touchAction: 'pan-y' }}
      onWheelCapture={(e) => e.stopPropagation()}
      onTouchMoveCapture={(e) => e.stopPropagation()}
    >
      {loopProjects.map((project, idx) => (
        <Link
          key={`${project.id}-${idx}`}
          href={`/projects/${project.slug}`}
          aria-label={project.title}
          className="project-card flex items-center justify-center relative w-[90vw] max-w-[24rem]"
          data-project-card
        >
          <div data-float-wrapper className="project-float flex flex-col items-center justify-center p-2.5 relative w-full">
            <div className="project-media h-72 relative rounded-2xl shrink-0 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                draggable={false}
              />
            </div>
            <div
              data-title-pill
              className="project-title-pill pointer-events-none absolute left-1/2 top-[65%]"
              style={{ opacity: 0, transform: 'translate(-50%, -50%) translateY(120px) scale(0.95)' }}
            >
              <span className="project-title-pill-inner">{project.title}</span>
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
        .project-title-pill {
          will-change: transform, opacity;
        }
        .project-title-pill-inner {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          line-height: 1;
          padding: 1rem 1.5rem;
          border-radius: 9999px;
          background: #f7f3e8;
          color: #2f333e;
        }
        .project-media {
          box-shadow: 0 18px 40px rgba(47, 51, 62, 0.12);
        }
      `}</style>
    </div>
  );
}
