import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/page-hero'
import TextLoop from '@/components/text-loop'

export const metadata: Metadata = {
  title: 'Our approach',
  description: 'How Huda Consultancy works — understand, checklist, done. Transparent process for business setup and compliance.',
  alternates: { canonical: '/process' },
}

const steps: Array<[string, string]> = [
  ['Tell us where you are', 'A focused conversation to understand your business, registrations done so far, and what is pending.'],
  ['Get a clear checklist', 'A transparent list of registrations, filings and licenses you need — with timelines and costs upfront.'],
  ['We handle the rest', 'Documentation, applications and follow-ups managed end-to-end, with updates at every step.'],
]

export default function ProcessPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Our approach"
        tone="dark"
        title={<>Thoughtful in the room. <TextLoop words={['Decisive', 'Thorough', 'Relentless']} /> in the work.</>}
        titleId="process-title"
        description="A transparent process designed to get you compliant quickly — without pretending the important things are simple."
      />

      <section className="section-pad" aria-label="Process steps">
        <div className="container max-w-3xl">
          <div className="process-list">
            {steps.map(([title, text], i) => (
              <div className="process-item" key={title}>
                <span className="process-number">{i + 1}</span>
                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="process-cta">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow text-primary-foreground/70">Ready when you are</p>
            <h2 id="process-cta" className="section-title mt-4 max-w-2xl text-primary-foreground text-balance">Start with a conversation.</h2>
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
