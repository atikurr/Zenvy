"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  year: string;
};

export function Project3DCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Link
      ref={cardRef}
      href={project.link}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative block w-full rounded-2xl bg-[#0d0d12] border border-white/10 overflow-hidden cursor-pointer group transition-all duration-300 hover:border-[#dfff1a]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(223,255,26,0.12)]"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(223, 255, 26, 0.22), transparent 70%)`,
        }}
      />

      {/* Image Banner */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/30 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#dfff1a]">
              {project.category}
            </span>
            <span className="text-xs text-neutral-500">• {project.year}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#dfff1a] transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white shrink-0 transition-all duration-300 group-hover:bg-[#dfff1a] group-hover:text-black group-hover:border-[#dfff1a] group-hover:rotate-45 group-hover:shadow-[0_0_15px_rgba(223,255,26,0.5)]">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </Link>
  );
}