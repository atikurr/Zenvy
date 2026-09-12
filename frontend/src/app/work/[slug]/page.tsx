import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Globe, CheckCircle2 } from "lucide-react";
import styles from "./CaseStudy.module.css";

type ProjectDetail = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  category: string;
  timeline: string;
  servicesProvided: string[];
  liveUrl?: string;
  heroImage: string;
  about: string;
  scope: string[];
  challenge: string;
  solution: string;
  colors: { name: string; hex: string; bg: string; text: string }[];
  gallery: string[];
  nextProject?: { title: string; slug: string };
};

const projectsData: Record<string, ProjectDetail> = {
  boon: {
    slug: "boon",
    title: "Boon — Web Application Design",
    subtitle: "Modern and minimal design solutions for talent tracking.",
    company: "Boon Inc.",
    category: "SaaS Web Platform",
    timeline: "2 Months",
    servicesProvided: ["UX Research", "UI Design", "Design System", "Development"],
    liveUrl: "https://example.com",
    heroImage: "/Images/services/web-design.jpg",
    about:
      "Boon is a modern talent engagement platform built to simplify internal candidate referrals. We crafted a streamlined design architecture reducing applicant review friction by 40%.",
    scope: [
      "Desktop & tablet responsive dashboard interface",
      "Dynamic talent assessment Kanban workflows",
      "Full Figma component token system",
      "Next.js App Router front-end architecture",
    ],
    challenge:
      "Unstructured candidate profiles and heavy data density previously slowed recruiters down and hindered seamless internal referrals.",
    solution:
      "We rebuilt the layout around focused modular cards, legible typography, and quick-glance status indicators that streamline candidate evaluations.",
    colors: [
      { name: "Neon Lime", hex: "#DFFF1A", bg: "#dfff1a", text: "#000000" },
      { name: "Charcoal", hex: "#0E0E12", bg: "#0e0e12", text: "#ffffff" },
      { name: "Slate Grey", hex: "#27272A", bg: "#27272a", text: "#ffffff" },
      { name: "Ghost White", hex: "#F4F4F5", bg: "#f4f4f5", text: "#000000" },
    ],
    gallery: [
      "/Images/services/web-design.jpg",
      "/Images/services/ui-ux-design.png",
      "/Images/services/brand-design.png",
    ],
    nextProject: {
      title: "Abyan Capital Mobile App",
      slug: "abyan-capital",
    },
  },
  "abyan-capital": {
    slug: "abyan-capital",
    title: "Abyan Capital — Trading Mobile App",
    subtitle: "Innovative mobile application facilitating algorithmic asset tracking.",
    company: "Abyan Capital",
    category: "Fintech Mobile App",
    timeline: "3 Months",
    servicesProvided: ["Fintech UX", "Mobile App UI", "Interaction Design"],
    liveUrl: "https://example.com",
    heroImage: "/Images/services/mobile-app-design.jpg",
    about:
      "Abyan Capital provides automated algorithmic wealth management. We designed a frictionless mobile experience for both beginner and seasoned retail investors.",
    scope: [
      "Native iOS & Android UX/UI system",
      "Real-time asset telemetry dashboards",
      "Multi-tier identity verification flow",
      "Smooth micro-interactions and trade haptics",
    ],
    challenge:
      "Presenting high-frequency trading data without cluttering mobile screen real estate or overwhelming everyday retail users.",
    solution:
      "Implemented modular bottom sheets, progressive disclosure of metrics, and clean data typography for rapid comprehension.",
    colors: [
      { name: "Emerald Growth", hex: "#10B981", bg: "#10b981", text: "#000000" },
      { name: "Electric Lime", hex: "#DFFF1A", bg: "#dfff1a", text: "#000000" },
      { name: "Pitch Navy", hex: "#080B11", bg: "#080b11", text: "#ffffff" },
      { name: "Muted Slate", hex: "#94A3B8", bg: "#94a3b8", text: "#000000" },
    ],
    gallery: [
      "/Images/services/mobile-app-design.jpg",
      "/Images/services/brand-design.png",
      "/Images/services/digital-marketing.jpg",
    ],
    nextProject: {
      title: "Boon Web Application",
      slug: "boon",
    },
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getProjectData(slug: string): Promise<ProjectDetail | null> {
  try {
    const res = await fetch(`${API_URL}/api/projects/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.data) return data.data;
    }
  } catch {
    // API unavailable: fallback to local dictionary
  }

  return projectsData[slug] || null;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      {/* Top Bar */}
      <nav className={styles.topBar}>
        <div className={`${styles.container} ${styles.topBarInner}`}>
          <Link href="/#work" className={styles.backBtn}>
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveBtn}
            >
              Live Project
              <Globe size={14} />
            </a>
          )}
        </div>
      </nav>

      <div className={styles.container}>
        {/* Title Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>Case Study — {project.category}</span>
          <h1 className={styles.mainTitle}>{project.title}</h1>
        </header>

        {/* Hero Image */}
        <div className={styles.heroFrame}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className={styles.heroImage}
            sizes="(max-width: 1320px) 100vw, 1320px"
          />
        </div>

        {/* Body Content */}
        <div className={styles.bodyGrid}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.stickyBox}>
              <div className={styles.metaGroup}>
                <span className={styles.metaLabel}>Client</span>
                <h4 className={styles.metaValue}>{project.company}</h4>
              </div>

              <div className={styles.divider} />

              <div className={styles.metaGroup}>
                <span className={styles.metaLabel}>Timeline</span>
                <h4 className={styles.metaValue}>{project.timeline}</h4>
              </div>

              <div className={styles.divider} />

              <div className={styles.metaGroup}>
                <span className={styles.metaLabel}>Capabilities</span>
                <div className={styles.pillGroup}>
                  {project.servicesProvided.map((s) => (
                    <span key={s} className={styles.pill}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Detailed Narrative */}
          <section className={styles.contentArea}>
            {/* About */}
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>About the Project</h2>
              <p className={styles.paragraph}>{project.about}</p>
            </div>

            {/* Scope */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionHeading}>Scope of Execution</h3>
              <div className={styles.scopeGrid}>
                {project.scope.map((item) => (
                  <div key={item} className={styles.scopeItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className={styles.splitBox}>
              <div className={styles.challengeCard}>
                <span className={styles.cardTagRed}>The Challenge</span>
                <p className={styles.paragraph}>{project.challenge}</p>
              </div>

              <div className={styles.solutionCard}>
                <span className={styles.cardTagLime}>The Solution</span>
                <p className={styles.paragraph}>{project.solution}</p>
              </div>
            </div>

            {/* Color Identity */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionHeading}>Color Hierarchy</h3>
              <div className={styles.swatchGrid}>
                {project.colors.map((c) => (
                  <div
                    key={c.name}
                    className={styles.swatch}
                    style={{ backgroundColor: c.bg, color: c.text }}
                  >
                    <span className={styles.swatchLabel}>{c.name}</span>
                    <span className={styles.swatchHex}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Deliverables */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionHeading}>Visual Deliverables</h3>
              <div className={styles.galleryGrid}>
                {project.gallery.map((imgSrc, idx) => (
                  <div key={idx} className={styles.galleryFrame}>
                    <Image
                      src={imgSrc}
                      alt={`${project.title} deliverable ${idx + 1}`}
                      fill
                      className={styles.heroImage}
                      sizes="(max-width: 1080px) 100vw, 850px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Next Project Footer */}
            {project.nextProject && (
              <div className={styles.nextProjectDock}>
                <div>
                  <span className={styles.metaLabel}>Next Case Study</span>
                  <h4 className={styles.metaValue} style={{ fontSize: "22px", marginTop: "4px" }}>
                    {project.nextProject.title}
                  </h4>
                </div>

                <Link
                  href={`/work/${project.nextProject.slug}`}
                  className={styles.nextBtn}
                >
                  View Next Project
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}