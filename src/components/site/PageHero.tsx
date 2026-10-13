import { cn } from '@/lib/utils'
import { Eyebrow, Picture } from './primitives'

/** Dark image-led banner for inner pages; sits behind the transparent header. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image = '/img/hero-darjeeling.png',
  imageAlt = '',
  children,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  image?: string
  imageAlt?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-navy pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-44', className)}>
      <Picture src={image} alt={imageAlt} priority widths={[640, 1200, 1920]} className="absolute inset-0 -z-10 size-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {eyebrow && <Eyebrow className="animate-rise">{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-3xl animate-rise font-display text-[2.3rem] leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl animate-rise text-base leading-relaxed text-white/75 [animation-delay:120ms] sm:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
