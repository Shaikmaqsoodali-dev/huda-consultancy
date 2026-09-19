'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type TextLoopProps = {
  words?: string[]
  className?: string
  /** Time each word stays visible in ms (default 2500). */
  interval?: number
}

const DEFAULT_WORDS = ['Grow', 'Start', 'Scale', 'Run']

const ease = 'cubic-bezier(.22,1,.36,1)'

/**
 * TextLoop — zero-dependency rotating word loop.
 *
 * Words crossfade with a rise + de-blur in the same inline slot.
 *
 * ```tsx
 * "use client";
 * import React from "react";
 * import TextLoop from "@/components/text-loop";
 *
 * export default function TextLoopDemo() {
 *   return (
 *     <div className="flex items-center justify-center p-10 h-full w-full bg-white dark:bg-black rounded-md">
 *       <TextLoop />
 *     </div>
 *   );
 * }
 * ```
 */
export function TextLoop({ words = DEFAULT_WORDS, className, interval = 2500 }: TextLoopProps) {
  const [active, setActive] = useState(0)
  const count = words.length

  useEffect(() => {
    if (count < 2) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setActive((a) => (a + 1) % count)
    }, interval)
    return () => clearInterval(id)
  }, [count, interval])

  if (count === 0) return null

  return (
    <span
      className={cn('inline-grid overflow-hidden align-bottom', className)}
      role="text"
      aria-label={words.join(', ')}
    >
      {words.map((word, i) => {
        const isActive = i === active
        return (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="col-start-1 row-start-1 inline-block will-change-[opacity,transform,filter]"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : i < active || (active === 0 && i === count - 1) ? 'translateY(-60%)' : 'translateY(60%)',
              filter: isActive ? 'blur(0px)' : 'blur(6px)',
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '0.55s',
              transitionTimingFunction: ease,
              pointerEvents: 'none',
            }}
          >
            {word}
          </span>
        )
      })}
    </span>
  )
}

export default TextLoop
