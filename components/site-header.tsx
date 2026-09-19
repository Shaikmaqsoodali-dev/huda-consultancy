'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { logoUrl, services } from '@/lib/site'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Our approach' },
  { href: '/contact', label: 'Contact' },
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${compact ? 'scale-90 origin-left' : ''}`} aria-label="Huda Consultancy home">
      <img src={logoUrl} alt="Huda Consultancy logo" width={44} height={44} className="h-11 w-11 rounded-xl object-contain shadow-sm ring-1 ring-border" />
      <span className="leading-none">
        <span className="block font-display text-[19px] font-semibold tracking-[-0.02em] text-foreground">Huda Consultancy</span>
        <span className="mt-1 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Hyderabad • India</span>
      </span>
    </Link>
  )
}

export { Logo }

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setServicesOpen(false)
      }
    }
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className={`site-header sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <Link href="/" className="nav-link" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
          <Link href="/about" className="nav-link" aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <Link href="/services" onClick={() => setServicesOpen(false)} className="nav-link flex items-center gap-1.5" aria-haspopup="true" aria-current={pathname === '/services' ? 'page' : undefined}>
              Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </Link>
            {servicesOpen && (
              <div className="mega-menu">
                <p className="eyebrow">What we help with</p>
                {services.map((service) => (
                  <Link key={service.title} href={`/services/${service.slug}`} onClick={() => setServicesOpen(false)} className="group flex items-start gap-3 py-2.5">
                    <service.icon className="mt-0.5 h-4 w-4 text-primary" />
                    <span>
                      <span className="block text-sm font-semibold">{service.title}</span>
                      <span className="block text-xs text-muted-foreground">{service.text}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/process" className="nav-link" aria-current={pathname === '/process' ? 'page' : undefined}>Our approach</Link>
          <Link href="/contact" className="nav-link" aria-current={pathname === '/contact' ? 'page' : undefined}>Contact</Link>
        </nav>
        <Link href="/contact" className="button button-primary hidden md:inline-flex">Let&apos;s talk <ArrowRight className="h-4 w-4" /></Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-toggle md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-menu md:hidden" aria-label="Mobile navigation">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} aria-current={isActive(l.href) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="button button-primary">Let&apos;s talk <ArrowRight className="h-4 w-4" /></Link>
        </nav>
      )}
    </header>
  )
}
