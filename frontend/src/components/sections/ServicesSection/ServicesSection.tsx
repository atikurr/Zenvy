import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import styles from './ServicesSection.module.css'

const services = [
  {
    id: 'brand-design',
    num: '01',
    icon: '🎨',
    title: 'Brand Design',
    desc: 'We craft timeless visual identities that make your brand unforgettable — from logo to full brand system.',
    tags: ['Brand Identity', 'Logo Design', 'Brand Strategy'],
    href: '/services/brand-design',
  },
  {
    id: 'ui-ux-design',
    num: '02',
    icon: '🖥️',
    title: 'UI/UX Design',
    desc: 'Research-backed interfaces that users love. From wireframes to pixel-perfect designs that convert.',
    tags: ['UX Research', 'Wireframing', 'Design System'],
    href: '/services/ui-ux-design',
  },
  {
    id: 'seo',
    num: '03',
    icon: '📈',
    title: 'SEO Strategy',
    desc: 'Dominate search rankings with technical SEO, content strategy, and e-commerce optimization.',
    tags: ['Website SEO', 'YouTube SEO', 'E-commerce SEO'],
    href: '/services/seo',
  },
  {
    id: 'digital-marketing',
    num: '04',
    icon: '📣',
    title: 'Digital Marketing',
    desc: 'Scale your brand with data-driven Meta Ads, Google Ads, and social media management.',
    tags: ['Meta Ads', 'Google Ads', 'Social Media'],
    href: '/services/digital-marketing',
  },
  {
    id: 'web-design-development',
    num: '05',
    icon: '💻',
    title: 'Web Design & Dev',
    desc: 'High-performance websites built with Next.js — fast, SEO-ready, and designed to convert visitors.',
    tags: ['Next.js', 'E-commerce', 'SaaS Website'],
    href: '/services/web-design-development',
  },
  {
    id: 'app-design-development',
    num: '06',
    icon: '📱',
    title: 'App Design & Dev',
    desc: 'Mobile-first app experiences for iOS and Android — from prototype to launch.',
    tags: ['iOS', 'Android', 'App Prototype'],
    href: '/services/app-design-development',
  },
]

export function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Top row */}
        <div className={styles.topRow}>
          <div>
            <div className={styles.tag}>
              <span className={styles.tagLine} />
              What We Do
            </div>
            <h2 className={styles.headline}>
              Services Built to{' '}
              <span className={styles.headlineAccent}>
                Grow
              </span>{' '}
              Your Business.
            </h2>
          </div>

          <div>
            <p className={styles.subText}>
              From strategy to execution — we handle everything
              so you can focus on what matters most.
            </p>
            <Link href="/services" className={styles.viewAllBtn}>
              View All Services <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {services.map((srv) => (
            <Link
              key={srv.id}
              href={srv.href}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{srv.icon}</div>
                <span className={styles.cardNum}>{srv.num}</span>
              </div>

              <div className={styles.cardTitle}>{srv.title}</div>
              <div className={styles.cardDesc}>{srv.desc}</div>

              <div className={styles.cardTags}>
                {srv.tags.map((tag) => (
                  <span key={tag} className={styles.cardTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.cardArrow}>
                <ArrowUpRight size={14} color="#000" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}