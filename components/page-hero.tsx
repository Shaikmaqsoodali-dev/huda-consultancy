'use client'

import type { ReactNode } from 'react'
import { InteractiveGridBackground } from '@/components/interactive-grid-background'
import { WordsStagger } from '@/registry/spell-ui/words-stagger'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  titleId: string
  description?: string
  actions?: ReactNode
  /** Dark navy hero (default light). */
  tone?: 'light' | 'dark'
}

/** Inner-page hero: eyebrow + title + copy over an interactive dot grid. */
export default function PageHero({ eyebrow, title, titleId, description, actions, tone = 'light' }: PageHeroProps) {
  const dark = tone === 'dark'
  return (
    <section
      className={dark ? 'page-hero band-dark' : 'page-hero'}
      aria-labelledby={titleId}
      style={dark ? { position: 'relative', overflow: 'hidden', background: '#0b1030' } : { position: 'relative', overflow: 'hidden' }}
    >
      <InteractiveGridBackground
        gridGap={28}
        dotSize={1.8}
        radius={280}
        color={dark ? '#4c56b8' : '#aab2ff'}
        highlightColor={dark ? '#ffffff' : '#1500d5'}
        className="absolute inset-0"
      />
      <div className="container relative z-10">
        <p className={dark ? 'eyebrow' : 'eyebrow text-primary'}>{eyebrow}</p>
        <WordsStagger as="h1" id={titleId} className="section-title mt-4 max-w-2xl text-balance" stagger={0.04}>
          {title}
        </WordsStagger>
        {description ? <p className="body-lg mt-6 max-w-2xl">{description}</p> : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
      </div>
    </section>
  )
}
