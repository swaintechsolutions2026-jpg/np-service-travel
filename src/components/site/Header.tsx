import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronDown, MapPin, Menu, Phone, X } from 'lucide-react'
import { siteSettings } from '@/data/fixtures'
import { telHref, whatsappUrl } from '@/lib/tours'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Logo } from './Logo'
import { WhatsAppIcon } from './primitives'

export const destinationLinks = [
  { to: '/destinations/$region', params: { region: 'darjeeling-sikkim' }, label: 'Darjeeling & Sikkim' },
  { to: '/destinations/$region', params: { region: 'north-india' }, label: 'North India Pilgrimage' },
  { to: '/destinations/$region', params: { region: 'south-india' }, label: 'South India Pilgrimage' },
] as const

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Upcoming Tours' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

function LanguageSwitch({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-1 text-[11px] font-semibold', className)} role="group" aria-label="Language">
      <span className="rounded-full bg-white/15 px-2 py-0.5 text-white" aria-current="true">
        EN
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" aria-disabled="true" className="cursor-not-allowed rounded-full px-2 py-0.5 font-odia text-white/55">
            ଓଡ଼ିଆ
          </button>
        </TooltipTrigger>
        <TooltipContent>Odia pages are being prepared with NP Service</TooltipContent>
      </Tooltip>
    </div>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = 'relative py-2 text-[14px] font-medium text-white/85 transition-colors hover:text-white data-[status=active]:text-white data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:rounded-full data-[status=active]:after:bg-gold'

  return (
    <>
      <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-500', scrolled ? 'bg-navy/88 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl' : 'bg-gradient-to-b from-navy/70 to-transparent')}>
        <div className={cn('hidden overflow-hidden border-b border-white/10 transition-all duration-500 lg:block', scrolled ? 'max-h-0 border-transparent' : 'max-h-10')}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] font-medium tracking-wide text-white/70">
            <p className="flex items-center gap-5">
              <span className="font-semibold text-gold">{siteSettings.tagline}</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3" /> Baripada, Odisha
              </span>
            </p>
            <LanguageSwitch />
          </div>
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px]">
          <Link to="/" aria-label="NP Service – Tour & Travels home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {navLinks.slice(0, 2).map((l) => (
              <Link key={l.to} to={l.to} className={linkClass} activeOptions={{ exact: l.to === '/' }}>
                {l.label}
              </Link>
            ))}
            <div className="group relative">
              <button type="button" className="flex items-center gap-1 py-2 text-[14px] font-medium text-white/85 hover:text-white" aria-haspopup="true">
                Destinations <ChevronDown className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-white/10 bg-navy/95 p-2 shadow-2xl backdrop-blur-xl">
                  {destinationLinks.map((d) => (
                    <Link key={d.params.region} to={d.to} params={d.params} className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/8 hover:text-white">
                      {d.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {navLinks.slice(2).map((l) => (
              <Link key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={telHref()} className="hidden items-center gap-2 text-sm font-semibold text-white xl:flex">
              <span className="grid size-9 place-items-center rounded-full border border-white/20">
                <Phone className="size-4" />
              </span>
              {siteSettings.phones.primary.display}
            </a>
            <Link to="/contact" hash="book" className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy shadow-[0_8px_24px_-8px_rgba(245,184,41,0.7)] transition hover:-translate-y-0.5 hover:bg-[#ffc944] lg:inline-flex">
              Book Your Tour
            </Link>
            <a href={telHref()} aria-label={`Call ${siteSettings.phones.primary.display}`} className="grid size-10 place-items-center rounded-full border border-white/25 text-white lg:hidden">
              <Phone className="size-[18px]" />
            </a>
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="grid size-10 place-items-center rounded-full bg-white text-navy lg:hidden">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={cn('fixed inset-0 z-[60] lg:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!open}>
        <div className={cn('absolute inset-0 bg-navy transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')} />
        <div className={cn('relative flex h-full flex-col overflow-y-auto px-5 pt-3 pb-safe transition-all duration-300', open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0')} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-14 items-center justify-between">
            <Logo />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-10 place-items-center rounded-full border border-white/20 text-white">
              <X className="size-5" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col" aria-label="Mobile">
            {navLinks.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === '/' }}
                className="flex items-baseline gap-4 border-b border-white/8 py-4 font-display text-[1.7rem] text-white/90 data-[status=active]:text-gold"
              >
                <span className="font-sans text-xs text-white/35">0{i + 1}</span>
                {l.label}
              </Link>
            ))}
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-turquoise">Destinations</p>
            <div className="mt-2 grid gap-1">
              {destinationLinks.map((d) => (
                <Link key={d.params.region} to={d.to} params={d.params} onClick={() => setOpen(false)} className="py-2.5 text-base text-white/75">
                  {d.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="mt-auto grid gap-3 pt-8 pb-6">
            <Link to="/contact" hash="book" onClick={() => setOpen(false)} className="rounded-full bg-gold py-4 text-center font-bold text-navy">
              Book Your Tour
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={telHref()} className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-sm font-semibold text-white">
                <Phone className="size-4" /> Call
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </div>
            <div className="flex items-center justify-between pt-2 text-xs text-white/50">
              <span>{siteSettings.tagline}</span>
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
