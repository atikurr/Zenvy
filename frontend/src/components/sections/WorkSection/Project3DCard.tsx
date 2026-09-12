"use client";

import React, { useRef, useState, useEffect } from "react";
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

export function ProjectCard3D({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // টাচস্ক্রিনে ৩ডি টিল্ট ফ্রিজ হওয়া বন্ধ রাখতে
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setRotate({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Link
      ref={cardRef}
      href={project.link}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative block w-full rounded-2xl sm:rounded-3xl bg-[#0d0d12] border border-white/10 overflow-hidden cursor-pointer group transition-all duration-300 hover:border-[#dfff1a]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(223,255,26,0.12)]"
      style={{
        transform: isTouchDevice
          ? "none"
          : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: isTouchDevice ? "flat" : "preserve-3d",
      }}
    >
      {/* Spotlight Glow on Cursor Hover */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(223, 255, 26, 0.2), transparent 70%)`,
          }}
        />
      )}

      {/* Banner */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/25 to-transparent" />
      </div>

      {/* Bottom Information */}
      <div className="p-4 sm:p-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#dfff1a] truncate">
              {project.category}
            </span>
            <span className="text-[11px] sm:text-xs text-neutral-500 whitespace-nowrap">
              • {project.year}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#dfff1a] transition-colors truncate">
            {project.title}
          </h3>
        </div>

        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white shrink-0 transition-all duration-300 group-hover:bg-[#dfff1a] group-hover:text-black group-hover:border-[#dfff1a] group-hover:rotate-45 group-hover:shadow-[0_0_15px_rgba(223,255,26,0.5)]">
          <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
        </div>
      </div>
    </Link>
  );
}