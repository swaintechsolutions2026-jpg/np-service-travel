import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { img, imgSrcSet } from '@/lib/tours'

/** Fades children up once they scroll into view. Disabled by prefers-reduced-motion in CSS. */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: { children: React.ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'section' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref as never} className={cn('reveal', visible && 'is-visible', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/** Responsive image served through the Netlify Image CDN. */
export function Picture({
  src,
  alt,
  widths = [480, 800, 1200],
  sizes = '100vw',
  className,
  priority = false,
}: {
  src: string
  alt: string
  widths?: number[]
  sizes?: string
  className?: string
  priority?: boolean
}) {
  return (
    <img
      src={img(src, widths[widths.length - 1])}
      srcSet={imgSrcSet(src, widths)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
    />
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-turquoise', className)}>
      <span className="h-px w-8 bg-current" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'dark',
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center [&>p:first-child]:justify-center', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={cn('mt-4 font-display text-[2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl', tone === 'light' ? 'text-white' : 'text-navy')}>
        {title}
      </h2>
      {intro && <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', tone === 'light' ? 'text-white/70' : 'text-muted-foreground')}>{intro}</p>}
    </Reveal>
  )
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.13c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.41.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.65-.14.26.1 1.69.8 1.98.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
    </svg>
  )
}

/** Small neutral pill used for "Details coming soon" style states. */
export function StatusPill({ children, tone = 'neutral', className }: { children: React.ReactNode; tone?: 'neutral' | 'open' | 'gold'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide',
        tone === 'open' && 'bg-turquoise/12 text-[#067a73]',
        tone === 'gold' && 'bg-gold text-navy',
        tone === 'neutral' && 'bg-secondary text-muted-foreground',
        className,
      )}
    >
      {tone === 'open' && <span className="size-1.5 rounded-full bg-turquoise" aria-hidden="true" />}
      {children}
    </span>
  )
}
