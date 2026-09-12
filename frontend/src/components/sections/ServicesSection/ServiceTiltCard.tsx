"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./ServicesSection.module.css";

type Service = {
  id: string;
  number: string;
  title: string;
  slug: string;
  description: string;
  order: number;
};

export function ServiceTiltCard({
  service,
  image,
}: {
  service: Service;
  image: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // টাচ ডিভাইস চেক যাতে ফোনে পারফরম্যান্স ল্যাগ না করে
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // মোবাইল বা টাচ স্ক্রিনে ৩ডি টিল্ট বন্ধ থাকবে
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || !cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.card}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Cursor Spotlight (Desktop Only) */}
      {!isTouchDevice && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 12,
            opacity: spotlight.opacity,
            background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(223, 255, 26, 0.18), transparent 70%)`,
            transition: "opacity 0.25s ease",
          }}
        />
      )}

      {/* Background Image Layer */}
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.imageGradient} />
      </div>

      {/* Top Bar: Number Badge */}
      <div className={styles.topBar}>
        <span className={styles.numberBadge}>{service.number}</span>
      </div>

      {/* Default Bottom State: Title + Arrow Icon */}
      <div className={styles.bottomStatic}>
        <h3 className={styles.staticTitle}>{service.title}</h3>
        <div className={styles.arrowCircle}>
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Unique Hover Reveal Drawer */}
      <div className={styles.hoverDrawer}>
        <h3 className={styles.drawerTitle}>{service.title}</h3>
        <p className={styles.drawerDesc}>{service.description}</p>
        <div className={styles.drawerAction}>
          <span>Explore Service</span>
          <ArrowUpRight size={15} />
        </div>
      </div>
    </Link>
  );
}