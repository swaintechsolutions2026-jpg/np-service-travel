import { Link } from '@tanstack/react-router'
import { MapPin, Phone } from 'lucide-react'
import { siteSettings } from '@/data/fixtures'
import { publishedTours, telHref, whatsappUrl } from '@/lib/tours'
import { Logo } from './Logo'
import { destinationLinks } from './Header'
import { WhatsAppIcon } from './primitives'

export function Footer() {
  const year = new Date().getFullYear()
  const a = siteSettings.address
  const socials = siteSettings.socials.filter((s) => s.status === 'verified')
  return (
    <footer className="relative overflow-hidden bg-navy text-white/70">
      <div className="pointer-events-none absolute -top-40 right-0 size-[30rem] rounded-full bg-royal/30 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-6 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 font-display text-2xl text-white italic">{siteSettings.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">Group tours, pilgrimage journeys and scenic holidays from Baripada, Odisha.</p>
            <div className="mt-6 h-0.5 w-16 bg-gradient-to-r from-gold to-turquoise" aria-hidden="true" />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {([
                ['/', 'Home'],
                ['/tours', 'Upcoming Tours'],
                ['/gallery', 'Travel Memories'],
                ['/about', 'About NP Service'],
                ['/faq', 'FAQs'],
                ['/contact', 'Contact & Booking'],
              ] as const).map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">Explore Tours</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {publishedTours().map((t) => (
                <li key={t.id}>
                  <Link to="/tours/$slug" params={{ slug: t.slug }} className="transition hover:text-gold">
                    {t.name}
                  </Link>
                </li>
              ))}
              {destinationLinks.map((d) => (
                <li key={d.params.region}>
                  <Link to={d.to} params={d.params} className="transition hover:text-gold">
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">Contact</h3>
            <address className="mt-5 space-y-4 text-sm not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-turquoise" />
                <span>
                  {a.line1}, {a.city}, {a.state} – {a.postalCode}, {a.country}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-turquoise" />
                <span className="flex flex-col gap-1">
                  <a href={telHref()} className="text-white hover:text-gold">{siteSettings.phones.primary.display}</a>
                  <a href={telHref(siteSettings.phones.secondary.e164)} className="hover:text-gold">{siteSettings.phones.secondary.display}</a>
                </span>
              </p>
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={telHref()} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-gold hover:text-gold">
                <Phone className="size-4" /> Call
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </div>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-4 text-sm">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-gold">{s.platform}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteSettings.businessName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/booking-terms" className="hover:text-gold">Booking Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
