import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, ShieldCheck, Users } from 'lucide-react'
import { WordsStagger } from '@/registry/spell-ui/words-stagger'
import { InteractiveGridBackground } from '@/components/interactive-grid-background'

export const metadata: Metadata = {
  title: 'About',
  description: 'Huda Consultancy — professional support for business setup and compliance, based in Hyderabad, India.',
  alternates: { canonical: '/about' },
}

const values = [
  { icon: ShieldCheck, title: 'Clarity first', text: 'No jargon, no hidden steps. You always know what is happening, what it costs, and what comes next.' },
  { icon: Clock, title: 'On time, every time', text: 'Due dates are tracked for you. Filings, renewals and returns go out before the deadline — not after.' },
  { icon: Users, title: 'Human support', text: 'A dedicated expert who knows your business and answers in plain language, on call or WhatsApp.' },
]

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="page-hero band-dark" aria-labelledby="about-title" style={{ position: 'relative', overflow: 'hidden', background: '#0b1030' }}>
        <InteractiveGridBackground
          gridGap={28}
          dotSize={1.8}
          radius={280}
          color="#4c56b8"
          highlightColor="#ffffff"
          className="absolute inset-0"
        />
        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">About us</p>
            <WordsStagger
              as="h1"
              id="about-title"
              className="section-title mt-4 max-w-2xl text-balance"
              stagger={0.05}
            >
              A different kind of partner for your business journey.
            </WordsStagger>
            <p className="body-lg mt-6 max-w-xl">From registration to filing — one team that handles the paperwork so you can run the business.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="button button-primary" href="/contact">Talk to us <ArrowRight className="h-4 w-4" /></Link>
              <Link className="button button-ghost" href="/services">Explore services</Link>
            </div>
          </div>
          <div className="why-media" aria-label="Our consultancy at work">
            <img className="why-img-main" src="/why-main.jpg" alt="Consultant desk with business registration, compliance and taxation guides" />
            <img className="why-img-sub" src="/why-sub.jpg" alt="Handshake over a signed agreement" />
            <div className="why-badge"><span className="why-badge-num">1:1</span><span className="why-badge-text">Dedicated expert attention</span></div>
          </div>
        </div>
      </section>

      <section className="section-pad reveal" aria-label="About Huda Consultancy">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-primary">Your business, our guidance</p>
            <h2 className="section-title mt-4 text-balance">Good compliance starts with clarity.</h2>
          </div>
          <div className="max-w-2xl">
            <p className="body-lg">The best outcomes do not come from more paperwork confusion. They come from seeing the whole picture — registrations, taxation, licenses and filings — and handling each of them correctly and on time.</p>
            <p className="body-lg mt-6">We bring rigorous professional thinking and a genuinely human perspective to the moments that shape your business. Clear enough to act on. Reliable enough to trust.</p>
            <Link href="/process" className="inline-link mt-8">Our way of working <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-pad section-tint reveal" aria-labelledby="values-heading">
        <div className="container">
          <p className="eyebrow text-primary">What we stand for</p>
          <h2 id="values-heading" className="section-title mt-4 max-w-xl text-balance">Three promises, kept on every engagement</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <article key={value.title} className="service-card group">
                <div className="flex items-start justify-between">
                  <div className="service-icon"><value.icon className="h-5 w-5" /></div>
                  <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-10 text-xl font-semibold tracking-tight">{value.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad reveal" aria-label="Highlights">
        <div className="container">
          <div className="grid gap-10 border-y border-border py-10 sm:grid-cols-3">
            <div><p className="stat-number">1:1</p><p className="stat-label">Dedicated expert attention</p></div>
            <div><p className="stat-number">360°</p><p className="stat-label">Registration to compliance cover</p></div>
            <div><p className="stat-number">∞</p><p className="stat-label">Support as you grow</p></div>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="about-cta">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow text-primary-foreground/70">Businesses stronger together</p>
            <h2 id="about-cta" className="section-title mt-4 max-w-2xl text-primary-foreground text-balance">Let&apos;s build your business with confidence.</h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="button button-light" href="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
              <Link className="button button-outline-light" href="/services">Explore services</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
