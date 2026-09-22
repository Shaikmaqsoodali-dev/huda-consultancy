'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  Lightbulb,
  MessageCircle,
  Phone,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { SITE, services } from '@/lib/site'

/* ── Config ─────────────────────────────────────────────── */
const STORAGE_DISMISSED = 'hc-lead-wizard-dismissed-v1'
const STORAGE_DONE = 'hc-lead-wizard-done-v1'
const AUTO_OPEN_DELAY_MS = 9000
const SCROLL_TRIGGER_PCT = 0.55
const DISMISS_COOLDOWN_DAYS = 3

const serviceIcons: Record<string, typeof Building2> = {
  'business-registration': Building2,
  'gst-taxation': ReceiptText,
  compliance: ShieldCheck,
  licenses: BadgeCheck,
  'trademark-ip': Lightbulb,
  accounting: Calculator,
}

const statusOptions = [
  { value: 'Starting new business', hint: 'Idea / just launched' },
  { value: 'Already running', hint: 'Need filings / cleanup' },
  { value: 'Expanding / multiple needs', hint: 'Licenses, team, growth' },
]

const timelineOptions = [
  { value: 'Immediately', hint: 'Within 7 days' },
  { value: 'Within 30 days', hint: 'Planning this month' },
  { value: 'Just exploring', hint: 'Need guidance first' },
]

const contactModes = [
  { value: 'WhatsApp', hint: 'Fastest reply' },
  { value: 'Call', hint: 'Talk to an expert' },
  { value: 'Email', hint: 'Detailed checklist' },
]

type Lead = {
  service: string
  serviceLabel: string
  status: string
  timeline: string
  detail: string
  name: string
  phone: string
  email: string
  contactMode: string
}

const emptyLead: Lead = {
  service: '',
  serviceLabel: '',
  status: '',
  timeline: '',
  detail: '',
  name: '',
  phone: '',
  email: '',
  contactMode: 'WhatsApp',
}

function daysSince(ts: number) {
  return (Date.now() - ts) / (1000 * 60 * 60 * 24)
}

function shouldSuppress(): boolean {
  try {
    if (localStorage.getItem(STORAGE_DONE)) return true
    const raw = localStorage.getItem(STORAGE_DISMISSED)
    if (!raw) return false
    return daysSince(Number(raw)) < DISMISS_COOLDOWN_DAYS
  } catch {
    return false
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_DISMISSED, String(Date.now()))
  } catch {
    /* noop */
  }
}

