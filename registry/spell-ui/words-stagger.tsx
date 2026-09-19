'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react'
import { cn } from '@/lib/utils'

type WordsStaggerProps = {
  children: ReactNode
  className?: string
  /** Render as a headline tag instead of a div (default 'div'). */
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'
  id?: string
  /** Base delay before the stagger starts, in seconds. */
  delay?: number
  /** Stagger between words, in seconds. */
  stagger?: number
  /** Transition duration per word, in seconds. */
  duration?: number
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
 * WordsStagger — zero-dependency word-by-word scroll reveal.
 *
 * Plain-string children are split word-by-word with a fade + rise stagger.
 * Any other children reveal as a single block.
 *
 * ```tsx
 * import { WordsStagger } from "@/registry/spell-ui/words-stagger";
 * <WordsStagger className="text-2xl md:text-3xl font-[550] tracking-tight max-w-[600px]">
 *   Spell UI is an open source collection of elegant, user friendly
 *   components that seamlessly integrate with frameworks and AI models.
 * </WordsStagger>
 * ```
 */
export function WordsStagger({
  children,
  className,
  as = 'div',
  id,
  delay = 0,
  stagger = 0.06,
  duration = 0.7,
  y = 12,
  once = true,
  style,
}: WordsStaggerProps) {
  const ref = useRef<HTMLElement | null>(null)
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
  const Tag = as as 'div'

  if (words) {
    return (
      <Tag
        ref={ref as Ref<HTMLDivElement>}
        id={id}
        className={cn('inline-block', className)}
        style={style}
        aria-label={children as string}
        role="text"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="inline-block will-change-[opacity,transform]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0px)' : `translateY(${y}px)`,
              transitionProperty: 'opacity, transform',
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
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      id={id}
      className={cn('will-change-[opacity,transform]', className)}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : `translateY(${y}px)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: ease,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Tag>
  )
}

export default WordsStagger
