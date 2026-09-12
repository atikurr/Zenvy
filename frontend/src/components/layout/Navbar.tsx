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
  ArrowUpRight,
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const pathname = usePathname()
  const LIME = '#DFFF1A'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false)
      setMenuOpen(false)
      setMobileServicesOpen(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [pathname])

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '84px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '10px 20px' : '14px 24px',
            borderRadius: 999,
            backgroundColor: scrolled
              ? 'rgba(10, 10, 14, 0.85)'
              : 'rgba(10, 10, 14, 0.45)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: scrolled
              ? '1px solid rgba(223, 255, 26, 0.25)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: scrolled
              ? '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(223, 255, 26, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
              : '0 10px 30px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'auto',
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
                width: 32,
                height: 32,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${LIME} 0%, #b4db00 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 900,
                fontSize: 15,
                boxShadow: '0 4px 14px rgba(223, 255, 26, 0.4)',
              }}
            >
              Z
            </div>

            <span
              style={{
                fontWeight: 800,
                fontSize: 21,
                color: '#fff',
                letterSpacing: '-0.03em',
              }}
            >
              Zenvy<span style={{ color: LIME }}>.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex"
            style={{
              gap: '6px',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '4px 8px',
              borderRadius: 999,
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <button
                style={{
                  background: menuOpen
                    ? 'rgba(223, 255, 26, 0.08)'
                    : 'transparent',
                  color: menuOpen ? LIME : '#d4d4d8',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 999,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'all 0.2s ease',
                }}
              >
                Services
                <ChevronDown
                  size={14}
                  style={{
                    transform: menuOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </button>

              {/* Mega Menu */}
              {menuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 18px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '880px',
                    maxWidth: '92vw',
                    background: 'rgba(12, 12, 16, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: 24,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    padding: '28px',
                    gap: '24px',
                    boxShadow:
                      '0 30px 70px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(223, 255, 26, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        padding: '12px',
                        borderRadius: 16,
                        background: 'rgba(255, 255, 255, 0.015)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                      }}
                    >
                      <Link
                        href={`/services/${srv.slug}`}
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'center',
                          textDecoration: 'none',
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: 'rgba(223, 255, 26, 0.1)',
                            border: '1px solid rgba(223, 255, 26, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: LIME,
                            flexShrink: 0,
                          }}
                        >
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
                              color: '#71717a',
                              marginTop: 2,
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
                          gap: 2,
                          paddingLeft: 4,
                        }}
                      >
                        {srv.items.map((item) => (
                          <Link
                            key={item}
                            href={`/services/${srv.slug}`}
                            className="service-link-item"
                            style={{
                              fontSize: 11,
                              color: '#a1a1aa',
                              textDecoration: 'none',
                              padding: '5px 8px',
                              borderRadius: 6,
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

            {['Work', 'About', 'Pricing', 'Blog'].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  fontSize: 13,
                  color: '#d4d4d8',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              className="hidden lg:flex"
              style={{
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: '#a1a1aa',
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: LIME,
                    boxShadow: `0 0 10px ${LIME}`,
                  }}
                />
                Available now
              </div>

              <Link
                href="/contact"
                style={{
                  fontSize: 12,
                  color: '#fff',
                  padding: '7px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 999,
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                Let&apos;s talk
              </Link>
            </div>

            <Link
              href="/contact"
              className="hidden md:flex"
              style={{
                fontSize: 12,
                fontWeight: 800,
                padding: '9px 20px',
                borderRadius: 999,
                background: LIME,
                color: '#000',
                textDecoration: 'none',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 0 20px rgba(223, 255, 26, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              Start Project
              <ArrowUpRight size={15} />
            </Link>

            {/* Mobile Toggle Button (Visible strictly on mobile/tablet) */}
            <button
              className="flex md:hidden items-center justify-center p-2 rounded-full cursor-pointer text-white background-color: color-mix(in oklab, var(--color-white) /* #fff = #ffffff */ 6%, transparent) border border-white/[0.12] transition-colors hover:bg-white/[0.12]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          RESPONSIVE 3D MOBILE MENU OVERLAY & DRAWER (< 768px)
      ========================================================= */}
      {/* Backdrop Fog */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9997,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Floating 3D Mobile Modal Sheet */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '90px',
          left: '16px',
          right: '16px',
          maxHeight: 'calc(100dvh - 110px)',
          backgroundColor: 'rgba(12, 12, 16, 0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 24,
          border: '1px solid rgba(223, 255, 26, 0.2)',
          boxShadow:
            '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 30px rgba(223,255,26,0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
          zIndex: 9998,
          transform: mobileMenuOpen
            ? 'translateY(0) scale(1)'
            : 'translateY(-20px) scale(0.96)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '24px 20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Services Accordion Button */}
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: 'none',
                border: 'none',
                color: mobileServicesOpen ? LIME : '#fff',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>Our Services</span>
              <ChevronDown
                size={18}
                style={{
                  transform: mobileServicesOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease',
                  color: mobileServicesOpen ? LIME : '#71717a',
                }}
              />
            </button>

            {/* Accordion Content */}
            {mobileServicesOpen && (
              <div
                style={{
                  padding: '0 16px 16px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 12,
                }}
              >
                {services.map((srv) => (
                  <Link
                    key={srv.id}
                    href={`/services/${srv.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '10px',
                      borderRadius: 12,
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div style={{ color: LIME }}>{srv.icon}</div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#fff',
                      }}
                    >
                      {srv.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Core Page Links */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10,
            }}
          >
            {['Work', 'About', 'Pricing', 'Blog'].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '14px',
                  borderRadius: 14,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#e4e4e7',
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Quick Contact & Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 14,
              background: 'rgba(223, 255, 26, 0.04)',
              border: '1px solid rgba(223, 255, 26, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: LIME,
                  boxShadow: `0 0 10px ${LIME}`,
                }}
              />
              <span style={{ fontSize: 12, color: '#a1a1aa', fontWeight: 500 }}>
                Available for Q3
              </span>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 12,
                color: '#fff',
                textDecoration: 'underline',
                fontWeight: 600,
              }}
            >
              Let&apos;s talk
            </Link>
          </div>

          {/* Primary Mobile CTA Button */}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: 999,
              background: LIME,
              color: '#000',
              fontWeight: 800,
              fontSize: 14,
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 0 25px rgba(223, 255, 26, 0.3)',
            }}
          >
            Start Your Project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}