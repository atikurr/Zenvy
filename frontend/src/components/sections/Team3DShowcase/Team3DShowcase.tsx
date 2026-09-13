"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Team3DShowcase.module.css";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // Transparent PNG / cutout image works best
  accentColor: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

const TEAM_DATA: TeamMember[] = [
  {
    id: "1",
    name: "Atikur Rahman",
    role: "Founder & Lead Architect",
    bio: "Pioneering high-performance digital products, scalable engineering, and clean UX systems.",
    image: "/Images/services/brand-design.png",
    accentColor: "#3b82f6",
  },
  {
    id: "2",
    name: "Naeem Islam Tanjir",
    role: "Co-Founder & Strategic Director",
    bio: "Orchestrating agency operations, brand architecture, and sustainable commercial growth.",
    image: "/Images/services/ui-ux-design.png",
    accentColor: "#dfff1a",
  },
  {
    id: "3",
    name: "Morshedul Islam Maruf",
    role: "Principal Project Manager",
    bio: "Obsessed with micro-interactions, typography hierarchy, and fluid interactive 3D spaces.",
    image: "/Images/services/mobile-app-design.jpg",
    accentColor: "#ec4899",
  },
];

export function Team3DShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEAM_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEAM_DATA.length - 1 : prev + 1) % TEAM_DATA.length);
  };

  const active = TEAM_DATA[currentIndex];
  const prevMember = TEAM_DATA[(currentIndex - 1 + TEAM_DATA.length) % TEAM_DATA.length];
  const nextMember = TEAM_DATA[(currentIndex + 1) % TEAM_DATA.length];

  return (
    <section className={styles.stageWrapper}>
      {/* Dynamic Background Glow */}
      <div 
        className={styles.ambientGlow} 
        style={{ background: `radial-gradient(circle, ${active.accentColor}33 0%, transparent 70%)` }}
      />

      {/* Giant Typography Depth Layer */}
      <div className={styles.watermarkLayer}>
        <span className={styles.watermarkText}>{active.name.split(" ")[0]}</span>
      </div>

      {/* 3D Interactive Stage */}
      <div className={styles.stageCenter}>
        {/* Left Miniature Preview */}
        <div className={`${styles.sidePreview} ${styles.sideLeft}`} onClick={handlePrev}>
          <div className={styles.previewImageWrap}>
            <Image
              src={prevMember.image}
              alt={prevMember.name}
              fill
              className="object-contain"
              sizes="200px"
            />
          </div>
        </div>

        {/* Center Active Foreground Figure */}
        <div className={styles.activeFigureSlot} key={active.id}>
          <div className={styles.figureImageWrap}>
            <Image
              src={active.image}
              alt={active.name}
              fill
              priority
              className={styles.activeImg}
              sizes="(max-width: 768px) 90vw, 480px"
            />
          </div>
          {/* Ground Ambient Contact Shadow */}
          <div className={styles.groundShadow} />
        </div>

        {/* Right Miniature Preview */}
        <div className={`${styles.sidePreview} ${styles.sideRight}`} onClick={handleNext}>
          <div className={styles.previewImageWrap}>
            <Image
              src={nextMember.image}
              alt={nextMember.name}
              fill
              className="object-contain"
              sizes="200px"
            />
          </div>
        </div>
      </div>

      {/* Footer Details & Navigation */}
      <div className={styles.detailsDock}>
        <div className={styles.infoCol}>
          <span className={styles.roleTag} style={{ color: active.accentColor }}>
            {active.role}
          </span>
          <h3 className={styles.nameHeader}>{active.name}</h3>
          <p className={styles.bioBody}>{active.bio}</p>
        </div>

        <div className={styles.navControls}>
          <button onClick={handlePrev} className={styles.navBtn} aria-label="Previous member">
            <ArrowLeft size={18} />
          </button>
          <button onClick={handleNext} className={styles.navBtn} aria-label="Next member">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}