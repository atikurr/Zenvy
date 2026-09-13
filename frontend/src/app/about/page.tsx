"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, ArrowRight, ArrowLeft, Compass, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import styles from "./AboutPage.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_PILLARS = [
  { img: "/Images/services/brand-design.png", label: "Brand Strategy", code: "01" },
  { img: "/Images/services/web-design.jpg", label: "Experience Design", code: "02" },
  { img: "/Images/services/ui-ux-design.png", label: "Design Engineering", code: "03" },
  { img: "/Images/services/mobile-app-design.jpg", label: "Mobile Ecosystems", code: "04" },
  { img: "/Images/services/brand-design.png", label: "Scalable Ventures", code: "05" },
];

const AWARDS = [
  { id: "behance", name: "Behance", detail: "2x Interaction Design awards", year: "2024" },
  { id: "clutch", name: "Clutch", detail: "Top B2B Service Provider and UX Design Agency", year: "Global Top 1%" },
  { id: "dribbble", name: "Dribbble", detail: "One of the best Design Agency", year: "Worldwide" },
  { id: "upwork", name: "Upwork", detail: "Top Rated Plus Design Agency", year: "Verified Leader" },
];

const TEAM_3D = [
  {
    id: "1",
    name: "ATIKUR RAHMAN",
    role: "Founder & Chief Executive Officer (CEO)",
    bio: "Pioneering high-performance digital products, corporate vision, and transformative client partnerships.",
    img: "/Images/services/ui-ux-design.png",
    accentColor: "#3b82f6",
  },
  {
    id: "2",
    name: "NAEEM ISLAM TANJIR",
    role: "Founder & Chief Operating Officer (COO)",
    bio: "Orchestrating agency operations, agile sprint frameworks, and cross-functional execution.",
    img: "/Images/services/brand-design.png",
    accentColor: "#dfff1a",
  },
  {
    id: "3",
    name: "MORSHEDUL ISLAM MARUF",
    role: "Chief Design Officer (CDO)",
    bio: "Directing interaction design paradigms, 3D visual language, and brand experience design.",
    img: "/Images/services/web-design.jpg",
    accentColor: "#ec4899",
  },
  {
    id: "4",
    name: "UMME HAFSA",
    role: "Director of Design, Product & AI",
    bio: "Bridging next-gen machine learning systems with clean, intuitive human-interface architecture.",
    img: "/Images/services/mobile-app-design.jpg",
    accentColor: "#10b981",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLensRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const excellenceRef = useRef<HTMLDivElement>(null);
  const pillarsWrapRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const count1Ref = useRef<HTMLSpanElement>(null);
  const count2Ref = useRef<HTMLSpanElement>(null);

  const [activeAward, setActiveAward] = useState<number>(2);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);

  const handlePrevTeam = () => {
    setCurrentTeamIndex((prev) => (prev === 0 ? TEAM_3D.length - 1 : prev - 1));
  };

  const handleNextTeam = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % TEAM_3D.length);
  };

  const activeMember = TEAM_3D[currentTeamIndex];
  const prevMember = TEAM_3D[(currentTeamIndex - 1 + TEAM_3D.length) % TEAM_3D.length];
  const nextMember = TEAM_3D[(currentTeamIndex + 1) % TEAM_3D.length];

  useEffect(() => {
    if (typeof window === "undefined") return;

    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
     
      const revealSections = document.querySelectorAll(`.${styles.staggerBlock}`);
      revealSections.forEach((sec) => {
        const items = sec.querySelectorAll(`.${styles.staggerItem}`);
        gsap.fromTo(
          items,
          { opacity: 0, y: 35, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── ৩. হিরো লেন্স এক্সপেনশন ──
      if (heroLensRef.current && heroImgRef.current) {
        gsap.fromTo(
          heroLensRef.current,
          { clipPath: "inset(14% 8% 14% 8% round 40px)", scale: 0.94 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroLensRef.current,
              start: "top 80%",
              end: "bottom 95%",
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          heroImgRef.current,
          { scale: 1.2, yPercent: -8 },
          {
            scale: 1.05,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: heroLensRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          }
        );
      }

      
      if (isDesktop && pillarsWrapRef.current) {
        const pillars = gsap.utils.toArray<HTMLElement>(`.${styles.pillarBox}`);
        pillars.forEach((pillar, i) => {
          const shift = i % 2 === 0 ? -90 : 80;
          gsap.fromTo(
            pillar,
            { y: shift },
            {
              y: -shift,
              ease: "none",
              scrollTrigger: {
                trigger: pillarsWrapRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });
      }

      
      if (visionRef.current) {
        const stats = { num1: 0, num2: 0 };
        ScrollTrigger.create({
          trigger: visionRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(stats, {
              num1: 300,
              num2: 24,
              duration: 2.2,
              ease: "power3.out",
              onUpdate: () => {
                if (count1Ref.current) count1Ref.current.innerText = `${Math.floor(stats.num1)}+`;
                if (count2Ref.current) count2Ref.current.innerText = `${Math.floor(stats.num2)}%`;
              },
            });
          },
          once: true,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className={styles.page}>
      {/* ── 1. CINEMATIC STUDIO HERO ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroGridContainer}>
          <div className={`${styles.heroLeftCol} ${styles.staggerBlock}`}>
            <div className={`${styles.heroBadge} ${styles.staggerItem}`}>
              <Sparkles size={13} className={styles.sparkle} />
              <span>Digital Transformation Studio</span>
            </div>

            <h1 className={`${styles.heroHeadline} ${styles.staggerItem}`}>
              Fueling Minds. <br />
              <span className={styles.gradientText}>Inspiring Designs..</span>
            </h1>
          </div>

          <div className={`${styles.heroRightCol} ${styles.staggerBlock}`}>
            <div className={`${styles.studioMetaBox} ${styles.staggerItem}`}>
              <div className={styles.metaLiveRow}>
                <span className={styles.livePulseDot} />
                <span className={styles.liveStatusText}>Available for Global Ventures &bull; 2026</span>
              </div>

              <p className={styles.heroLeadBio}>
                We collaborate with ambitious founders and fast-moving enterprises to architect
                scalable digital products, robust design systems, and engaging web platforms.
              </p>

              <div className={styles.metaSubStats}>
                <div>
                  <span className={styles.miniStatNum}>08+</span>
                  <span className={styles.miniStatLabel}>Years of Innovation</span>
                </div>
                <div>
                  <span className={styles.miniStatNum}>100%</span>
                  <span className={styles.miniStatLabel}>Independent & Driven</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parallax Expanding Lens Canvas */}
        <div className={styles.lensWrapper}>
          <div ref={heroLensRef} className={styles.heroLens}>
            <div ref={heroImgRef} className={styles.heroInnerImg}>
              <Image
                src="/Images/services/brand-design.png"
                alt="Zenvy Workspace and Creative Culture"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className={styles.lensShadow} />
            </div>

            <div className={styles.lensFloatingBadge}>
              <div className={styles.radarDot} />
              <span>Studio Workspace &bull; Dhaka / Worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EXCELLENCE STATEMENT ── */}
      <section ref={excellenceRef} className={styles.excellenceSection}>
        <div className={`${styles.excellenceInner} ${styles.staggerBlock}`}>
          <div className={styles.excellenceLeft}>
            <span className={`${styles.sectionIndex} ${styles.staggerItem}`}>[ 01 &mdash; CORE ESSENCE ]</span>
            <h2 className={`${styles.excellenceTitle} ${styles.staggerItem}`}>
              Zenvy Excellence <br />
              <span className={styles.limeText}>Through Innovation.</span>
            </h2>
          </div>

          <div className={styles.excellenceRight}>
            <p className={`${styles.leadCopy} ${styles.staggerItem}`}>
              At Zenvy, our journey is fired by passion&mdash;our core spark.
              The secret to our innovation and success? It&apos;s the fusion of relentless
              dedication, a heart that beats for design, and an obsession to build useful technology.
            </p>

            <p className={`${styles.subCopy} ${styles.staggerItem}`}>
              From seed-stage startups to established enterprises, we engineer modern interfaces,
              SaaS architectures, and intuitive brand experiences that command respect.
            </p>

            <div className={styles.staggerItem}>
              <Link href="/work" className={styles.primaryActionBtn}>
                <span>Discover our work</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PARALLAX 3D CULTURE PILLARS (PERFECTED SHAPE & RESPONSIVE) ── */}
      <section ref={pillarsWrapRef} className={styles.pillarsSection}>
        <div className={styles.pillarsTrack}>
          {GALLERY_PILLARS.map((col, index) => (
            <div key={index} className={styles.pillarBox}>
              <div className={styles.pillarCard}>
                <Image
                  src={col.img}
                  alt={col.label}
                  fill
                  sizes="(max-width: 768px) 65vw, 18vw"
                  className={styles.pillarPhoto}
                />
                <div className={styles.pillarOverlay} />
                <div className={styles.pillarFooter}>
                  <span className={styles.pillarCode}>{col.code}</span>
                  <p className={styles.pillarLabel}>{col.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. VISION & STATS DASHBOARD ── */}
      <section ref={visionRef} className={styles.visionSection}>
        <div className={`${styles.visionTop} ${styles.staggerBlock}`}>
          <span className={`${styles.sectionIndex} ${styles.staggerItem}`}>[ 02 &mdash; OUR VISION ]</span>
          <h2 className={`${styles.visionTitle} ${styles.staggerItem}`}>
            We unite brand, culture and experience to drive tangible impact inside and outside an organisation.
          </h2>
        </div>

        <div className={styles.visionGrid}>
          <div className={styles.visionImageWrapper}>
            <Image
              src="/Images/services/mobile-app-design.jpg"
              alt="Empowering Partnerships"
              fill
              className={styles.visionPhoto}
            />
            <div className={styles.visionImageBadge}>
              <Compass size={18} className={styles.limeText} />
              <span>Human-Centered Product Delivery</span>
            </div>
          </div>

          <div className={`${styles.visionContent} ${styles.staggerBlock}`}>
            <span className={`${styles.sectionIndex} ${styles.staggerItem}`}>EMPOWERING SUCCESS STORIES</span>
            <p className={`${styles.visionParagraph} ${styles.staggerItem}`}>
              Over the years, we&apos;ve propelled numerous businesses to thrive,
              maintaining robust partnerships through our transparent, collaborative approach.
            </p>

            <div className={styles.statsCardsRow}>
              <div className={`${styles.statBox} ${styles.staggerItem}`}>
                <span ref={count1Ref} className={styles.hugeCounter}>0+</span>
                <h4 className={styles.statTitle}>Businesses Thrived</h4>
                <p className={styles.statDesc}>
                  We helped more than 300 business achieve ambitious market scale.
                </p>
              </div>

              <div className={`${styles.statBox} ${styles.staggerItem}`}>
                <span ref={count2Ref} className={styles.hugeCounter}>0%</span>
                <h4 className={styles.statTitle}>Accumulated over $1B</h4>
                <p className={styles.statDesc}>
                  Total market capitalization unlocked across client portfolios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. EDITORIAL VALUES ACCORDION ── */}
      <section ref={valuesRef} className={styles.valuesSection}>
        <div className={styles.valuesInner}>
          <div className={`${styles.valuesSidebar} ${styles.staggerBlock}`}>
            <span className={`${styles.sectionIndex} ${styles.staggerItem}`}>[ 03 &mdash; VALUES ]</span>
            <h3 className={`${styles.valuesHeadline} ${styles.staggerItem}`}>Values That<br />Set Us Apart.</h3>
          </div>

          <div className={`${styles.valuesList} ${styles.staggerBlock}`}>
            <div className={`${styles.valueRow} ${styles.staggerItem}`}>
              <span className={styles.valNum}>01</span>
              <div className={styles.valInfo}>
                <h4 className={styles.valTitle}>Transparent Communication</h4>
                <p className={styles.valText}>
                  We prioritize open dialogue, ensuring partners are informed at every turn.
                  Clarity breeds trust and speeds up execution.
                </p>
              </div>
            </div>

            <div className={`${styles.valueRow} ${styles.staggerItem}`}>
              <span className={styles.valNum}>02</span>
              <div className={styles.valInfo}>
                <h4 className={styles.valTitle}>Precision Management</h4>
                <p className={styles.valText}>
                  Our meticulous planning and execution ensure project velocity. Deadlines are respected,
                  and technical hurdles are solved with foresight.
                </p>
              </div>
            </div>

            <div className={`${styles.valueRow} ${styles.staggerItem}`}>
              <span className={styles.valNum}>03</span>
              <div className={styles.valInfo}>
                <h4 className={styles.valTitle}>Meticulous Detail</h4>
                <p className={styles.valText}>
                  We obsess over micron-level details, from micro-interactions to server responsiveness.
                  Form always enhances function.
                </p>
              </div>
            </div>

            <div className={`${styles.valueRow} ${styles.staggerItem}`}>
              <span className={styles.valNum}>04</span>
              <div className={styles.valInfo}>
                <h4 className={styles.valTitle}>Innovative Excellence</h4>
                <p className={styles.valText}>
                  We push creative frontiers rather than imitating trends. Every design is built to stand out
                  and stay memorable for years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INTERACTIVE 3D AWARDS ARENA ── */}
      <section className={styles.awardsArena}>
        <div className={styles.awardsBackdrop}>
          <span className={styles.watermarkTop}>Achieved</span>
          <div className={styles.chromaticOrb} />
          <span className={styles.watermarkBottom}>Awards</span>
        </div>

        <div className={styles.awardsCardsGrid}>
          {AWARDS.map((award, idx) => (
            <div
              key={award.id}
              className={`${styles.awardBentoCard} ${activeAward === idx ? styles.awardActive : ""}`}
              onMouseEnter={() => setActiveAward(idx)}
            >
              <div className={styles.bentoHeader}>
                <div className={styles.awardIconCircle}>
                  <Award size={24} />
                </div>
                <span className={styles.awardYearBadge}>{award.year}</span>
              </div>

              <div className={styles.bentoFooter}>
                <h4 className={styles.bentoTitle}>{award.name}</h4>
                <p className={styles.bentoDetail}>{award.detail}</p>
                <div className={styles.bentoArrow}>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. 3D INTERACTIVE TEAM SHOWCASE STAGE ── */}
      <section className={styles.team3DSection}>
        <div className={styles.team3DContainer}>
          <div className={styles.team3DHeader}>
            <span className={styles.sectionIndex}>[ 04 &mdash; LEADERSHIP & CREATORS ]</span>
            <h2 className={styles.team3DHeading}>
              Architects of the <span className={styles.limeText}>Experience.</span>
            </h2>
          </div>

          <div className={styles.stageArea}>
            <div 
              className={styles.dynamicBackdropGlow}
              style={{ background: `radial-gradient(circle, ${activeMember.accentColor}30 0%, transparent 65%)` }}
            />

            <div className={styles.stageWatermark}>
              <span>{activeMember.name.split(" ")[0]}</span>
            </div>

            <div className={styles.stageViewport}>
              <div className={`${styles.sideFigure} ${styles.sideLeft}`} onClick={handlePrevTeam}>
                <div className={styles.figureWrap}>
                  <Image
                    src={prevMember.img}
                    alt={prevMember.name}
                    fill
                    className={styles.figurePhoto}
                    sizes="220px"
                  />
                </div>
              </div>

              <div className={styles.mainFigure} key={activeMember.id}>
                <div className={styles.figureWrap}>
                  <Image
                    src={activeMember.img}
                    alt={activeMember.name}
                    fill
                    priority
                    className={styles.figurePhotoMain}
                    sizes="(max-width: 768px) 85vw, 440px"
                  />
                </div>
                <div className={styles.figureShadow} />
              </div>

              <div className={`${styles.sideFigure} ${styles.sideRight}`} onClick={handleNextTeam}>
                <div className={styles.figureWrap}>
                  <Image
                    src={nextMember.img}
                    alt={nextMember.name}
                    fill
                    className={styles.figurePhoto}
                    sizes="220px"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stageControlsBar}>
            <div className={styles.memberMetaInfo}>
              <span className={styles.memberRoleBadge} style={{ color: activeMember.accentColor }}>
                {activeMember.role}
              </span>
              <h3 className={styles.memberDisplayName}>{activeMember.name}</h3>
              <p className={styles.memberBioText}>{activeMember.bio}</p>
            </div>

            <div className={styles.navButtonGroup}>
              <button onClick={handlePrevTeam} className={styles.circleNavBtn} aria-label="Previous Team Member">
                <ArrowLeft size={18} />
              </button>
              <button onClick={handleNextTeam} className={styles.circleNavBtn} aria-label="Next Team Member">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CAREERS CIRCLE WHEEL BANNER ── */}
      <section className={styles.careersArena}>
        <div className={styles.careersContainer}>
          <div className={styles.careersWheelSide}>
            <div className={styles.revolvingRing}>
              <svg viewBox="0 0 200 200" className={styles.ringSvg}>
                <path
                  id="ringCurve"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  fill="transparent"
                />
                <text className={styles.ringText}>
                  <textPath href="#ringCurve">
                    &bull; JOIN OUR TEAM &bull; DEFINE THE FUTURE &bull; ZENVY SQUAD
                  </textPath>
                </text>
              </svg>
            </div>

            <div className={styles.circleImageWindow}>
              <Image
                src="/Images/services/brand-design.png"
                alt="Culture at Zenvy"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className={styles.careersContentSide}>
            <span className={styles.sectionIndex}>[ 05 &mdash; CAREER OPPORTUNITIES ]</span>
            <h2 className={styles.careersHeadline}>
              Grow, create, and lead with Zenvy.
            </h2>
            <p className={styles.careersLead}>
              Choose Zenvy to embrace your skills and passion. We are your growth partner,
              encouraging autonomy, individual development, and high-standard craftsmanship.
            </p>
            <Link href="/contact" className={styles.joinSquadBtn}>
              <span>Join Our Team</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}