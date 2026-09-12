import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Palette,
  Layout,
  BarChart3,
  Megaphone,
  Code2,
  Smartphone,
} from 'lucide-react'
import { notFound } from 'next/navigation'
import styles from './ServiceDetailPage.module.css'

type Service = {
  id: string
  number: string
  title: string
  slug: string
  description: string
  icon: string
  tags: string[]
  order: number
  visible: boolean
  createdAt: string
  updatedAt: string
}

type ServiceResponse = {
  success: boolean
  data?: Service
  error?: string
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/* ─────────────────────────────────────────────
   SERVICE ICON
───────────────────────────────────────────── */

function ServiceIcon({
  icon,
  size = 28,
}: {
  icon: string
  size?: number
}) {
  switch (icon?.toLowerCase()) {
    case 'palette':
      return <Palette size={size} strokeWidth={1.6} />

    case 'layout':
      return <Layout size={size} strokeWidth={1.6} />

    case 'chart':
      return <BarChart3 size={size} strokeWidth={1.6} />

    case 'megaphone':
      return <Megaphone size={size} strokeWidth={1.6} />

    case 'code':
      return <Code2 size={size} strokeWidth={1.6} />

    case 'smartphone':
      return <Smartphone size={size} strokeWidth={1.6} />

    default:
      return <Code2 size={size} strokeWidth={1.6} />
  }
}

/* ─────────────────────────────────────────────
   GET SERVICE
───────────────────────────────────────────── */

async function getService(
  slug: string
): Promise<Service | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/services/${encodeURIComponent(slug)}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      return null
    }

    const result: ServiceResponse =
      await response.json()

    if (!result.success || !result.data) {
      return null
    }

    return result.data
  } catch (error) {
    console.error('Service API Error:', error)
    return null
  }
}

/* ─────────────────────────────────────────────
   PARAMS
───────────────────────────────────────────── */

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

/* ─────────────────────────────────────────────
   METADATA
───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const service = await getService(slug)

  if (!service) {
    return {
      title: 'Service Not Found | Zenvy.',
      description:
        'The requested Zenvy service could not be found.',
    }
  }

  return {
    title: `${service.title} | Zenvy.`,
    description: service.description,
  }
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default async function ServiceDetailPage({
  params,
}: PageProps) {
  const { slug } = await params

  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const processSteps = [
    {
      number: '01',
      title: 'Discover',
      text: 'Understand your goals, audience and business challenges.',
    },
    {
      number: '02',
      title: 'Strategy',
      text: 'Turn insights into a clear creative and execution plan.',
    },
    {
      number: '03',
      title: 'Create',
      text: 'Design and build an experience focused on quality and results.',
    },
    {
      number: '04',
      title: 'Launch',
      text: 'Ship, measure and continuously improve the final product.',
    },
  ]

  return (
    <main className={styles.page}>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}

      <section className={styles.hero}>
        <div
          className={styles.heroGlow}
          aria-hidden="true"
        />

        <div className={styles.container}>

          <Link
            href="/services"
            className={styles.backLink}
          >
            <ArrowLeft size={15} />
            All Services
          </Link>

          <div className={styles.heroMeta}>
            <div className={styles.iconBox}>
              <ServiceIcon icon={service.icon} />
            </div>

            <span className={styles.serviceNumber}>
              {service.number}
            </span>
          </div>

          <h1 className={styles.heroTitle}>
            {service.title}
          </h1>

          <p className={styles.heroDescription}>
            {service.description}
          </p>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT WE DELIVER
      ═══════════════════════════════════════ */}

      <section className={styles.delivery}>
        <div className={styles.container}>

          <div className={styles.deliveryGrid}>

            {/* Left */}

            <div>
              <span className={styles.sectionLabel}>
                What We Deliver
              </span>

              <h2 className={styles.sectionTitle}>
                Built around your{' '}
                <span>goals.</span>
              </h2>

              <p className={styles.sectionDescription}>
                We combine strategy, creativity and
                technology to create digital experiences
                that are designed to make a real business
                impact.
              </p>
            </div>

            {/* Right */}

            <div className={styles.tagsList}>
              {service.tags.map((tag, index) => (
                <div
                  key={tag}
                  className={styles.tagItem}
                >
                  <div className={styles.checkIcon}>
                    <Check size={15} />
                  </div>

                  <span className={styles.tagName}>
                    {tag}
                  </span>

                  <span className={styles.tagNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════ */}

      <section className={styles.process}>
        <div className={styles.container}>

          <div className={styles.processHeader}>

            <div>
              <span className={styles.sectionLabel}>
                Our Process
              </span>

              <h2 className={styles.processTitle}>
                From idea
                <br />
                to <span>impact.</span>
              </h2>
            </div>

            <p className={styles.processDescription}>
              A focused process designed to keep
              projects clear, efficient and moving
              forward.
            </p>

          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <div
                key={step.number}
                className={styles.processCard}
              >
                <span className={styles.processNumber}>
                  {step.number}
                </span>

                <h3 className={styles.processCardTitle}>
                  {step.title}
                </h3>

                <p className={styles.processCardText}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}

      <section className={styles.cta}>
        <div className={styles.ctaInner}>

          <span className={styles.sectionLabel}>
            Have a project in mind?
          </span>

          <h2 className={styles.ctaTitle}>
            Let&apos;s build
            <br />
            something <span>great.</span>
          </h2>

          <Link
            href="/contact"
            className={styles.ctaButton}
          >
            Start a Project
            <ArrowUpRight size={17} />
          </Link>

        </div>
      </section>

    </main>
  )
}