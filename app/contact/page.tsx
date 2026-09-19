import type { Metadata } from 'next'
import { ArrowRight, Phone } from 'lucide-react'
import ContactForm from '@/components/contact-form'
import PageHero from '@/components/page-hero'
import TextLoop from '@/components/text-loop'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get started with Huda Consultancy — book a conversation about business registration, GST, compliance and more.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const whatsappHref = SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Huda Consultancy, I would like to start a conversation.')}`
    : ''

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Contact"
        tone="dark"
        title={<>Your next chapter deserves a <TextLoop words={['clear', 'confident', 'simple']} /> beginning.</>}
        titleId="contact-title"
        description="Tell us about your situation — we reply with a clear first step."
      />

      <section className="section-pad" aria-label="Contact options">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <div className="contact-card">
              <p className="eyebrow text-primary-foreground/70">Ready when you are</p>
              <h2 className="section-title mt-4 max-w-2xl text-primary-foreground text-balance">Talk to an expert.</h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <a className="button button-light" href={`mailto:${SITE.email}`}>Book a conversation <ArrowRight className="h-4 w-4" /></a>
                <a className="button button-outline-light" href={SITE.phoneHref}>Call us <Phone className="h-4 w-4" /></a>
                {whatsappHref && <a className="button button-outline-light" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>}
              </div>
              <div className="mt-8 flex flex-col gap-2 text-sm text-primary-foreground/80">
                <span>{SITE.email}</span>
                <span>{SITE.phoneLabel}</span>
                <span>{SITE.city}</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
