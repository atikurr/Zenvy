"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Target, Zap, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "99.4%", label: "Client Satisfaction Rate" },
  { value: "48h", label: "Average Sprint Turnaround" },
  { value: "14+", label: "Global Design Recognitions" },
  { value: "$42M+", label: "Client Revenue Generated" },
];

const pillars = [
  {
    icon: <Target size={22} />,
    title: "Precision Engineering",
    desc: "We prioritize sub-second render speeds, clean code architectures, and high-converting user funnels.",
  },
  {
    icon: <Zap size={22} />,
    title: "Agile Rapid Sprints",
    desc: "Fast-paced, iterative design-to-production cycles designed for high-growth tech startups and brands.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Enterprise Scale",
    desc: "Rock-solid digital platforms equipped to handle sudden multi-million visitor spikes without friction.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // ১. ভিডিও/মিডিয়া মাস্ক স্কেলিং ও এক্সপ্যানশন
      if (mediaContainerRef.current) {
        gsap.fromTo(
          mediaContainerRef.current,
          {
            clipPath: isMobile
              ? "inset(12% 6% 12% 6% round 24px)"
              : "inset(18% 14% 18% 14% round 40px)",
            scale: 0.94,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mediaContainerRef.current,
              start: "top 80%",
              end: "top 25%",
              scrub: 1.2,
            },
          }
        );
      }

      // ২. কাইনেটিক ব্যাকগ্রাউন্ড টেক্সট প্যারালাক্স স্ক্রলিং
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: isMobile ? -20 : -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      {/* Background Kinetic Marquee */}
      <div className={styles.kineticWrapper}>
        <div ref={marqueeRef} className={styles.kineticText}>
          INNOVATION • DISRUPTION • PRECISION • ARCHITECTURE • CRAFT • 
        </div>
      </div>

      <div className={styles.inner}>
        {/* Top Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Sparkles size={12} />
            ABOUT OUR CRAFT
          </div>
          <h2 className={styles.headline}>
            Obsessed with <span className={styles.lime}>Design</span>, <br />
            Driven by Technical Precision.
          </h2>
          <p className={styles.leadText}>
            We are a future-forward digital studio partnering with ambitious companies
            worldwide to turn bold ideas into high-converting digital realities.
          </p>
        </div>

        {/* Morphing Video / Hero Showcase */}
        <div className={styles.mediaViewport}>
          <div ref={mediaContainerRef} className={styles.mediaContainer}>
            <Image
              src="/Images/services/web-design.jpg"
              alt="Studio Culture & Engineering"
              fill
              priority
              sizes="100vw"
              className={styles.mediaImage}
            />
            <div className={styles.mediaOverlay} />

            <div className={styles.mediaFloatingBadge}>
              <div className={styles.badgePulse} />
              <span>Full-Service Digital Lab · Global Reach</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.metricCard}>
              <span className={styles.metricVal}>{stat.value}</span>
              <span className={styles.metricLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Pillars / Feature Blocks */}
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, i) => (
            <div key={i} className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>{pillar.icon}</div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDesc}>{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className={styles.bottomBanner}>
          <div>
            <h3 className={styles.bannerHeading}>Ready to scale your next digital breakthrough?</h3>
            <p className={styles.bannerSub}>Let&apos;s engineer something unforgettable together.</p>
          </div>
          <Link href="/contact" className={styles.bannerBtn}>
            Start a Conversation
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}