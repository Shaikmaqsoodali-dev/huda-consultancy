'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HighlightedTextProps = {
  children: ReactNode
  className?: string
  /** Class applied to the highlight layer (e.g. custom color). */
  highlightClassName?: string
  /** Base delay before the highlight sweeps in, in seconds. */
  delay?: number
  /** Sweep duration, in seconds. */
  duration?: number
  /** Direction the highlight sweeps from. */
  from?: 'left' | 'right' | 'center'
  /** Animate only the first time the element enters view (default true). */
  once?: boolean
  style?: CSSProperties
}

const ORIGIN: Record<NonNullable<HighlightedTextProps['from']>, string> = {
  left: 'left center',
  right: 'right center',
  center: 'center center',
}

/**
 * HighlightedText — zero-dependency marker-highlight sweep.
 *
 * Renders an inline highlight behind the text that scales in when
 * scrolled into view.
 *
 * ```tsx
 * import { HighlightedText } from "@/registry/spell-ui/highlighted-text";
 * <div className="text-2xl md:text-4xl font-medium tracking-[-.03em] flex items-center">
 *   You&nbsp;<HighlightedText>can</HighlightedText>&nbsp;just&nbsp;
 *   <HighlightedText delay={0.4} from="left">ship things.</HighlightedText>
 * </div>
 * ```
 */
export function HighlightedText({
  children,
  className,
  highlightClassName,
  delay = 0,
  duration = 0.6,
  from = 'left',
  once = true,
  style,
}: HighlightedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
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

  const ease = 'cubic-bezier(.22,1,.36,1)'

  return (
    <span ref={ref} className={cn('relative inline-block px-1', className)} style={style}>
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 rounded-[0.2em] bg-yellow-300/70 dark:bg-yellow-400/30',
          highlightClassName
        )}
        style={{
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: ORIGIN[from],
          transitionProperty: 'transform',
          transitionDuration: `${duration}s`,
          transitionTimingFunction: ease,
          transitionDelay: `${delay}s`,
          willChange: 'transform',
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  )
}

export default HighlightedText
