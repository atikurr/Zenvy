"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WorkSection.module.css";

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
      "A large-scale logistics platform simplifying crowd safety, transportation, and operations during peak seasons.",
    tags: ["Enterprise SaaS", "Data Visualization", "Full-Stack Web"],
    image: "/Images/services/seo.jpg",
    link: "/work",
  },
  {
    id: "5",
    title: "Prime Iraq",
    subtitle: "Digital Banking Core",
    description:
      "High-security financial mobile banking app crafted to modernize transaction flow and multi-currency wallets.",
    tags: ["Fintech", "App Design", "Interaction Systems"],
    image: "/Images/services/digital-marketing.jpg",
    link: "/work",
  },
  {
    id: "6",
    title: "Panther Security",
    subtitle: "Cloud Threat Analytics",
    description:
      "Real-time cyber defense workspace transforming massive enterprise log data into immediate threat intelligence.",
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
        const res = await fetch(`${API_URL}/api/projects`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data;

        if (list && list.length > 0) {
          setProjects(
            list.map((item: any, idx: number) => ({
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
        // Fallback active
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || projects.length === 0) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // ১ম প্রজেক্ট সার্কেল রিভিল অ্যানিমেশন
      if (firstCardRef.current && firstImageRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: firstCardRef.current,
            start: isMobile ? "top 90%" : "top 85%",
            end: isMobile ? "top 45%" : "top 25%",
            scrub: 1.2,
          },
        });

        tl.fromTo(
          firstCardRef.current,
          {
            clipPath: isMobile ? "circle(20% at 50% 50%)" : "circle(12% at 50% 50%)",
            scale: 0.94,
            filter: "brightness(0.8)",
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
          { scale: 1.2 },
          { scale: 1, ease: "power2.out" },
          0
        );
      }

      // বাকি কার্ডগুলোর স্ক্রল ফেড ও লিফট
      cardsRef.current.slice(1).forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: isMobile ? 35 : 70,
            opacity: 0,
            scale: isMobile ? 0.98 : 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: isMobile ? "top 82%" : "top 65%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  // মাউস হোভার ৩ডি টিল্ট (শুধু মাউস ডিভাইসের জন্য)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
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
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} id="work" className={styles.section}>
      <div className={styles.ambientGlow} />

      <div className={styles.inner}>
        {/* Section Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Selected Portfolio
            </div>
            <h2 className={styles.heading}>
              Featured Digital <br className={styles.desktopBreak} />
              <span>Masterpieces.</span>
            </h2>
          </div>

          <Link href="/work" className={styles.viewAll}>
            Explore All Case Studies
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Dynamic Asymmetric Grid */}
        <div className={styles.grid}>
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
                className={`${styles.projectCard} ${isFull ? styles.fullCard : ""}`}
              >
                {/* Visual Card Frame */}
                <div
                  ref={isFirst ? firstCardRef : undefined}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={`${styles.cardFrame} ${isFull ? styles.fullCardFrame : ""}`}
                >
                  <Image
                    ref={isFirst ? firstImageRef : undefined}
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={isFirst}
                    sizes={isFull ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
                    className={styles.cardImage}
                  />

                  {project.subtitle && (
                    <div className={styles.badge}>
                      {project.subtitle}
                    </div>
                  )}

                  <div className={styles.plusButton}>
                    <Plus size={18} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Project Details */}
                <div className={styles.details}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.title}>{project.title}</h3>
                    {project.subtitle && (
                      <span className={styles.subtitle}>— {project.subtitle}</span>
                    )}
                  </div>

                  <p className={styles.description}>{project.description}</p>

                  {project.tags && project.tags.length > 0 && (
                    <div className={styles.tagWrap}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
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