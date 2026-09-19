'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/animated-button'
import { cn } from '@/lib/utils'

export type Certificate = {
  src: string
  title: string
  issuer: string
}

/**
 * Certificates we deliver for clients — artwork lives in public/certs/.
 */
const CERTIFICATES: Certificate[] = [
  { src: '/certs/cert-udyam.jpg', title: 'Udyam Registration', issuer: 'Ministry of MSME' },
  { src: '/certs/cert-firm.jpg', title: 'Firm Registration', issuer: 'Govt. of Telangana' },
  { src: '/certs/cert-incorporation.jpg', title: 'Certificate of Incorporation', issuer: 'Ministry of Corporate Affairs' },
  { src: '/certs/cert-partnership.jpg', title: 'Partnership Firm Registration', issuer: 'Govt. of Telangana' },
  { src: '/certs/cert-gst.jpg', title: 'GST Registration', issuer: 'CBIC, Govt. of India' },
  { src: '/certs/cert-dsc.jpg', title: 'Digital Signature', issuer: 'Licensed Certifying Authority' },
  { src: '/certs/cert-shops.jpg', title: 'Shops & Establishments', issuer: 'Labour Dept., Telangana' },
  { src: '/certs/cert-fssai.jpg', title: 'FSSAI Licence', issuer: 'Food Safety Authority of India' },
  { src: '/certs/cert-trade.jpg', title: 'Trade Licence', issuer: 'GHMC, Hyderabad' },
]

const INTERVAL_MS = 5000
const ease = 'cubic-bezier(.22,1,.36,1)'

/** 3D coverflow certificate slider — arrows, dots, autoplay, keyboard. */
export default function CertificateSlider({
  certificates = CERTIFICATES,
  tone = 'light',
}: {
  certificates?: Certificate[]
  /** Use 'dark' on deep-blue backgrounds for light caption text. */
  tone?: 'light' | 'dark'
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState<Record<string, boolean>>({})
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = certificates.length

  const go = useCallback(
    (next: number) => {
      setActive(((next % count) + count) % count)
    },
    [count],
  )

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
    if (paused || count < 2) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % count)
    }, INTERVAL_MS)
  }, [paused, count])

  useEffect(() => {
    restart()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [restart])

  if (count === 0) return null

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative mx-auto h-[380px] max-w-5xl sm:h-[440px] md:h-[500px]"
        style={{ perspective: '1600px' }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Certificates and licences"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            go(active - 1)
            restart()
          } else if (e.key === 'ArrowRight') {
            go(active + 1)
            restart()
          }
        }}
      >
        {certificates.map((cert, i) => {
          let offset = (i - active) % count
          if (offset > count / 2) offset -= count
          if (offset < -count / 2) offset += count
          const abs = Math.abs(offset)
          const visible = abs <= 2
          return (
            <figure
              key={cert.src}
              aria-hidden={offset !== 0}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${cert.title}`}
              onClick={() => {
                if (offset !== 0) {
                  go(i)
                  restart()
                }
              }}
              className={cn(
                'absolute left-1/2 top-1/2 aspect-[3/4] w-[min(62vw,240px)] sm:w-[280px] md:w-[320px]',
                offset !== 0 && 'cursor-pointer',
              )}
              style={{
                opacity: visible ? 1 : 0,
                transform: `translate(-50%, -50%) translateX(${offset * 62}%) rotateY(${offset * -38}deg) scale(${1 - abs * 0.12})`,
                filter: visible && abs > 0 ? `brightness(${1 - abs * 0.08})` : undefined,
                transformStyle: 'preserve-3d',
                zIndex: count - abs,
                transitionProperty: 'opacity, transform',
                transitionDuration: '0.7s',
                transitionTimingFunction: ease,
                pointerEvents: visible ? undefined : 'none',
                willChange: 'opacity, transform',
              }}
            >
              {failed[cert.src] ? (
                <span className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-6 text-center shadow-xl">
                  <span className="text-base font-bold tracking-tight">{cert.title}</span>
                  <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                  <span className="mt-2 font-mono text-[11px] text-muted-foreground">{cert.src}</span>
                </span>
              ) : (
                <img
                  src={cert.src}
                  alt={`${cert.title} — ${cert.issuer}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={() => setFailed((f) => (f[cert.src] ? f : { ...f, [cert.src]: true }))}
                  className="h-full w-full rounded-lg border border-border bg-white object-contain shadow-xl"
                />
              )}
              <figcaption className="sr-only">{cert.title} — {cert.issuer}</figcaption>
            </figure>
          )
        })}
        <button
          type="button"
          aria-label="Previous certificate"
          onClick={() => {
            go(active - 1)
            restart()
          }}
          className="absolute left-1 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow transition-colors hover:bg-muted sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next certificate"
          onClick={() => {
            go(active + 1)
            restart()
          }}
          className="absolute right-1 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow transition-colors hover:bg-muted sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className={cn('mt-4 text-center text-sm font-semibold', tone === 'dark' && 'text-white')} aria-live="polite">
        {certificates[active].title}
        <span className={cn('block text-xs font-normal text-muted-foreground', tone === 'dark' && 'text-white/60')}>{certificates[active].issuer}</span>
      </p>
      <div className="mt-3 flex items-center justify-center gap-4">
        <span className={cn('font-mono text-xs text-muted-foreground', tone === 'dark' && 'text-white/60')}>
          {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
        <div className="flex gap-2" role="tablist" aria-label="Certificates">
          {certificates.map((cert, i) => (
            <button
              key={cert.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to certificate ${i + 1}: ${cert.title}`}
              onClick={() => {
                go(i)
                restart()
              }}
              className={cn(
                'h-2 rounded-full transition-all',
                i === active ? (tone === 'dark' ? 'w-8 bg-white' : 'w-8 bg-primary') : tone === 'dark' ? 'w-2 bg-white/25 hover:bg-white/60' : 'w-2 bg-border hover:bg-muted-foreground',
              )}
              style={{ transitionTimingFunction: ease, transitionDuration: '0.4s' }}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <AnimatedButton asChild glow uppercase rounded="custom" borderRadius="100px" shimmerColor="#8f9bff" shimmerDuration="3s">
          <Link href="/contact">Get yours done <ArrowRight className="h-4 w-4" /></Link>
        </AnimatedButton>
      </div>
    </div>
  )
}
