"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project3DCard } from "./Project3DCard";

const projects = [
  {
    id: "1",
    title: "NeuroSphere AI Platform",
    category: "Web 3D & Computational Design",
    image: "/hero-bg.jpg",
    link: "/work",
    year: "2026",
  },
  {
    id: "2",
    title: "Kinetix Brand Overhaul",
    category: "Identity & 3D Motion",
    image: "/hero-bg.jpg",
    link: "/work",
    year: "2026",
  },
  {
    id: "3",
    title: "Apex Finance Mobile",
    category: "Mobile Product Design",
    image: "/hero-bg.jpg",
    link: "/work",
    year: "2025",
  },
  {
    id: "4",
    title: "Aura E-Commerce",
    category: "Design System & Web",
    image: "/hero-bg.jpg",
    link: "/work",
    year: "2025",
  },
];

export function WorkSection() {
  return (
    <section id="work" className="w-full py-28 bg-[#050505] text-white relative overflow-hidden flex justify-center">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#5B4FE8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfff1a]/10 border border-[#dfff1a]/20 text-[#dfff1a] text-xs font-bold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfff1a] shadow-[0_0_8px_#dfff1a]" />
              Featured Works
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Selected Digital <span className="text-[#dfff1a] drop-shadow-[0_0_20px_rgba(223,255,26,0.3)]">Masterpieces</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-[#dfff1a] transition-colors whitespace-nowrap"
          >
            Explore All Case Studies
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* 2-Column 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Project3DCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}