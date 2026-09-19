'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Homepage hero background slider (6 slides, one per service category).
 *
 * Photos, saved as:
 *   public/hero-slide-reg.jpg   (handshake + Charminar — Business Registration)
 *   public/hero-slide-gst.jpg   (GST blocks + calculator — GST & Taxation)
 *   public/hero-slide-compliance.jpg (compliance books + certificate — Compliance)
 *   public/hero-slide-tm.jpg    (® stamp + scales — Trademark & IP)
 *   public/hero-slide-lic.jpg   (blue binders Trade/Shop/FSSAI — Licenses)
 *   public/hero-slide-acct.jpg  (laptop + BOOKKEEPING books — Accounting)
 *
 * Any missing file falls back gracefully to /home-hero.jpg.
 */
const SLIDES = [
  { src: '/hero-slide-reg.jpg', alt: 'Business registration handshake in Hyderabad' },
  { src: '/hero-slide-gst.jpg', alt: 'GST calculation and tax growth charts' },
  { src: '/hero-slide-compliance.jpg', alt: 'ROC compliance filings and statutory registers' },
  { src: '/hero-slide-tm.jpg', alt: 'Trademark registration stamp with IP law books' },
  { src: '/hero-slide-lic.jpg', alt: 'Trade, Shop Act, FSSAI and import-export license binders' },
  { src: '/hero-slide-acct.jpg', alt: 'Bookkeeping, payroll and compliance reports on laptop' },
]

const FALLBACK = '/home-hero.jpg'
const INTERVAL_MS = 6000

export default function HeroSlider() {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<Record<string, boolean>>({})
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const srcFor = useCallback(
    (src: string) => (failed[src] ? FALLBACK : src),
    [failed],
  )

  const go = useCallback(
    (next: number) => {
      setActive(((next % SLIDES.length) + SLIDES.length) % SLIDES.length)
    },
    [],
  )

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length)
    }, INTERVAL_MS)
  }, [])

  useEffect(() => {
    restart()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [restart])

  // Preload + detect missing files so a not-yet-saved slide falls back instead of breaking
  useEffect(() => {
    SLIDES.forEach(({ src }) => {
      const img = new Image()
      img.onerror = () => setFailed((f) => (f[src] ? f : { ...f, [src]: true }))
      img.src = src
    })
  }, [])

  return (
    <div className="hero-slider" aria-hidden="true">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-slide${i === active ? ' is-active' : ''}`}
          aria-hidden={i !== active}
        >
          <img
            src={srcFor(slide.src)}
            alt=""
            fetchPriority={i === 0 ? 'high' : undefined}
            decoding="async"
          />
        </div>
      ))}
      <div className="hero-slider-ui">
        <button
          type="button"
          className="hero-arrow"
          aria-label="Previous slide"
          onClick={() => {
            go(active - 1)
            restart()
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              className={`hero-dot${i === active ? ' is-active' : ''}`}
              onClick={() => {
                go(i)
                restart()
              }}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-arrow"
          aria-label="Next slide"
          onClick={() => {
            go(active + 1)
            restart()
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
