'use client'

import { useEffect, useRef } from 'react'

/** Branded custom cursor: instant dot + smoothly trailing ring that grows over interactive elements.
 *  Only activates on fine-pointer devices without reduced-motion; touch users keep the native cursor. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('has-custom-cursor')

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0

    function onMove(e: MouseEvent) {
      x = e.clientX
      y = e.clientY
      if (rx < -50) {
        rx = x
        ry = y
      }
      dot?.style.setProperty('transform', `translate(${x}px, ${y}px)`)
      document.body.classList.add('cursor-visible')
      const t = e.target as HTMLElement | null
      const interactive = t?.closest?.(
        'a, button, [role="button"], input, textarea, select, label, summary',
      )
      ring?.classList.toggle('is-hover', Boolean(interactive))
    }

    function loop() {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      ring?.style.setProperty('transform', `translate(${rx}px, ${ry}px)`)
      raf = requestAnimationFrame(loop)
    }

    function onLeave() {
      document.body.classList.remove('cursor-visible')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
      document.body.classList.remove('cursor-visible')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true">
        <span />
      </div>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true">
        <span />
      </div>
    </>
  )
}
