'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email and message.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Website enquiry from ${name.trim()}`)
    const body = encodeURIComponent(`Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`)
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="form-card" role="status">
        <p className="text-base font-semibold text-foreground">Thank you, {name.trim() || 'there'}.</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Your email app should have opened with your message addressed to {SITE.email}. If it didn&apos;t, please email us directly.</p>
        <a className="button button-primary mt-6" href={`mailto:${SITE.email}`}>Open email app <ArrowRight className="h-4 w-4" /></a>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" className="form-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="form-label" htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" className="form-input" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="mt-4">
        <label className="form-label" htmlFor="cf-message">How can we help?</label>
        <textarea id="cf-message" name="message" rows={4} className="form-input" placeholder="Tell us about your situation and what a useful outcome looks like…" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600" role="alert">{error}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className="button button-primary">Send enquiry <ArrowRight className="h-4 w-4" /></button>
        <a className="button button-ghost" href={`mailto:${SITE.email}`}>Or email us directly</a>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">No account needed. Submitting opens your email app with the message pre-filled to {SITE.email}.</p>
    </form>
  )
}