/* ── Component ──────────────────────────────────────────── */
export default function LeadWizardPopup() {
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [step, setStep] = useState(0)
  const [lead, setLead] = useState<Lead>(emptyLead)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const openedRef = useRef(false)

  const openWizard = useCallback((atStep = 0) => {
    setStep(atStep)
    setError('')
    setMinimised(false)
    setOpen(true)
  }, [])

  const closeWizard = useCallback((persist = true) => {
    setOpen(false)
    if (persist && !submitted) markDismissed()
    // Show the teaser pill so the visitor can reopen
    setMinimised(true)
  }, [submitted])

  /* Auto triggers: delay + scroll-depth + exit intent (once) */
  useEffect(() => {
    if (shouldSuppress()) {
      setMinimised(true)
      return
    }
    const maybeOpen = () => {
      if (openedRef.current || shouldSuppress()) return
      openedRef.current = true
      setOpen(true)
    }
    const t = window.setTimeout(maybeOpen, AUTO_OPEN_DELAY_MS)

    const onScroll = () => {
      const h = document.documentElement
      const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)
      if (pct >= SCROLL_TRIGGER_PCT) maybeOpen()
    }
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 8 && window.innerWidth > 768) maybeOpen()
    }
    const onManual = () => {
      openedRef.current = true
      openWizard()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseout', onExit as unknown as EventListener)
    window.addEventListener('open-lead-wizard', onManual)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseout', onExit as unknown as EventListener)
      window.removeEventListener('open-lead-wizard', onManual)
    }
  }, [openWizard])

  /* ESC to close + body scroll lock + focus */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWizard()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('button, input')?.focus(), 60)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, closeWizard])

  function pickService(slug: string, label: string) {
    setLead((l) => ({ ...l, service: slug, serviceLabel: label }))
    setError('')
    setStep(1)
  }

  function canNextFromStep1() {
    return Boolean(lead.status && lead.timeline)
  }

  function goNext() {
    setError('')
    if (step === 1 && !canNextFromStep1()) {
      setError('Please choose your stage and timeline so we can prioritise your request.')
      return
    }
    setStep((s) => Math.min(s + 1, 2))
  }

  function validateContact(): string {
    if (!lead.name.trim()) return 'Please tell us your name.'
    const digits = lead.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (!/^[6-9]\d{9}$/.test(digits)) return 'Please enter a valid 10-digit mobile number.'
    if (lead.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()))
      return 'Please enter a valid email, or leave it blank.'
    return ''
  }

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    const err = validateContact()
    if (err) {
      setError(err)
      return
    }
    setError('')
    const digits = lead.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    // Persist locally so the business never loses the lead even without a backend
    try {
      const key = 'hc-leads-v1'
      const prev = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[]
      prev.push({ ...lead, phone: digits, at: new Date().toISOString() })
      localStorage.setItem(key, JSON.stringify(prev))
      localStorage.setItem(STORAGE_DONE, String(Date.now()))
    } catch {
      /* noop */
    }
    setSubmitted(true)
  }

  const waMessage = encodeURIComponent(
    `Hello Huda Consultancy! I need help with ${lead.serviceLabel || 'a service'}.\n` +
      `Stage: ${lead.status || '-'} | Timeline: ${lead.timeline || '-'}\n` +
      `Name: ${lead.name} | Phone: ${lead.phone}` +
      (lead.email ? ` | Email: ${lead.email}` : '') +
      (lead.detail ? `\nDetails: ${lead.detail}` : '') +
      `\nPreferred contact: ${lead.contactMode}. Please share next steps.`,
  )
  const waHref = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${waMessage}` : ''

  const totalSteps = 3

  return (
    <>
      {/* Teaser pill — re-entry point after dismiss / before auto-open */}
      {!open && minimised && !submitted && (
        <button
          onClick={() => openWizard()}
          className="lead-teaser"
          aria-label="Open free consultation wizard"
        >
          <span className="lead-teaser-dot" aria-hidden="true">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="lead-teaser-text">
            <span className="block text-[13px] font-extrabold leading-4">Free 2-min checklist</span>
            <span className="block text-[11.5px] leading-4 opacity-70">What does your business need?</span>
          </span>
          <span className="lead-teaser-cta">
            Start <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>
      )}

      {open && (
        <div className="lead-overlay" role="presentation" onClick={() => closeWizard()}>
          <div
            ref={dialogRef}
            className="lead-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-wizard-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="lead-head">
              <div>
                <p className="lead-eyebrow">
                  <Sparkles className="h-3.5 w-3.5" /> Free consultation · 2 min
                </p>
                <h2 id="lead-wizard-title" className="lead-title">
                  {submitted
                    ? 'Request received!'
                    : step === 0
                      ? 'What do you need help with?'
                      : step === 1
                        ? 'Tell us where you stand'
                        : 'Where should we send your plan?'}
                </h2>
              </div>
              <button className="lead-close" onClick={() => closeWizard()} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress */}
            {!submitted && (
              <div className="lead-progress" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={i <= step ? 'is-on' : ''} />
                ))}
              </div>
            )}
            {!submitted && (
              <p className="lead-stepcount">
                Step {step + 1} of {totalSteps}
              </p>
            )}

            {/* ── STEP 0: service ── */}
            {!submitted && step === 0 && (
              <div className="lead-options">
                {services.map((s) => {
                  const Icon = serviceIcons[s.slug] ?? Building2
                  const active = lead.service === s.slug
                  return (
                    <button
                      key={s.slug}
                      onClick={() => pickService(s.slug, s.title)}
                      className={`lead-option group ${active ? 'is-active' : ''}`}
                      aria-pressed={active}
                    >
                      <span className="lead-option-icon">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-left">
                        <span className="block text-[14px] font-bold leading-5">{s.title}</span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">{s.text}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  )
                })}
                <button onClick={() => pickService('not-sure', 'General guidance')} className="lead-option lead-option-wide">
                  <span className="lead-option-icon">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[14px] font-bold leading-5">Not sure / Multiple needs</span>
                    <span className="block text-xs text-muted-foreground">We will map it for you on a free call</span>
                  </span>
                </button>
              </div>
            )}

            {/* ── STEP 1: stage + timeline ── */}
            {!submitted && step === 1 && (
              <div>
                <p className="lead-label">Your business stage</p>
                <div className="lead-chip-grid" role="radiogroup" aria-label="Business stage">
                  {statusOptions.map((o) => (
                    <button
                      key={o.value}
                      role="radio"
                      aria-checked={lead.status === o.value}
                      onClick={() => setLead((l) => ({ ...l, status: o.value }))}
                      className={`lead-chip ${lead.status === o.value ? 'is-active' : ''}`}
                    >
                      <span className="block text-[13.5px] font-bold">{o.value}</span>
                      <span className="block text-xs text-muted-foreground">{o.hint}</span>
                    </button>
                  ))}
                </div>

                <p className="lead-label mt-5">How urgent is this?</p>
                <div className="lead-chip-grid" role="radiogroup" aria-label="Timeline">
                  {timelineOptions.map((o) => (
                    <button
                      key={o.value}
                      role="radio"
                      aria-checked={lead.timeline === o.value}
                      onClick={() => setLead((l) => ({ ...l, timeline: o.value }))}
                      className={`lead-chip ${lead.timeline === o.value ? 'is-active' : ''}`}
                    >
                      <span className="flex items-center gap-1.5 text-[13.5px] font-bold">
                        <Clock className="h-3.5 w-3.5 text-primary" /> {o.value}
                      </span>
                      <span className="block text-xs text-muted-foreground">{o.hint}</span>
                    </button>
                  ))}
                </div>

                <label className="lead-label mt-5" htmlFor="lead-detail">
                  Anything specific? <span className="font-medium text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="lead-detail"
                  rows={2}
                  className="form-input"
                  placeholder="e.g. Private Limited + GST for a new food venture in Hyderabad…"
                  value={lead.detail}
                  onChange={(e) => setLead((l) => ({ ...l, detail: e.target.value }))}
                />
              </div>
            )}

            {/* ── STEP 2: contact ── */}
            {!submitted && step === 2 && (
              <form onSubmit={submit} noValidate>
                <div className="lead-summary">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <p>
                    <strong>{lead.serviceLabel || 'General guidance'}</strong>
                    {lead.status && <> · {lead.status}</>}
                    {lead.timeline && <> · {lead.timeline}</>}
                  </p>
                  <button type="button" className="lead-edit" onClick={() => setStep(0)}>
                    Edit
                  </button>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="lead-name">Your name *</label>
                    <input
                      id="lead-name"
                      className="form-input"
                      autoComplete="name"
                      placeholder="Full name"
                      value={lead.name}
                      onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="lead-phone">Mobile number *</label>
                    <input
                      id="lead-phone"
                      className="form-input"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile"
                      value={lead.phone}
                      onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="mt-3.5">
                  <label className="form-label" htmlFor="lead-email">
                    Email <span className="font-medium text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    className="form-input"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={lead.email}
                    onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                  />
                </div>

                <p className="lead-label mt-4">Preferred contact</p>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Preferred contact">
                  {contactModes.map((m) => (
                    <button
                      type="button"
                      key={m.value}
                      role="radio"
                      aria-checked={lead.contactMode === m.value}
                      onClick={() => setLead((l) => ({ ...l, contactMode: m.value }))}
                      className={`lead-pill ${lead.contactMode === m.value ? 'is-active' : ''}`}
                    >
                      {m.value}
                    </button>
                  ))}
                </div>
              </form>
            )}

            {/* ── SUCCESS ── */}
            {submitted && (
              <div className="lead-success" role="status">
                <span className="lead-success-icon">
                  <BadgeCheck className="h-7 w-7" />
                </span>
                <p className="text-[17px] font-extrabold tracking-tight">
                  Thanks {lead.name.trim().split(' ')[0] || 'there'} — we have your request.
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Our expert will reach out on <strong>{lead.contactMode}</strong> within one working day
                  (Mon–Sat, 10am–7pm) with your checklist, timelines and costs for{' '}
                  <strong>{lead.serviceLabel || 'your requirement'}</strong>.
                </p>
                <div className="mt-5 grid gap-2.5">
                  {waHref && (
                    <a className="button button-primary w-full" href={waHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" /> Get instant reply on WhatsApp
                    </a>
                  )}
                  <a className="button button-ghost w-full" href={SITE.phoneHref}>
                    <Phone className="h-4 w-4" /> Or call {SITE.phoneLabel}
                  </a>
                </div>
                <button className="lead-done" onClick={() => setOpen(false)}>
                  Done — continue browsing
                </button>
              </div>
            )}

            {error && (
              <p className="mt-3 text-[13px] font-semibold text-red-600" role="alert">
                {error}
              </p>
            )}

            {/* Footer nav */}
            {!submitted && (
              <div className="lead-foot">
                {step > 0 ? (
                  <button className="button button-ghost" onClick={() => setStep((s) => s - 1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <button className="lead-skip" onClick={() => closeWizard()}>
                    Maybe later
                  </button>
                )}
                {step < 2 ? (
                  <button className="button button-primary" onClick={goNext}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button className="button button-primary" onClick={() => submit()}>
                    Get my free plan <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {!submitted && (
              <p className="lead-trust">
                <ShieldCheck className="h-3.5 w-3.5" /> No spam, no obligation · 1:1 expert attention · Serving all India
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/** Global helper so any CTA can open the wizard: window.dispatchEvent(new Event('open-lead-wizard')) */
export function openLeadWizard() {
  window.dispatchEvent(new Event('open-lead-wizard'))
}
