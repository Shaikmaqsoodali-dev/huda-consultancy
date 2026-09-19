import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from './site-header'
import { SITE, services } from '@/lib/site'

export default function SiteFooter() {
  return (
    <footer className="footer-dark">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand"><Logo compact /></div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">Business setup and compliance made simple — start, manage and grow with confidence.</p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/75">
            <a className="footer-contact" href={`mailto:${SITE.email}`}><Mail className="h-4 w-4 text-white/50" />{SITE.email}</a>
            <a className="footer-contact" href={SITE.phoneHref}><Phone className="h-4 w-4 text-white/50" />{SITE.phoneLabel}</a>
            <span className="footer-contact"><MapPin className="h-4 w-4 text-white/50" />{SITE.city}</span>
            <span className="footer-contact"><Clock className="h-4 w-4 text-white/50" />Mon – Sat, 10am – 7pm</span>
          </div>
        </div>
        <nav aria-label="Footer explore">
          <p className="footer-heading-dark">Quick Link</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/process">Our approach</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
        <nav aria-label="Footer services">
          <p className="footer-heading-dark">Our Services</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>
            ))}
          </div>
        </nav>
        <div>
          <p className="footer-heading-dark">Ready when you are</p>
          <p className="mt-4 text-sm leading-6 text-white/65">One conversation gives you a clear checklist, timelines and costs upfront.</p>
          <Link href="/contact" className="button button-light mt-6">Free Consultation</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 Huda Consultancy. All rights reserved.</span>
          <span>Businesses stronger together.</span>
        </div>
      </div>
    </footer>
  )
}
