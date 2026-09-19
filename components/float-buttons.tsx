'use client'

import { useEffect, useState } from 'react'
import { CircleArrowUp, MoveUpRight } from 'lucide-react'
import { SITE } from '@/lib/site'

export default function FloatButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const whatsappHref = SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Huda Consultancy, I would like to start a conversation.')}`
    : ''

  return (
    <div className="float-group">
      {whatsappHref && (
        <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4Zm-3.2 3.8c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 3 4.7 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.7 6.9c-.2-.4-.4-.5-.7-.5h-.2Z" />
          </svg>
        </a>
      )}
      <a className="contact-float" href={`mailto:${SITE.email}`} aria-label="Email Huda Consultancy">
        <MoveUpRight className="h-5 w-5" />
      </a>
      {showTop && (
        <a className="to-top" href="#top" aria-label="Back to top">
          <CircleArrowUp className="h-5 w-5" />
        </a>
      )}
    </div>
  )
}
