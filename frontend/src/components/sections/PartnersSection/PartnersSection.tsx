'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './PartnersSection.module.css'

interface Partner {
  id: string
  name: string
  logo?: string
  website?: string
}

const defaultRow1 = ['Google', 'Shopify', 'Meta', 'Amazon', 'HubSpot', 'Figma', 'Webflow', 'Notion']
const defaultRow2 = ['WordPress', 'Stripe', 'Adobe', 'Slack', 'Mailchimp', 'Zapier', 'Canva', 'Ahrefs']
const defaultRow3 = ['Semrush', 'Klaviyo', 'Wix', 'Squarespace', 'Etsy', 'eBay', 'Dribbble', 'Behance']

function LogoRow({ items, reverse }: { items: Partner[], reverse?: boolean }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div className={styles.rowWrapper}>
      <div className={`${styles.track} ${reverse ? styles.reverse : styles.forward}`}>
        {doubled.map((partner, i) => (
          <div key={i} className={styles.logoChip}>
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={80}
                height={24}
                style={{ objectFit: 'contain', filter: 'brightness(200%) grayscale(100%)' }}
              />
            ) : (
              partner.name
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PartnersSection() {
  const [rows, setRows] = useState<{
    r1: Partner[]
    r2: Partner[]
    r3: Partner[]
  }>({
    r1: defaultRow1.map((name, i) => ({ id: String(i), name })),
    r2: defaultRow2.map((name, i) => ({ id: String(i), name })),
    r3: defaultRow3.map((name, i) => ({ id: String(i), name })),
  })

  
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) return

        const res = await fetch(`${apiUrl}/api/partners`, {
          cache: 'no-store',
        })

        if (!res.ok) return

        const data = await res.json()
        const all: Partner[] = data?.data

        if (!all || all.length === 0) return

        
        const chunk = Math.ceil(all.length / 3)
        setRows({
          r1: all.slice(0, chunk),
          r2: all.slice(chunk, chunk * 2),
          r3: all.slice(chunk * 2),
        })
      } catch {
       
      }
    }

    fetchPartners()
  }, [])

  return (
    <section className={styles.section}>
      <p className={styles.label}>
        Trusted by leading brands & startups worldwide
      </p>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className={styles.rows}>
          <LogoRow items={rows.r1} />
          <LogoRow items={rows.r2} reverse />
          <LogoRow items={rows.r3} />
        </div>
      </div>
    </section>
  )
}