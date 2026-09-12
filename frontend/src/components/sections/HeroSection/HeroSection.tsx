"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // মোবাইল ও ট্যাবলেটে ডান পাশের কার্ডে x শিফট ওভারফ্লো বন্ধ করার চেক
    const isSmallScreen = window.innerWidth < 1024;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      eyebrowRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.3"
      )
      .fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        statsRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        rightRef.current,
        {
          x: isSmallScreen ? 0 : 60,
          y: isSmallScreen ? 35 : 0,
          opacity: 0,
        },
        { x: 0, y: 0, opacity: 1, duration: 1, ease: "expo.out" },
        "-=1"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        {/* ── LEFT ── */}
        <div className={styles.left}>
          {/* Eyebrow */}
          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Digital Agency · Est. 2021
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className={styles.headline}>
            We Build Digital <br className={styles.desktopBreak} />
            Experiences That <br className={styles.desktopBreak} />
            Drive Real Growth.
          </h1>

          {/* Sub */}
          <p ref={subRef} className={styles.subText}>
            A creative digital agency delivering innovative solutions that help
            brands grow, engage, and succeed online.
          </p>

          {/* Stats */}
          <div ref={statsRef} className={styles.statsRow}>
            <div className={styles.statItem}>
              <h2 className={styles.limeText}>672+</h2>
              <p>
                Projects
                <br />
                Completed
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <h2 className={styles.limeText}>592+</h2>
              <p>
                Happy
                <br />
                Clients
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className={styles.ctaRow}>
            <Link href="/services" className={styles.btnLime}>
              Explore Services <ArrowRight size={18} />
            </Link>
            <Link href="/work" className={styles.btnWhite}>
              View Our Work <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div ref={rightRef} className={styles.right}>
          <div className={styles.glassCard}>
            <div className={styles.arrowBadge}>
              <ArrowUpRight size={24} color="#000" />
            </div>

            <h3 className={styles.cardTitle}>
              Your Trusted Digital <br className={styles.desktopBreak} /> Agency Partner
            </h3>
            <p className={styles.cardSub}>
              From strategy to execution, we turn ideas into measurable results.
            </p>

            <div className={styles.cardFooter}>
              <div className={styles.avatarStack}>
                {["ZA", "MB", "SK", "RJ"].map((init, i) => (
                  <div
                    key={i}
                    className={styles.avatar}
                    style={{
                      background: [
                        "linear-gradient(135deg,#5B4FE8,#4FD1C5)",
                        "linear-gradient(135deg,#DFFF1A,#5B4FE8)",
                        "linear-gradient(135deg,#4FD1C5,#E8764F)",
                        "linear-gradient(135deg,#E8764F,#DFFF1A)",
                      ][i],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div className={styles.satisfactionBadge}>
                <span className={styles.badgeTop}>100%</span>
                <span className={styles.badgeBottom}>Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}