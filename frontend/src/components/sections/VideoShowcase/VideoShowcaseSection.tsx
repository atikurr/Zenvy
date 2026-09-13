"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoShowcase.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VideoShowcaseProps {
  // অ্যাডমিন প্যানেল থেকে আসা ভিডিও URL (S3 ডিরেক্ট mp4 অথবা YouTube লিংক)
  videoUrl?: string;
  posterImage?: string;
}

export function VideoShowcaseSection({
  videoUrl,
  posterImage = "/Images/services/brand-design.png",
}: VideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ডেমো ফলব্যাক: অ্যাডমিন থেকে কিছু না আসলে ডিফল্ট ইউটিউব ডেমো
  const activeVideoUrl = videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  // ভিডিও ফরম্যাট যাচাই (ডিরেক্ট আপলোডেড ফাইল নাকি ইউটিউব লিংক)
  const isDirectVideoFile = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(activeVideoUrl);

  // ইউটিউব লিংক হলে এমবেড URL ফরম্যাটে রূপান্তর
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    }
    if (url.includes("youtube.com/embed/")) {
      return url.includes("autoplay=1") ? url : `${url}?autoplay=1`;
    }
    return url;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      if (isDesktop && videoCardRef.current && contentRef.current) {
        const card = videoCardRef.current;
        const rect = card.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const startX = vw / 2 - cardCenterX;
        const startY = vh / 2 - cardCenterY;
        const startScale = Math.max(vw / rect.width, vh / rect.height);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=90%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          card,
          {
            x: startX,
            y: startY,
            scale: startScale,
            borderRadius: "0px",
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            borderRadius: "28px",
            ease: "power2.out",
          },
          0
        ).fromTo(
          contentRef.current.children,
          {
            opacity: 0,
            x: 35,
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            ease: "power2.out",
          },
          0.25
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className={styles.wrapper}>
        <div className={styles.innerContainer}>
          {/* ── LEFT: DOCKED VIDEO CARD ── */}
          <div className={styles.videoColWrapper}>
            <div
              ref={videoCardRef}
              className={styles.videoCard}
              onClick={() => setIsPlaying(true)}
            >
              <Image
                src={posterImage}
                alt="Studio Environment and Culture"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.posterImage}
              />
              <div className={styles.overlay} />

              <div className={styles.badgeWrapper}>
                <div className={styles.rotatingDisc}>
                  <svg viewBox="0 0 100 100" className={styles.discSvg}>
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="transparent"
                    />
                    <text className={styles.discText}>
                      <textPath href="#circlePath">
                        PLAY NOW • 120 SECONDS • PLAY NOW •
                      </textPath>
                    </text>
                  </svg>
                  <div className={styles.playIconCenter}>
                    <Play size={18} fill="#000" color="#000" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: BALANCED CENTERED CONTENT ── */}
          <div ref={contentRef} className={styles.contentColumn}>
            <h2 className={styles.title}>
              One Partner. From Strategy to <span className={styles.lime}>Scale.</span>
            </h2>

            <p className={styles.leadParagraph}>
              Great digital products need more than good design.
            </p>

            <p className={styles.bodyParagraph}>
              We bring strategy, research, design, and high-performance engineering
              together to solve business challenges from every angle. We validate
              ideas, build scalable digital experiences, and architect the technology
              powering ambitious ventures.
            </p>

            <Link href="/about" className={styles.primaryBtn} prefetch={true}>
  More About Us
  <ArrowUpRight size={17} strokeWidth={2.5} />
</Link>

            <div className={styles.testimonialBox}>
              <p className={styles.quoteText}>
                &quot;The agency was remarkable to work with. Their technical execution
                and product strategy were spot on, and they delivered beyond expectation.&quot;
              </p>

              <div className={styles.authorRow}>
                <div className={styles.avatar}>
                  <Image
                    src="/Images/services/ui-ux-design.png"
                    alt="Founder avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className={styles.authorName}>Alexander Wright</h4>
                  <p className={styles.authorRole}>
                    Co-Founder, Nexlify Software Technologies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ON-PAGE VIDEO MODAL (NO REDIRECT) ── */}
      {isPlaying && (
        <div className={styles.modalOverlay} onClick={() => setIsPlaying(false)}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsPlaying(false)}
            aria-label="Close video"
          >
            <X size={24} />
          </button>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {isDirectVideoFile ? (
              
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className={styles.iframe}
              />
            ) : (
              
              <iframe
                src={getEmbedUrl(activeVideoUrl)}
                title="Agency Brand Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}