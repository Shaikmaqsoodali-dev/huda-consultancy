'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  Headset,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { SITE, faqs } from '@/lib/site'
import ContactForm from '@/components/contact-form'
import HeroSlider from '@/components/hero-slider'
import CertificateSlider from '@/components/certificate-slider'
import ExpertImage from '@/components/expert-image'
import TextLoop from '@/components/text-loop'
import { WordsStagger } from '@/registry/spell-ui/words-stagger'
import { InteractiveGridBackground } from '@/components/interactive-grid-background'

const whyBars = [
  ['Registration accuracy', 98],
  ['Filing timeliness', 96],
  ['Client support', 99],
] as Array<[string, number]>

const counters = [
  ['06', 'Core service lines'],
  ['360°', 'Registration-to-filing cover'],
  ['1:1', 'Dedicated expert attention'],
  ['IN', 'Serving clients across India'],
]

const showcase = [
  { img: '/tile-reg.jpg', icon: Building2, tag: 'Business Registration', title: 'Private Limited incorporation, end-to-end support', href: '/services/business-registration' },
  { img: '/tile-gst.jpg', icon: ReceiptText, tag: 'GST & Taxation', title: 'Registration, filings & ITC reconciliation', href: '/services/gst-taxation' },
  { img: '/tile-compliance.jpg', icon: ShieldCheck, tag: 'Compliance', title: 'ROC filings, registers & annual compliance', href: '/services/compliance' },
  { img: '/tile-lic.jpg', icon: Award, tag: 'Licenses', title: 'Trade, Shops & FSSAI without the maze', href: '/services/licenses' },
  { img: '/tile-tm.jpg', icon: BadgeCheck, tag: 'Trademark & IP', title: 'Search, filing & registration tracking', href: '/services/trademark-ip' },
  { img: '/tile-acct.jpg', icon: Calculator, tag: 'Accounting', title: 'Clean books, payroll & monthly reports', href: '/services/accounting' },
]

const team = [
  {
    img: '/images/team/business-registration.jpg',
    alt: 'Business registration specialist reviewing company incorporation documents on a laptop in a modern office',
    name: 'Rahul Sharma',
    role: 'Business Registration Specialist',
    text: 'Company incorporation, DIN, DSC & business registrations',
  },
  {
    img: '/images/team/gst-taxation.jpg',
    alt: 'GST and taxation expert working with financial documents, calculator and laptop in a modern office',
    name: 'Priya Mehta',
    role: 'GST & Taxation Expert',
    text: 'GST registration, returns, taxation & notice handling',
  },
  {
    img: '/images/team/compliance.jpg',
    alt: 'Compliance and licensing expert reviewing corporate compliance documents on a laptop',
    name: 'Arjun Rao',
    role: 'Compliance & Licensing Expert',
    text: 'ROC filings, trade licenses & labour registrations',
  },
  {
    img: '/images/team/accounts.jpg',
    alt: 'Accounts and MIS specialist working on financial reports and a management dashboard',
    name: 'Sneha Kapoor',
    role: 'Accounts & MIS Specialist',
    text: 'Bookkeeping, payroll & monthly MIS reporting',
  },
]

const testimonials = [
  ['Starting up felt overwhelming until one conversation gave us a clear checklist. Incorporation, GST and Shops registration were all handled without us chasing anything.', 'Rajesh Agarwal', 'Startup Founder', 'Hyderabad'],
  ['Our GST filings and FSSAI license were pending for months. They cleaned everything up, put us on a monthly rhythm, and now we never think about due dates.', 'Fatima Khan', 'Restaurant Owner', 'Secunderabad'],
  ['Books, payroll and GST finally flow from one place. Monthly reports are simple enough to act on, and year-end was the smoothest we have had.', 'Vikram Reddy', 'Online Seller', 'Hyderabad'],
] as Array<[string, string, string, string]>

