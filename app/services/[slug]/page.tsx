import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, FileText, ListChecks, Phone } from 'lucide-react'
import { SITE, services } from '@/lib/site'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return { title: 'Service' }
  return {
    title: service.title,
    description: `${service.title} — ${service.text} Huda Consultancy, Hyderabad.`,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  const heroImg: Record<string, string> = {
    'business-registration': '/tile-reg.jpg',
    'gst-taxation': '/tile-gst.jpg',
    compliance: '/services-bg.jpg',
    licenses: '/tile-lic.jpg',
    'trademark-ip': '/tile-tm.jpg',
    accounting: '/tile-acct.jpg',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="page-hero-full" aria-labelledby="service-title">
        <div className="hero-full-bg" aria-hidden="true"><img src={heroImg[service.slug] ?? '/services-bg.jpg'} alt="" /></div>
        <div className="hero-full-scrim" aria-hidden="true" />
        <div className="container page-hero-full-inner">
          <p className="eyebrow hero-crumb"><Link href="/services" className="hover:underline">Services</Link> / {service.title}</p>
          <div className="mt-5 flex items-center gap-4">
            <span className="service-icon service-icon-dark"><service.icon className="h-6 w-6" /></span>
            <h1 id="service-title" className="section-title text-balance">{service.title}</h1>
          </div>
          <p className="body-lg mt-6 max-w-2xl">{service.overview}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button button-primary" href="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
            <a className="button button-outline-light" href={SITE.phoneHref}>Talk to an Expert <Phone className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="included-heading">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">What&apos;s included</p>
            <h2 id="included-heading" className="section-title mt-4 text-balance">Everything handled, end to end.</h2>
            <ul className="mt-8 flex flex-col gap-4">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-6 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="form-card">
              <p className="eyebrow text-primary"><FileText className="mr-2 inline h-4 w-4" />Documents you&apos;ll need</p>
              <ul className="mt-6 flex flex-col gap-3">
                {service.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 border-b border-border pb-3 text-sm leading-6 text-muted-foreground last:border-0 last:pb-0">
                    <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {doc}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">Missing something? Start anyway — we tell you exactly how to arrange each document.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-tint" aria-labelledby="steps-heading">
        <div className="container max-w-3xl">
          <p className="eyebrow text-primary">How it works</p>
          <h2 id="steps-heading" className="section-title mt-4 text-balance">A transparent process, step by step.</h2>
          <div className="process-list mt-8">
            {service.steps.map(([title, text], i) => (
              <div className="process-item" key={title}>
                <span className="process-number">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="service-faq-heading">
        <div className="container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-primary">Questions, answered</p>
            <h2 id="service-faq-heading" className="section-title mt-4 text-balance">{service.title}, explained.</h2>
          </div>
          <div className="faq-list">
            {service.faq.map(([q, a]) => (
              <div key={q} className="faq-item">
                <p className="faq-button">{q}</p>
                <p className="faq-answer">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-label="Related services">
        <div className="container">
          <p className="eyebrow text-primary">Keep going</p>
          <h2 className="section-title mt-4 text-balance">Often needed together.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="service-card group">
                <div className="service-icon"><o.icon className="h-5 w-5" /></div>
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{o.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{o.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">View service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="service-cta">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow text-primary-foreground/70">Ready when you are</p>
            <h2 id="service-cta" className="section-title mt-4 max-w-2xl text-primary-foreground text-balance">Start your {service.title.toLowerCase()} today.</h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="button button-light" href="/contact">Get Started <ArrowRight className="h-4 w-4" /></Link>
              <a className="button button-outline-light" href={SITE.phoneHref}>Call {SITE.phoneLabel} <Phone className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
