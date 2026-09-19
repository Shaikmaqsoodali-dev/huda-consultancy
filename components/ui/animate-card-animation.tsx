'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AnimatedCard = {
  tag?: string
  title: string
  text: string
}

type AnimatedCardStackProps = {
  cards?: AnimatedCard[]
  className?: string
  /** Auto-advance the deck (default true). */
  autoPlay?: boolean
  /** Time between advances in ms (default 4000). */
  interval?: number
  /** Visible depth of the stack behind the active card (default 3). */
  depth?: number
  style?: CSSProperties
}

const DEFAULT_CARDS: AnimatedCard[] = [
  {
    tag: 'Business Registration',
    title: 'Start right, from day one',
    text: 'Private Limited, LLP or proprietorship — structure advice, DIN, DSC and incorporation handled end-to-end.',
  },
  {
    tag: 'GST & Taxation',
    title: 'Filings on time, every time',
    text: 'Registration, GSTR-1 / 3B, ITC reconciliation and notice handling with reminders before each due date.',
  },
  {
    tag: 'Compliance & Licenses',
    title: 'Never operate exposed',
    text: 'ROC filings, Shops & Establishment, trade licence and FSSAI — mapped, filed and renewal-tracked.',
  },
  {
    tag: 'Accounting',
    title: 'Books you can act on',
    text: 'Clean monthly bookkeeping, payroll with PF / ESI / TDS, and reports simple enough to decide from.',
  },
]

const ease = 'cubic-bezier(.22,1,.36,1)'

/**
 * AnimatedCardStack — zero-dependency animated card deck.
 *
 * Cards fan out in a 3D stack behind the active card and auto-advance.
 * Click a card, use the arrows, or let it play on its own.
 *
 * ```tsx
 * import AnimatedCardStack from "@/components/ui/animate-card-animation";
 * export default function ScrollGridDemo() {
 *   return (
 *     <div className="flex min-h-screen items-center justify-center p-8">
 *       <AnimatedCardStack />
 *     </div>
 *   );
 * }
 * ```
 */
export function AnimatedCardStack({
  cards = DEFAULT_CARDS,
  className,
  autoPlay = true,
  interval = 4000,
  depth = 3,
  style,
}: AnimatedCardStackProps) {
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const [paused, setPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = cards.length

  const go = useCallback(
    (next: number) => {
      setActive(((next % count) + count) % count)
    },
    [count],
  )

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
    if (!autoPlay || paused || count < 2) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % count)
    }, interval)
  }, [autoPlay, paused, count, interval])

  useEffect(() => {
    restart()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [restart])

  // Entrance: animate the deck in the first time it scrolls into view
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (typeof window === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true)
      return
    }
    if (!('IntersectionObserver' in window)) {
      setEntered(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEntered(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (count === 0) return null

  return (
    <div
      ref={rootRef}
      className={cn('w-full max-w-md', className)}
      style={style}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative mx-auto aspect-[4/4.6] w-full max-w-[380px]"
        style={{ perspective: '1200px' }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Service highlights"
      >
        {cards.map((card, i) => {
          const offset = ((i - active) % count + count) % count
          const isActive = offset === 0
          const inStack = offset <= depth
          // Cards behind the active one: sink back, shrink and fade
          const translateY = isActive ? 0 : Math.min(offset, depth) * 18
          const translateZ = isActive ? 0 : -Math.min(offset, depth) * 70
          const rotate = isActive ? 0 : (i % 2 === 0 ? -1 : 1) * Math.min(offset, depth) * 2.5
          const scale = isActive ? 1 : Math.max(0.82, 1 - Math.min(offset, depth) * 0.06)
          return (
            <article
              key={card.title}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${card.title}`}
              onClick={() => {
                if (!isActive) {
                  go(i)
                  restart()
                }
              }}
              className={cn(
                'absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-7 text-left shadow-xl',
                isActive ? 'cursor-default border-border' : 'cursor-pointer border-border/70',
              )}
              style={{
                opacity: !entered ? 0 : inStack ? 1 - Math.min(offset, depth) * 0.18 : 0,
                transform: !entered
                  ? 'translateY(48px) scale(0.96)'
                  : `translateY(${translateY}px) translateZ(${translateZ}px) rotate(${rotate}deg) scale(${scale})`,
                transitionProperty: 'opacity, transform',
                transitionDuration: '0.7s',
                transitionTimingFunction: ease,
                transitionDelay: !entered ? `${i * 0.08}s` : '0s',
                zIndex: count - offset,
                pointerEvents: !isActive && !inStack ? 'none' : undefined,
                willChange: 'opacity, transform',
              }}
            >
              <div>
                <div className="flex items-start justify-between">
                  {card.tag ? (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {card.tag}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-balance">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.text}</p>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  {isActive ? '● Active' : '○ Tap to view'}
                </span>
                <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${((i + 1) / count) * 100}%` }}
                  />
                </span>
              </div>
            </article>
          )
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous card"
          onClick={() => {
            go(active - 1)
            restart()
          }}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Cards">
          {cards.map((card, i) => (
            <button
              key={card.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to card ${i + 1}: ${card.title}`}
              onClick={() => {
                go(i)
                restart()
              }}
              className={cn(
                'h-2 rounded-full transition-all',
                i === active ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground',
              )}
              style={{ transitionTimingFunction: ease, transitionDuration: '0.4s' }}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next card"
          onClick={() => {
            go(active + 1)
            restart()
          }}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default AnimatedCardStack
