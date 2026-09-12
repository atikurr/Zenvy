"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "brand-design",
    number: "01",
    title: "Brand Design & Visual Identity",
    slug: "brand-design",
    description:
      "Crafting memorable visual identities, design systems, and guidelines that make modern brands instantly recognizable across global markets.",
    tags: ["Brand Identity", "Design System", "Motion Design", "Strategy"],
    image: "/Images/services/brand-design.png",
  },
  {
    id: "ui-ux-design",
    number: "02",
    title: "UI/UX & Product Design",
    slug: "ui-ux-design",
    description:
      "Architecting clean, friction-free interfaces and user flows designed to improve product retention and conversion metrics.",
    tags: ["UX Audit", "Wireframing", "Prototyping", "Design System"],
    image: "/Images/services/ui-ux-design.png",
  },
  {
    id: "seo",
    number: "03",
    title: "SEO & Growth Engine",
    slug: "seo",
    description:
      "Dominating organic search with technical SEO, keyword distribution, and content architectures engineered to drive qualified traffic.",
    tags: ["Technical SEO", "Etsy / Shopify SEO", "YouTube SEO", "Audits"],
    image: "/Images/services/seo.jpg",
  },
  {
    id: "digital-marketing",
    number: "04",
    title: "Digital Marketing & Performance",
    slug: "digital-marketing",
    description:
      "Executing high-yield paid and organic campaigns across Meta and Google that deliver measurable conversion pipeline growth.",
    tags: ["Meta Ads", "Google Ads", "Content Strategy", "Analytics"],
    image: "/Images/services/digital-marketing.jpg",
  },
  {
    id: "web-design-development",
    number: "05",
    title: "Web Development & 3D Interactive",
    slug: "web-design-development",
    description:
      "Building high-performance Next.js web applications featuring WebGL, GSAP micro-interactions, and responsive design systems.",
    tags: ["Next.js", "React / Three.js", "Tailwind CSS", "High Performance"],
    image: "/Images/services/web-design.jpg",
  },
  {
    id: "app-design-development",
    number: "06",
    title: "Mobile App Architecture",
    slug: "app-design-development",
    description:
      "Creating seamless native-feel mobile applications for iOS and Android with intuitive ergonomics and scalable foundations.",
    tags: ["iOS Design", "Android Design", "Cross-Platform", "App Prototypes"],
    image: "/Images/services/mobile-app-design.jpg",
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // শেষ কার্ড স্কেল করার প্রয়োজন নেই

        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.35,
          filter: "blur(4px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 80%",
            end: "top 25%",
            scrub: 0.5,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className={styles.section}>
      <div className={styles.ambientGlow} />

      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              WHAT WE DO
            </div>
            <h2 className={styles.heading}>
              Services Built to <span>Grow</span>
              <br />
              Your Business.
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.subtext}>
              From strategy to execution — we handle everything so you can focus on what matters most.
            </p>
            <Link href="/services" className={styles.viewAll}>
              View All Services
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* 3D Depth Stacked Cards */}
        <div className={styles.cardsStack}>
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={styles.stickyCard}
              style={{
                zIndex: index + 1,
              }}
            >
              {/* Left Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.numberTag}>{service.number}</span>
                  <div className={styles.divider} />
                  <span className={styles.scopeTag}>Agency Service</span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>

                  <div className={styles.tagsWrap}>
                    {service.tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardAction}>
                  <span>Explore Service</span>
                  <div className={styles.actionIcon}>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              {/* Right Media */}
              <div className={styles.cardMedia}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={styles.mediaImage}
                />
                <div className={styles.mediaOverlay} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}