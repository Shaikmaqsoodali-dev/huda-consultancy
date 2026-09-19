'use client'

import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AnimatedButtonProps = {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'light'
  size?: 'default' | 'sm' | 'lg'
  /** Soft outer glow (default true). */
  glow?: boolean
  textEffect?: 'normal' | 'shine'
  uppercase?: boolean
  rounded?: 'custom' | 'full' | 'md' | 'lg'
  /** Render as the child element (e.g. Next.js Link) instead of a <button>. */
  asChild?: boolean
  /** Disable shimmer + glow animations. */
  hideAnimations?: boolean
  shimmerColor?: string
  shimmerSize?: string
  shimmerDuration?: string
  borderRadius?: string
  background?: string
  style?: CSSProperties
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const SIZES = {
  sm: 'px-4 py-2 text-[13px]',
  default: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
} as const

const ROUNDED = {
  full: '999px',
  lg: '16px',
  md: '10px',
} as const

/**
 * AnimatedButton — shimmer-sweep CTA with optional glow.
 *
 * ```tsx
 * import { AnimatedButton } from "@/components/ui/animated-button";
 * export default function AnimatedButtonDemo() {
 *   return (
 *     <div className="flex items-center justify-center ">
 *       <AnimatedButton glow uppercase rounded="custom" borderRadius="100px">
 *         ScrollX UI
 *       </AnimatedButton>
 *     </div>
 *   );
 * }
 * ```
 */
export function AnimatedButton({
  children,
  className,
  variant = 'default',
  size = 'default',
  glow = true,
  textEffect = 'normal',
  uppercase = false,
  rounded = 'full',
  asChild = false,
  hideAnimations = false,
  shimmerColor = '#8f9bff',
  shimmerSize = '0.15em',
  shimmerDuration = '3s',
  borderRadius,
  background,
  style,
  onClick,
  type = 'button',
  ariaLabel,
}: AnimatedButtonProps) {
  const radius = rounded === 'custom' ? (borderRadius ?? '100px') : ROUNDED[rounded]
  const bg =
    background ??
    (variant === 'outline'
      ? 'transparent'
      : variant === 'light'
        ? '#ffffff'
        : 'linear-gradient(120deg, #2412f0 0%, #1500d8 60%, #0d0096 100%)')
  const color = variant === 'light' ? '#1500d8' : variant === 'outline' ? 'currentColor' : '#ffffff'
  const animate = !hideAnimations

  const cls = cn(
    'group/animated-btn relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden font-bold tracking-wide whitespace-nowrap transition-transform duration-200 outline-none select-none hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/70 disabled:pointer-events-none disabled:opacity-50',
    SIZES[size],
    className,
  )

  const mergedStyle: CSSProperties = {
    ...style,
    borderRadius: radius,
    background: bg,
    color,
    textTransform: uppercase ? 'uppercase' : undefined,
    border: variant === 'outline' ? '1.5px solid currentColor' : undefined,
    boxShadow: glow && animate ? `0 12px 34px -8px rgba(21,0,216,.55), 0 0 0 1px rgba(255,255,255,.12) inset` : undefined,
  }

  const inner = (
    <>
      {animate && (
        <span
          aria-hidden="true"
          className="animated-btn-shimmer pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(110deg, transparent 35%, ${shimmerColor} 50%, transparent 65%)`,
            backgroundSize: '250% 100%',
            opacity: 0.55,
            animationDuration: shimmerDuration,
          }}
        />
      )}
      <span
        aria-hidden="false"
        className="relative z-10 inline-flex items-center gap-2"
        style={
          textEffect === 'shine' && animate
            ? {
                background: `linear-gradient(110deg, currentColor 40%, ${shimmerColor} 50%, currentColor 60%)`,
                backgroundSize: '250% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                animationDuration: shimmerDuration,
              }
            : undefined
        }
      >
        {children}
      </span>
      <style>{`@keyframes animated-btn-shimmer { 0% { background-position: 120% 0; } 100% { background-position: -120% 0; } } .animated-btn-shimmer { animation-name: animated-btn-shimmer; animation-timing-function: ease-in-out; animation-iteration-count: infinite; } @media (prefers-reduced-motion: reduce) { .animated-btn-shimmer { animation: none; } }`}</style>
    </>
  )

  if (asChild) {
    const child = Children.only(children) as ReactElement<{ className?: string; style?: CSSProperties; children?: ReactNode }>
    if (!isValidElement(child)) return null
    const shimmerSizeStyle = { ['--animated-btn-shimmer-size' as string]: shimmerSize } as CSSProperties
    return cloneElement(child, {
      className: cn(cls, child.props.className),
      style: { ...mergedStyle, ...shimmerSizeStyle, ...child.props.style },
      children: (
        <>
          {animate && (
            <span
              aria-hidden="true"
              className="animated-btn-shimmer pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(110deg, transparent 35%, ${shimmerColor} 50%, transparent 65%)`,
                backgroundSize: '250% 100%',
                opacity: 0.55,
                animationDuration: shimmerDuration,
              }}
            />
          )}
          <span className="relative z-10 inline-flex items-center gap-2">
            {child.props.children}
          </span>
          <style>{`@keyframes animated-btn-shimmer { 0% { background-position: 120% 0; } 100% { background-position: -120% 0; } } .animated-btn-shimmer { animation-name: animated-btn-shimmer; animation-timing-function: ease-in-out; animation-iteration-count: infinite; } @media (prefers-reduced-motion: reduce) { .animated-btn-shimmer { animation: none; } }`}</style>
        </>
      ),
    })
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={cls} style={mergedStyle}>
      {inner}
    </button>
  )
}

export default AnimatedButton
