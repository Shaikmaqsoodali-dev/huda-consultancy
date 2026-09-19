'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Adds .is-visible to .reveal elements on scroll into view. Runs on every route change. */
export default function RevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
