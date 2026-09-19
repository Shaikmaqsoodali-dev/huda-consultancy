import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  Lightbulb,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react'

// ── Site config: update these real details in one place ──
export const SITE = {
  email: 'hello@hudaconsultancy.com',
  phoneHref: 'tel:+918297397786',
  phoneLabel: '+91 82973 97786',
  // WhatsApp number in international format without "+". Empty = hidden.
  whatsapp: '918297397786',
  city: 'Hyderabad, India',
}

export const logoUrl = '/huda-logo.svg'

/** Home hero background: save the new creative as public/home-hero.jpg.
 *  Falls back to /hero-bg.jpg automatically until you add it. */
export const homeHeroBg = '/home-hero.jpg'

export type Service = {
  icon: typeof Building2
  slug: string
  title: string
  text: string
  overview: string
  includes: string[]
  documents: string[]
  steps: Array<[string, string]>
  faq: Array<[string, string]>
}

export const services: Service[] = [
  {
    icon: Building2,
    slug: 'business-registration',
    title: 'Business Registration',
    text: 'Start right with the correct structure, registrations and documentation from day one.',
    overview: 'Choosing between a Private Limited Company, LLP, OPC or proprietorship shapes your taxes, fundraising and liability for years. We compare the options against your goals, then handle name approval, DIN, DSC, PAN, TAN and incorporation end-to-end — so you start clean and stay compliant from day one.',
    includes: ['Private Limited Company, LLP, OPC & proprietorship setup', 'Director DIN and Digital Signature (DSC)', 'Name reservation and MOA / AOA drafting', 'PAN, TAN, Shops & Establishment and ESI/PF registration', 'Startup India (DPIIT) recognition support', 'First-year compliance calendar so nothing is missed'],
    documents: ['PAN card of all directors / partners', 'Aadhaar card and recent photograph', 'Proof of registered office address (rent deed + NOC or ownership proof)', 'Latest utility bill for the office premises', 'Proposed company names in order of preference'],
    steps: [
      ['Free consultation', 'We understand your business model and recommend the right structure.'],
      ['Documentation', 'We collect KYC and address proofs and prepare all forms and deeds.'],
      ['Filing & approval', 'Name reservation, incorporation filing and PAN/TAN allotment tracked daily.'],
      ['Handover & kickoff', 'Certificate, MOA/AOA and logins delivered with your compliance calendar.'],
    ],
    faq: [
      ['Private Limited or LLP — which is right for me?', 'A Private Limited Company suits founders planning to raise investment or scale fast; an LLP suits professional firms wanting limited liability with lighter compliance. Tell us your plans in a free consultation and we will recommend honestly.'],
      ['How long does incorporation take?', 'With complete documents, most companies incorporate within 7–14 working days, depending on name approval and MCA processing. We track your filing daily and keep you updated.'],
      ['What do you need from me to begin?', 'PAN, Aadhaar, a photograph, office address proof and two or three proposed names. We handle everything else — forms, drafting, filings and follow-ups.'],
    ],
  },
  {
    icon: ReceiptText,
    slug: 'gst-taxation',
    title: 'GST & Taxation',
    text: 'GST registration, filings and tax planning handled accurately and on time.',
    overview: 'GST mistakes are expensive — blocked input credit, interest and notices. We take ownership of your GST lifecycle: registration, invoice discipline, GSTR-1 and GSTR-3B filing, annual return, reconciliation with 2B, plus income-tax filing and TDS support — with reminders before every due date.',
    includes: ['GST registration and amendments', 'GSTR-1, GSTR-3B and annual return filing', 'Input tax credit reconciliation (2A/2B matching)', 'E-invoicing and e-way bill setup', 'Income tax returns for individuals and businesses', 'GST and income-tax notice handling'],
    documents: ['PAN of the business and proprietor / directors', 'Aadhaar and photograph', 'Business address proof with NOC', 'Bank statement or cancelled cheque', 'Purchase and sales invoices for the period'],
    steps: [
      ['Health check', 'We review your current registration status, past filings and open liabilities.'],
      ['Cleanup & setup', 'Pending returns filed, invoice formats fixed, ITC mismatches resolved.'],
      ['Monthly rhythm', 'You share invoices; we reconcile, file and confirm before each due date.'],
      ['Year-end close', 'Annual return, tax computation and planning for the next year.'],
    ],
    faq: [
      ['When is GST registration mandatory?', 'Broadly, once aggregate turnover crosses the threshold for your state and category, or when you make inter-state or e-commerce supplies. Share your turnover and sales pattern and we will confirm in one conversation.'],
      ['What happens if I miss a filing deadline?', 'Late fees and interest apply per day of delay, and persistent default blocks ITC for your buyers. If you have pending returns, bring them to us — we prioritise cleanup by penalty impact.'],
      ['Do you handle tax notices?', 'Yes. We draft replies, compile supporting invoices and represent your case through the proceeding, keeping you informed in plain language.'],
    ],
  },
  {
    icon: ShieldCheck,
    slug: 'compliance',
    title: 'Compliance',
    text: 'Stay on top of statutory filings, records and ongoing regulatory requirements.',
    overview: 'ROC annual filings, director KYC, statutory registers and board documentation — MCA compliance never sleeps, and penalties compound. We maintain your compliance calendar, prepare every filing and keep your statutory records audit-ready all year.',
    includes: ['ROC annual filings (AOC-4, MGT-7)', 'Director KYC (DIR-3 KYC) every year', 'Statutory registers and minutes maintenance', 'Change filings — directors, address, capital, name', 'Event-based and annual compliance calendar', 'Penalty assessment and compounding support'],
    documents: ['Latest financial statements', 'DIN and DSC of directors', 'Shareholding and board details', 'Registered office address proof', 'Prior filing receipts, if any'],
    steps: [
      ['Compliance audit', 'We map what is due, overdue and upcoming for your entity.'],
      ['Regularise', 'Overdue filings completed in penalty-priority order.'],
      ['Stay current', 'Calendar-driven filings with reminders and confirmations.'],
      ['Stay ready', 'Registers, minutes and records maintained for inspection or diligence.'],
    ],
    faq: [
      ['What are the main annual filings for a company?', 'Typically the financial-statement filing and the annual return, plus director KYC each year. Exact forms and dates depend on your entity type and year-end — your calendar from us lists everything.'],
      ['We missed filings for two years. Can it be fixed?', 'In most cases, yes — with additional fees. We assess the backlog, regularise filings in the right order and put you on a clean calendar going forward.'],
      ['Do LLPs have annual compliance too?', 'Yes — LLPs have their own annual return and statement of account filings. Lighter than a company, but still mandatory every year.'],
    ],
  },
  {
    icon: BadgeCheck,
    slug: 'licenses',
    title: 'Licenses',
    text: 'Trade, professional and industry-specific licenses without the paperwork maze.',
    overview: 'Shops & Establishment, trade license, FSSAI, IEC, labour registrations — every business needs a different stack of licenses, each with its own portal and renewal cycle. We identify exactly what your business needs, file every application and track renewals so you never operate exposed.',
    includes: ['Shops & Establishment registration', 'Municipal trade license', 'FSSAI food license and registration', 'Import Export Code (IEC)', 'Labour, PF and ESI registrations', 'Renewal tracking and reminders'],
    documents: ['Business PAN and constitution proof', 'Identity and address proof of proprietor / partners', 'Office or shop address proof with NOC', 'Activity description and employee count', 'Existing licenses, if any'],
    steps: [
      ['License mapping', 'We list every registration your activity and location require.'],
      ['Application', 'Forms, attachments and portal filings prepared and submitted.'],
      ['Follow-up', 'Inspections, queries and approvals chased to closure.'],
      ['Renewals', 'Expiry calendar maintained with advance reminders.'],
    ],
    faq: [
      ['Which licenses does my business actually need?', 'It depends on your activity, premises and headcount — a Kirana shop, a restaurant and an exporter need very different stacks. One conversation and we will map yours precisely.'],
      ['How long does a trade or FSSAI license take?', 'Basic registrations often complete in days; licenses involving inspection take longer. We give you a realistic timeline per license before you pay anything.'],
      ['Do you track renewals?', 'Yes — every license we obtain goes on your renewal calendar with reminders well before expiry.'],
    ],
  },
  {
    icon: Lightbulb,
    slug: 'trademark-ip',
    title: 'Trademark & IP',
    text: 'Protect your name, brand and ideas with trademark and IP registration.',
    overview: 'Your brand is an asset — until someone else registers it. We run availability searches, file your trademark in the correct class, answer examination reports and track the journal and registration, plus advise on copyright basics for creative work.',
    includes: ['Trademark availability search and class selection', 'TM application drafting and filing', 'Examination report replies', 'Journal watch and opposition handling', 'Registration certificate and renewal calendar', 'Copyright guidance for creative assets'],
    documents: ['Brand name, logo and tagline files', 'Applicant PAN and address proof', 'User affidavit (if claiming prior use)', 'Partnership deed or incorporation proof, if applicable', 'Power of attorney (we prepare it)'],
    steps: [
      ['Search', 'We check identical and similar marks in your classes.'],
      ['File', 'Application drafted with the right specification and filed.'],
      ['Prosecute', 'Examination replies and hearing support until acceptance.'],
      ['Protect', 'Journal watch, registration and renewal reminders.'],
    ],
    faq: [
      ['Can I use ™ before registration?', 'Yes — ™ simply claims the mark as yours. The ® symbol is only for registered marks. Filing early secures your priority date while you keep trading.'],
      ['How long does trademark registration take?', 'Unopposed applications commonly register within 12–18 months in India. Your priority is protected from the filing date, and we track every stage.'],
      ['What if someone opposes my application?', 'Oppositions are argued with evidence of use and distinctiveness. We draft the counter-statement and represent you through the proceeding.'],
    ],
  },
  {
    icon: Calculator,
    slug: 'accounting',
    title: 'Accounting',
    text: 'Clean books, payroll support and reports that help you manage and grow.',
    overview: 'Books that are months behind make every decision a guess — and every filing a scramble. We maintain your accounts through the year: bookkeeping, receivables/payables tracking, payroll with PF/ESI/TDS, monthly MIS reports and year-end financials your CA can sign off without drama.',
    includes: ['Day-to-day bookkeeping', 'Accounts receivable and payable tracking', 'Payroll processing with PF, ESI and TDS', 'Monthly profit, cash and dues reports', 'Year-end trial balance and schedules', 'Coordination with your auditor at year-end'],
    documents: ['Bank statements for all business accounts', 'Sales and purchase invoices', 'Expense bills and loan statements', 'Employee salary and attendance details', 'Prior-year books, if available'],
    steps: [
      ['Onboarding', 'Chart of accounts set up and opening balances entered.'],
      ['Monthly books', 'Invoices and statements recorded, reconciled and reviewed.'],
      ['Payroll run', 'Salaries computed with statutory deductions, payslips issued.'],
      ['Reports', 'Monthly MIS plus year-end pack ready for audit and filing.'],
    ],
    faq: [
      ['We do our own billing. What do you need from us?', 'Just share invoices, bills and bank statements monthly — photos or PDFs are fine. We convert them into clean, reconciled books.'],
      ['Can you handle payroll and PF/ESI?', 'Yes — salary computation, payslips, PF/ESI challans and TDS on salary, with filings on schedule.'],
      ['Will this make audit and tax filing easier?', 'That is the point. Clean monthly books mean your year-end financials, GST annual return and ITR all flow from one reliable source.'],
    ],
  },
]

export const faqs = [
  ['What kind of businesses do you work with?', 'We work with startups, founders and growing businesses that need reliable help with registration, taxation, licensing and compliance — whether you are just starting out or scaling up.'],
  ['How does an engagement begin?', 'We start with a focused conversation to understand where you are, what is at stake, and what a useful outcome looks like. From there, we shape a right-sized scope and clear first step.'],
  ['Do you offer one-off help or ongoing support?', 'Both. Some clients need a single registration or filing; others want an end-to-end partner for accounting and compliance through the year.'],
  ['Where do you work?', 'Huda Consultancy is based in Hyderabad, India, and works with clients across India — combining in-person sessions with remote collaboration where it adds value.'],
]

export { ArrowRight }
