"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoShowcase.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VideoShowcaseProps {
  videoUrl?: string;
  posterImage?: string;
}

export function VideoShowcaseSection({
  videoUrl,
  posterImage = "/Images/services/brand-design.png",
}: VideoShowcaseProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeVideoUrl =
    videoUrl || "https://www.youtube.com/watch?v=1Z58KqDkLy0";
  const isDirectVideoFile = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(activeVideoUrl);

  const getEmbedUrl = (url: string) => {
    try {
      let videoId = "1Z58KqDkLy0";

      if (url.includes("youtube.com/watch")) {
        const urlParams = new URL(url).searchParams;
        videoId = urlParams.get("v") || videoId;
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || videoId;
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] || videoId;
      }

      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    } catch {
      return `https://www.youtube-nocookie.com/embed/1Z58KqDkLy0?autoplay=1&rel=0&modestbranding=1`;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      if (isDesktop && videoCardRef.current && contentRef.current) {
        const card = videoCardRef.current;
        const cardRect = card.getBoundingClientRect();

        const startX =
          window.innerWidth / 2 - (cardRect.left + cardRect.width / 2);

        const startScale = Math.max(
          window.innerWidth / cardRect.width,
          window.innerHeight / cardRect.height
        );

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
            y: 0,
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
        )
          .fromTo(
            badgeRef.current,
            {
              scale: 1 / startScale,
            },
            {
              scale: 1,
              ease: "power2.out",
            },
            0
          )
          .fromTo(
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
            0.2
          );
      } else if (!isDesktop && videoCardRef.current && contentRef.current) {
        gsap.fromTo(
          videoCardRef.current,
          { scale: 1.08, opacity: 0.9 },
          {
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: videoCardRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.8,
            },
          }
        );

        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
            },
          }
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

              {/* Play Now */}
              <div ref={badgeRef} className={styles.badgeWrapper}>
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
              One Partner. From Strategy to{" "}
              <span className={styles.lime}>Scale.</span>
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

            {/* Guaranteed Clickable Button */}
            <Link
              href="/about"
              className={styles.primaryBtn}
              onClick={(e) => {
                e.stopPropagation();
                router.push("/about");
              }}
            >
              More About Us
              <ArrowUpRight size={17} strokeWidth={2.5} />
            </Link>

            <div className={styles.testimonialBox}>
              <p className={styles.quoteText}>
                &quot;The agency was remarkable to work with. Their technical
                execution and product strategy were spot on, and they delivered
                beyond expectation.&quot;
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

      {/* ── ON-PAGE VIDEO MODAL ── */}
      {isPlaying && (
        <div className={styles.modalOverlay} onClick={() => setIsPlaying(false)}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsPlaying(false)}
            aria-label="Close video"
          >
            <X size={24} />
          </button>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
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