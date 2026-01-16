'use client';

import Link from 'next/link';

export type Project = {
  id: number;
  title: string;
  slug: string;
  image: string;
  rotation: number;
};

export default function InfiniteScroll({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          aria-label={project.title}
          className="flex items-center justify-center relative w-96"
          style={{ transform: `rotate(${project.rotation}deg)` }}
        >
          <div className="flex flex-col items-center justify-center p-2.5 relative w-96">
            <div className="h-64 relative rounded-2xl shrink-0 w-96 overflow-hidden">
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
    </>
  );
}
