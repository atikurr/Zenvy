'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function GSAPInit() {
  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    // ── Generic reveal animations ────────────
    const initReveal = () => {
      const reveals = document.querySelectorAll('.reveal')
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }

    // ── Stats countup ────────────────────────
    const initCountup = () => {
      const statEls = document.querySelectorAll('[data-countup]')
      statEls.forEach((el) => {
        const target = parseInt(el.getAttribute('data-countup') || '0')
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              snap: { val: 1 },
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toString()
              },
            })
          },
        })
      })
    }

    // ── Stagger cards ────────────────────────
    const initStagger = () => {
      const groups = document.querySelectorAll('[data-stagger]')
      groups.forEach((group) => {
        const children = group.querySelectorAll('[data-stagger-item]')
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'back.out(1.4)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
              once: true,
            },
          }
        )
      })
    }

    // ── Magnetic CTA button ──────────────────
    const initMagnetic = () => {
      const magBtn = document.querySelector('#magnetic-cta')
      if (!magBtn) return

      const xTo = gsap.quickTo(magBtn, 'x', {
        duration: 0.4,
        ease: 'power3',
      })
      const yTo = gsap.quickTo(magBtn, 'y', {
        duration: 0.4,
        ease: 'power3',
      })

      magBtn.addEventListener('mousemove', (e: Event) => {
        const ev = e as MouseEvent
        const rect = (magBtn as HTMLElement).getBoundingClientRect()
        xTo((ev.clientX - rect.left - rect.width / 2) * 0.35)
        yTo((ev.clientY - rect.top - rect.height / 2) * 0.35)
      })

      magBtn.addEventListener('mouseleave', () => {
        xTo(0)
        yTo(0)
      })
    }

    // Init all
    setTimeout(() => {
      initReveal()
      initCountup()
      initStagger()
      initMagnetic()
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      lenis.destroy()
      ScrollTrigger.killAll()
    }
  }, [])

  return null
}