const guides = [
  { n: '01', title: 'Private Limited or LLP — which fits you?', text: 'How liability, compliance load and fundraising differ, and how to choose.', href: '/services/business-registration' },
  { n: '02', title: 'GST filing checklist for new businesses', text: 'Registration, invoice discipline and monthly returns, explained simply.', href: '/services/gst-taxation' },
  { n: '03', title: 'How trademark registration works in India', text: 'Search, class selection, examination and timelines — step by step.', href: '/services/trademark-ip' },
]

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* ── 1. Hero: full-background slider ── */}
      <section id="home" className="hero-full" aria-labelledby="hero-heading">
        <HeroSlider />
        <div className="hero-full-scrim" aria-hidden="true" />
        <div className="container hero-full-inner animate-rise">
          <p className="hero-eyebrow hero-eyebrow-dark"><span className="hero-eyebrow-line" aria-hidden="true" />Welcome to Huda Consultancy</p>
          <WordsStagger as="h1" id="hero-heading" className="display mt-5 text-balance" stagger={0.05}>Best Way to <TextLoop words={['Grow', 'Start', 'Scale']} /> <span className="text-primary">Your Business</span></WordsStagger>
          <p className="lead mt-6 max-w-xl">From business registration and GST to taxation, licensing and ongoing compliance — reliable professional support to help you start, manage and grow with confidence.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button button-primary" href="/contact">Free Consultation <ArrowRight className="h-4 w-4" /></Link>
            <Link className="button button-outline-light" href="/services">Explore Services</Link>
          </div>
          <div className="hero-full-cards">
            <div className="hero-full-mini">
              <span className="hero-full-mini-icon"><Award className="h-4 w-4" /></span>
              <span><span className="block text-[13px] font-bold">360° support</span><span className="block text-xs text-white/65">Registration to compliance</span></span>
            </div>
            <div className="hero-full-mini">
              <span className="hero-full-mini-icon"><ShieldCheck className="h-4 w-4" /></span>
              <span><span className="block text-[13px] font-bold">1:1 expert attention</span><span className="block text-xs text-white/65">Updates at every step</span></span>
            </div>
            <div className="hero-full-mini">
              <span className="hero-full-mini-icon"><MapPin className="h-4 w-4" /></span>
              <span><span className="block text-[13px] font-bold">Hyderabad, India</span><span className="block text-xs text-white/65">Serving clients across India</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Certificates (reference: Quality & Media certificates) ── */}
      <section className="section-pad scroll-mt-24 reveal band-dark" aria-labelledby="certs-heading" style={{ position: 'relative', overflow: 'hidden' }}>
        <InteractiveGridBackground
          gridGap={34}
          dotSize={1.2}
          radius={220}
          color="#4c56b8"
          highlightColor="#ffffff"
          className="absolute inset-0"
        />
        <div className="container relative z-10 text-center">
          <p className="eyebrow">Proof of work</p>
          <h2 id="certs-heading" className="section-title mt-4 text-balance">Registrations & licences we deliver</h2>
          <p className="band-sub mx-auto mt-4 max-w-xl text-sm leading-6">Sample certificates our clients receive — incorporation, GST, licences and more, handled end-to-end.</p>
          <div className="mt-12"><CertificateSlider tone="dark" /></div>
        </div>
      </section>

      {/* ── 3. Why us (reference: High Quality Idea + bars + counters) ── */}
      <section className="section-pad scroll-mt-24 reveal" aria-labelledby="why-heading">
        <div className="container why-grid">
          <div className="why-media">
            <img className="why-img-main" src="/why-main.jpg" alt="Consultant desk with business registration, compliance and taxation guides" />
            <img className="why-img-sub" src="/why-sub.jpg" alt="Handshake over a signed agreement" />
            <div className="why-badge"><span className="why-badge-num">1:1</span><span className="why-badge-text">Dedicated expert attention</span></div>
          </div>
          <div>
            <p className="eyebrow text-primary">Why Huda Consultancy</p>
            <h2 id="why-heading" className="section-title mt-4 text-balance">Our company provides high-quality guidance</h2>
            <p className="body-lg mt-6">A transparent process designed to get you compliant quickly — without the paperwork maze.</p>
            <div className="mt-8 flex flex-col gap-5">
              {whyBars.map(([label, pct]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-[13px] font-bold"><span>{label}</span><span className="font-mono text-primary">{pct}%</span></div>
                  <div className="bar" role="img" aria-label={`${label} ${pct} percent`}><span style={{ width: `${pct}%` }} /></div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-link mt-8">More about us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="container">
          <div className="counter-row">
            {counters.map(([num, label]) => (
              <div key={label} className="counter-cell">
                <p className="counter-num">{num}</p>
                <p className="counter-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Showcase (reference: Amazing Work Showcase) ── */}
      <section className="section-pad section-tint reveal" aria-labelledby="work-heading">
        <div className="container">
          <div className="ref-head">
            <div>
              <p className="eyebrow text-primary">Our portfolio</p>
              <h2 id="work-heading" className="section-title mt-4 text-balance">Amazing work, delivered on time</h2>
            </div>
            <Link href="/services" className="button button-primary">View all services <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="work-grid mt-12">
            {showcase.map((w) => (
              <Link key={w.title} href={w.href} className="work-tile group" aria-label={`${w.tag}: ${w.title}`}>
                <img src={w.img} alt="" loading="lazy" />
                <span className="work-overlay"><span className="work-chip"><w.icon className="h-5 w-5" /></span><span><span className="work-title">{w.tag}</span><span className="work-sub">{w.title}</span></span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Team (reference: Meet Our Team Member) ── */}
      <section className="section-pad reveal" aria-labelledby="team-heading">
        <div className="container text-center">
          <p className="eyebrow text-primary">Our team</p>
          <h2 id="team-heading" className="section-title mt-4 text-balance">Meet our experts</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">A specialist for every stage — registration, taxation, compliance and accounts.</p>
          <div className="expert-grid mt-14 text-left">
            {team.map((m) => (
              <article key={m.name} className="expert-card">
                <ExpertImage src={m.img} alt={m.alt} />
                <div className="expert-body">
                  <h3 className="expert-name">{m.name}</h3>
                  <p className="expert-role">{m.role}</p>
                  <p className="expert-text">{m.text}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/contact" className="button button-primary mt-12">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* ── 6. Testimonials (reference: Customer Feedback) ── */}
      <section className="section-pad section-tint reveal" aria-labelledby="feedback-heading">
        <div className="container text-center">
          <p className="eyebrow text-primary">Testimonials</p>
          <h2 id="feedback-heading" className="section-title mt-4 text-balance">What our clients say</h2>
          <div className="quote-grid mt-12 text-left">
            {testimonials.map(([quote, name, role, city]) => (
              <figure key={name} className="quote-card">
                <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (<Star key={s} className="h-3.5 w-3.5 fill-current" />))}
                </div>
                <blockquote className="mt-4 text-sm leading-6 text-foreground/80">“{quote}”</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4 text-[13px]"><span className="font-bold">{name}</span><span className="block text-muted-foreground">{role} — {city}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Consultation (reference: Evolution + Free Consultation form) ── */}
      <section id="consult" className="section-pad section-tint reveal" aria-labelledby="consult-heading">
        <div className="container consult-grid">
          <div>
            <p className="eyebrow text-primary">Get in touch</p>
            <h2 id="consult-heading" className="section-title mt-4 text-balance">Experience the evolution of your business</h2>
            <p className="body-lg mt-6">Tell us where you are — we reply with a clear checklist, timelines and costs upfront.</p>
            <div className="mt-8 flex flex-col gap-4">
              <a href={SITE.phoneHref} className="consult-line"><span className="note-icon"><Phone className="h-4 w-4" /></span><span><span className="block text-xs text-muted-foreground">Call us on</span><span className="block text-sm font-bold">{SITE.phoneLabel}</span></span></a>
              <a href={`mailto:${SITE.email}`} className="consult-line"><span className="note-icon"><Mail className="h-4 w-4" /></span><span><span className="block text-xs text-muted-foreground">Email us on</span><span className="block text-sm font-bold">{SITE.email}</span></span></a>
              <p className="consult-line"><span className="note-icon"><MapPin className="h-4 w-4" /></span><span><span className="block text-xs text-muted-foreground">Find us at</span><span className="block text-sm font-bold">{SITE.city}</span></span></p>
              <p className="consult-line"><span className="note-icon"><Clock className="h-4 w-4" /></span><span><span className="block text-xs text-muted-foreground">Working time</span><span className="block text-sm font-bold">Mon – Sat, 10am – 7pm</span></span></p>
            </div>
          </div>
          <div className="consult-form">
            <p className="text-lg font-bold tracking-tight">Get a free consultation</p>
            <p className="mt-1 text-[13px] text-muted-foreground">We usually reply within one working day.</p>
            <div className="mt-5"><ContactForm /></div>
          </div>
        </div>
      </section>

      {/* ── 9. Guides (reference: Latest Blog & News) ── */}
      <section className="section-pad reveal" aria-labelledby="guides-heading">
        <div className="container">
          <div className="ref-head">
            <div>
              <p className="eyebrow text-primary">Guides & insights</p>
              <h2 id="guides-heading" className="section-title mt-4 text-balance">Start with what you need to know</h2>
            </div>
            <Link href="/services" className="button button-ghost">View all guides <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="guide-grid mt-12">
            {guides.map((g) => (
              <Link key={g.n} href={g.href} className="guide-card group">
                <span className="guide-num">{g.n}</span>
                <span className="mt-16 block text-[17px] font-bold leading-6 tracking-tight group-hover:text-primary">{g.title}</span>
                <span className="mt-2 block text-[13px] leading-5 text-muted-foreground">{g.text}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-primary">Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ (kept compact for SEO) ── */}
      <section className="section-pad section-tint reveal" aria-labelledby="faq-heading">
        <div className="container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-primary">Questions, answered</p>
            <h2 id="faq-heading" className="section-title mt-4 text-balance">Common questions, clear answers.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div key={question} className="faq-item">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="faq-button" aria-expanded={faqOpen === i} aria-controls={`faq-panel-${i}`} id={`faq-button-${i}`}>
                  <span>{question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && <p className="faq-answer" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`}>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CTA banner (reference: Small Business Grow Fast) ── */}
      <section className="section-pad" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta-banner" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(120deg, #1a0fc4 0%, #0d0096 55%, #0b1030 130%)' }}>
            <InteractiveGridBackground
              gridGap={28}
              dotSize={1.6}
              radius={260}
              color="#8f9bff"
              highlightColor="#ffffff"
              className="absolute inset-0"
            />
            <div className="relative z-10 flex w-full flex-wrap items-center justify-between gap-7">
              <div>
                <WordsStagger as="h2" id="cta-heading" className="section-title text-white text-balance" stagger={0.04}>Small businesses <TextLoop words={['grow', 'scale']} /> fast with the right guidance.</WordsStagger>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/75"><CheckCircle2 className="h-4 w-4" /> Transparent pricing • Updates at every step</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link className="button button-light" href="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
                <Link className="button button-outline-light" href="/services">Explore services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
