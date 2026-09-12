"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  image: string;
  link?: string;
  slug?: string;
};

interface ApiProjectItem {
  _id?: string;
  id?: string;
  title?: string;
  category?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  coverImage?: string;
  image?: string;
  slug?: string;
  link?: string;
}

const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Boon",
    subtitle: "Web Application Design",
    description:
      "Modern and minimal design solutions for job referrals, applicant tracking, and AI-driven candidate talent matching.",
    tags: ["SaaS Design", "User Research", "Next.js Development"],
    image: "/Images/services/web-design.jpg",
    link: "/work",
  },
  {
    id: "2",
    title: "Abyan Capital",
    subtitle: "Fintech Trading Mobile App",
    description:
      "Innovative mobile product facilitating algorithmic trading, real-time analytics, and automated portfolio balancing.",
    tags: ["Mobile App Design", "Fintech", "UI/UX Systems"],
    image: "/Images/services/mobile-app-design.jpg",
    link: "/work",
  },
  {
    id: "3",
    title: "Rivertel",
    subtitle: "Telecom Enterprise Experience",
    description:
      "Simplified customer lifecycle and brand architecture with user-focused telecom enterprise portal interfaces.",
    tags: ["UX Research", "Brand Strategy", "Visual Identity"],
    image: "/Images/services/brand-design.png",
    link: "/work",
  },
  {
    id: "4",
    title: "Haj Tafweej",
    subtitle: "Smart Pilgrim Management",
    description:
      "A large-scale government-backed logistics platform simplifying crowd safety, transportation, and operations during peak seasons.",
    tags: ["Enterprise SaaS", "Data Visualization", "Full-Stack Web"],
    image: "/Images/services/seo.jpg",
    link: "/work",
  },
  {
    id: "5",
    title: "Prime Iraq",
    subtitle: "Digital Banking Core",
    description:
      "High-security financial mobile banking app crafted to modernize transaction flow and multi-currency digital wallets.",
    tags: ["Fintech", "App Design", "Interaction Systems"],
    image: "/Images/services/digital-marketing.jpg",
    link: "/work",
  },
  {
    id: "6",
    title: "Panther Security",
    subtitle: "Cloud Threat Analytics",
    description:
      "Real-time cyber defense workspace transforming massive enterprise system log data into immediate threat intelligence.",
    tags: ["Cyber Security", "UI Engineering", "Design System"],
    image: "/Images/services/web-design.jpg",
    link: "/work",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function WorkSection() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const sectionRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_URL}/api/projects`, {
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = await res.json();
        const list: ApiProjectItem[] = Array.isArray(data) ? data : data?.data;

        if (list && list.length > 0) {
          setProjects(
            list.map((item: ApiProjectItem, idx: number) => ({
              id: item._id || item.id || String(idx + 1),
              title: item.title || "Untitled Project",
              subtitle: item.category || item.subtitle || "Case Study",
              description: item.description || "Cutting-edge digital craft engineered for scale.",
              tags: item.tags || ["Design", "Engineering"],
              image: item.coverImage || item.image || "/Images/services/web-design.jpg",
              link: item.slug ? `/work/${item.slug}` : item.link || "/work",
            }))
          );
        }
      } catch {
        // Fallback data remains active if API is unavailable
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || projects.length === 0) return;

    const ctx = gsap.context(() => {
      if (firstCardRef.current && firstImageRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: firstCardRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.2,
          },
        });

        tl.fromTo(
          firstCardRef.current,
          {
            clipPath: "circle(12% at 50% 50%)",
            scale: 0.88,
            filter: "brightness(0.7)",
          },
          {
            clipPath: "circle(100% at 50% 50%)",
            scale: 1,
            filter: "brightness(1)",
            ease: "power2.out",
          },
          0
        ).fromTo(
          firstImageRef.current,
          { scale: 1.3 },
          { scale: 1, ease: "power2.out" },
          0
        );
      }

      cardsRef.current.slice(1).forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            rotateX: 8,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 65%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotateY: x / 30,
      rotateX: -y / 30,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="w-full py-32 bg-[#050505] text-white relative overflow-hidden flex flex-col items-center"
    >
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#dfff1a]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfff1a]/10 border border-[#dfff1a]/20 text-[#dfff1a] text-xs font-bold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfff1a] shadow-[0_0_8px_#dfff1a]" />
              Selected Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Featured Digital <span className="text-[#dfff1a]">Masterpieces.</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {projects.map((project, index) => {
            const isFull = index % 3 === 0;
            const isFirst = index === 0;

            return (
              <Link
                key={project.id}
                href={project.link || `/work/${project.slug || ""}`}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`group flex flex-col gap-5 text-inherit no-underline ${
                  isFull ? "md:col-span-2" : "col-span-1"
                }`}
              >
                <div
                  ref={isFirst ? firstCardRef : undefined}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={`relative w-full rounded-[28px] bg-[#0d0d12] border border-white/10 overflow-hidden transition-colors duration-500 group-hover:border-[#dfff1a]/50 group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(223,255,26,0.15)] ${
                    isFull ? "h-[450px] sm:h-[520px] md:h-[600px]" : "h-[380px] sm:h-[450px]"
                  }`}
                  style={{
                    willChange: isFirst ? "clip-path, transform, filter" : "transform",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image
                    ref={isFirst ? firstImageRef : undefined}
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={isFirst}
                    sizes={isFull ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {project.subtitle && (
                    <div className="absolute top-6 left-6 z-10 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-neutral-300 tracking-wide">
                      {project.subtitle}
                    </div>
                  )}

                  <div className="absolute right-6 bottom-6 w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-[#dfff1a] group-hover:text-black group-hover:border-[#dfff1a] group-hover:rotate-45 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(223,255,26,0.6)]">
                    <Plus size={22} strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 px-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#dfff1a] transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <span className="text-sm font-semibold text-neutral-500">
                        — {project.subtitle}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-neutral-300 transition-colors group-hover:border-[#dfff1a]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}