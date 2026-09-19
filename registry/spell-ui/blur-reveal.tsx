'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BlurRevealProps = {
  children: ReactNode
  className?: string
  /** Base delay before the reveal starts, in seconds. */
  delay?: number
  /** Stagger between words when children is a plain string, in seconds. */
  stagger?: number
  /** Transition duration per word/block, in seconds. */
  duration?: number
  /** Initial blur radius. */
  blur?: string
  /** Initial vertical offset in px. */
  y?: number
  /** Reveal only the first time the element enters view (default true). */
  once?: boolean
  style?: CSSProperties
}

function isPlainString(children: ReactNode): children is string {
  return typeof children === 'string'
}

/**
 * BlurReveal — zero-dependency scroll reveal.
 *
 * - Plain-string children are split word-by-word with a blur → sharp stagger.
 * - Any other children reveal as a single blurred block.
 *
 * Matches the `spell-ui/blur-reveal` usage:
 * ```tsx
 * import { BlurReveal } from "@/registry/spell-ui/blur-reveal";
 * <BlurReveal className="text-2xl md:text-4xl font-medium tracking-[-.03em]">
 *   You can just ship things.
 * </BlurReveal>
 * ```
 */
export function BlurReveal({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.7,
  blur = '8px',
  y = 12,
  once = true,
  style,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) io.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  const words = useMemo(
    () => (isPlainString(children) ? children.split(/\s+/).filter(Boolean) : null),
    [children]
  )

  const ease = 'cubic-bezier(.22,1,.36,1)'

  if (words) {
    return (
      <div
        ref={ref}
        className={cn('inline-block', className)}
        style={style}
        aria-label={children as string}
        role="text"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="inline-block will-change-[filter,opacity,transform]"
            style={{
              opacity: visible ? 1 : 0,
              filter: visible ? 'blur(0px)' : `blur(${blur})`,
              transform: visible ? 'translateY(0px)' : `translateY(${y}px)`,
              transitionProperty: 'opacity, filter, transform',
              transitionDuration: `${duration}s`,
              transitionTimingFunction: ease,
              transitionDelay: `${delay + i * stagger}s`,
              whiteSpace: 'pre',
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn('will-change-[filter,opacity,transform]', className)}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        filter: visible ? 'blur(0px)' : `blur(${blur})`,
        transform: visible ? 'translateY(0px)' : `translateY(${y}px)`,
        transitionProperty: 'opacity, filter, transform',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: ease,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export default BlurReveal
