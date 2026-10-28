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
      <span className="logo-badge">
        <img src={logoUrl} alt="Huda Consultancy logo" width={32} height={32} className="h-8 w-8 object-contain" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[21px] font-bold tracking-[-0.02em] text-foreground">Huda Consultancy</span>
        <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Hyderabad • India</span>
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
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
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
    <header className={`site-header sticky top-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary navigation">
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
        <div className="flex items-center gap-3">
          <Link href="/contact" className="header-cta hidden sm:inline-flex">Let&apos;s talk <ArrowRight className="h-4 w-4" /></Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="header-menu" aria-label="Menu">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="header-menu-link" aria-current={isActive(l.href) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
          <span className="header-menu-divider" aria-hidden="true" />
          <p className="eyebrow px-3.5 pb-1 text-muted-foreground">Services</p>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMenuOpen(false)} className="header-menu-link">
              {s.title}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="header-cta mt-3 self-start sm:hidden">Let&apos;s talk <ArrowRight className="h-4 w-4" /></Link>
        </nav>
      )}
    </header>
  )
}
