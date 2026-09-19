'use client'

import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

type ExpertImageProps = {
  src: string
  alt: string
  className?: string
}

/**
 * Team portrait with a graceful fallback.
 *
 * Drop the real photos at public/images/team/*.jpg. Until then (or if a
 * file is missing) a clean branded placeholder renders instead of a
 * broken-image icon — no initials, no layout shift.
 */
export function ExpertImage({ src, alt, className }: ExpertImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn('expert-photo expert-photo-fallback', className)}
      >
        <UserRound className="h-12 w-12" aria-hidden="true" />
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('expert-photo', className)}
    />
  )
}

export default ExpertImage
