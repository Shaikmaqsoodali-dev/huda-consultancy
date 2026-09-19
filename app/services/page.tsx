import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/site'
import PageHero from '@/components/page-hero'
import TextLoop from '@/components/text-loop'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Business registration, GST and taxation, compliance, licenses, trademark and accounting — Huda Consultancy, Hyderabad.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Services"
        tone="dark"
        title={<>From <TextLoop words={['registration', 'GST filing', 'compliance']} /> to growth, we handle the paperwork.</>}
        titleId="services-title"
        description="End-to-end professional support — start, manage and grow with confidence."
      />

      <section className="section-pad services-bg" aria-label="All services">
        <div className="container">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <article key={service.title} className="service-card group">
                <div className="flex items-start justify-between">
                  <div className="service-icon"><service.icon className="h-5 w-5" /></div>
                  <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                </div>
                <h2 className="mt-10 text-xl font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{service.text}</p>
                <Link href={`/services/${service.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="services-cta">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow text-primary-foreground/70">Not sure where to start?</p>
            <h2 id="services-cta" className="section-title mt-4 max-w-2xl text-primary-foreground text-balance">Talk to an expert first — it&apos;s the fastest way to clarity.</h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="button button-light" href="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
