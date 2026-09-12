'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Palette,
  Layers,
  Search,
  Megaphone,
  Code,
  Smartphone,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

const services = [
  {
    id: 'brand-design',
    title: 'Brand Design',
    subtitle: 'Crafting Timeless Visuals',
    icon: <Palette size={18} />,
    slug: 'brand-design',
    items: [
      'Brand Identity',
      'Corporate Identity',
      'Brand Strategy',
      'Motion Graphics',
      'Graphic Design',
      'Startup Branding',
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'Crafting Intuitive Experiences',
    icon: <Layers size={18} />,
    slug: 'ui-ux-design',
    items: [
      'UX UI Consulting',
      'UX Audit',
      'UX Research',
      'Usability Testing',
      'Wireframe & Prototype',
      'Design System',
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    subtitle: 'Rank Higher, Grow Faster',
    icon: <Search size={18} />,
    slug: 'seo',
    items: [
      'Website SEO',
      'YouTube SEO',
      'Amazon SEO',
      'Etsy SEO',
      'Shopify SEO',
      'WordPress SEO',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    subtitle: 'Grow Your Brand Online',
    icon: <Megaphone size={18} />,
    slug: 'digital-marketing',
    items: [
      'Social Media',
      'VA Services',
      'Meta Ads',
      'Google Ads',
      'Consultation',
    ],
  },
  {
    id: 'web-design-development',
    title: 'Web Design & Dev',
    subtitle: 'Build & Convert',
    icon: <Code size={18} />,
    slug: 'web-design-development',
    items: [
      'Landing Page',
      'Business Website',
      'E-commerce',
      'SaaS Website',
      'WordPress',
    ],
  },
  {
    id: 'app-design-development',
    title: 'App Design & Dev',
    subtitle: 'Mobile Experiences',
    icon: <Smartphone size={18} />,
    slug: 'app-design-development',
    items: [
      'iOS App Design',
      'Android App Design',
      'UI/UX Design',
      'App Prototype',
    ],
  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pathname = usePathname()

  const LIME = '#DFFF1A'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false)
      setMenuOpen(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '75px',
          backgroundColor: scrolled
            ? 'rgba(5, 5, 5, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          zIndex: 9999,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: LIME,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 900,
            }}
          >
            Z
          </div>

          <span
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: '#fff',
            }}
          >
            Zenvy<span style={{ color: LIME }}>.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex"
          style={{
            gap: '5px',
            alignItems: 'center',
          }}
        >
          <div
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            style={{
              position: 'relative',
              height: '75px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                background: 'transparent',
                color: menuOpen ? LIME : '#fff',
                border: 'none',
                padding: '8px 15px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Services
              <ChevronDown
                size={14}
                style={{
                  transform: menuOpen
                    ? 'rotate(180deg)'
                    : 'none',
                  transition: '0.3s',
                }}
              />
            </button>

            {/* Mega Menu */}
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '840px',
                  maxWidth: '90vw',
                  background: '#0a0a0a',
                  borderRadius: '0 0 16px 16px',
                  border:
                    '1px solid rgba(255,255,255,0.1)',
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(3, 1fr)',
                  padding: '30px',
                  gap: '25px',
                  boxShadow:
                    '0 20px 40px rgba(0,0,0,0.6)',
                }}
              >
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    <Link
                      href={`/services/${srv.slug}`}
                      style={{
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      <div style={{ color: LIME }}>
                        {srv.icon}
                      </div>

                      <div>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          {srv.title}
                        </h4>

                        <p
                          style={{
                            margin: 0,
                            fontSize: 10,
                            color: '#666',
                          }}
                        >
                          {srv.subtitle}
                        </p>
                      </div>
                    </Link>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      {srv.items.map((item) => (
                        <Link
                          key={item}
                          href={`/services/${srv.slug}`}
                          className="service-link-item"
                          style={{
                            fontSize: 11,
                            color: '#888',
                            textDecoration: 'none',
                            padding: '5px 8px',
                            borderRadius: 5,
                          }}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {['Work', 'About', 'Pricing', 'Blog'].map(
            (link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                style={{
                  padding: '8px 15px',
                  textDecoration: 'none',
                  fontSize: 13,
                  color: '#eee',
                  fontWeight: 500,
                }}
              >
                {link}
              </Link>
            )
          )}
        </nav>

        {/* Right Side */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            className="hidden lg:flex"
            style={{
              alignItems: 'center',
              gap: 15,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                color: '#888',
              }}
            >
              <div
                className="blink"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: LIME,
                }}
              />

              Available now
            </div>

            <Link
              href="/contact"
              style={{
                fontSize: 12,
                color: '#fff',
                padding: '6px 14px',
                border:
                  '1px solid rgba(255,255,255,0.2)',
                borderRadius: 100,
                textDecoration: 'none',
              }}
            >
              Let's talk
            </Link>
          </div>

          <Link
            href="/contact"
            className="hidden md:block"
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '10px 22px',
              borderRadius: 100,
              background: LIME,
              color: '#000',
              textDecoration: 'none',
            }}
          >
            Start Project →
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: 5,
            }}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#050505',
          zIndex: 9998,
          transform: mobileMenuOpen
            ? 'translateX(0)'
            : 'translateX(100%)',
          transition:
            'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '100px 30px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          overflowY: 'auto',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: LIME,
              textTransform: 'uppercase',
              marginBottom: 20,
              letterSpacing: 1,
            }}
          >
            Services
          </p>

          <div
            style={{
              display: 'grid',
              gap: 20,
            }}
          >
            {services.map((srv) => (
              <div key={srv.id}>
                <Link
                  href={`/services/${srv.slug}`}
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <span style={{ color: LIME }}>
                    {srv.icon}
                  </span>

                  {srv.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            height: '1px',
            background:
              'rgba(255,255,255,0.1)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {['Work', 'About', 'Pricing', 'Blog'].map(
            (link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                {link}
              </Link>
            )
          )}
        </div>

        <Link
          href="/contact"
          style={{
            background: LIME,
            color: '#000',
            padding: '18px',
            borderRadius: 100,
            textAlign: 'center',
            fontWeight: 800,
            textDecoration: 'none',
            marginTop: 10,
          }}
        >
          Start Project →
        </Link>
      </div>
    </>
  )
}