import { Link, useRouterState } from '@tanstack/react-router'
import { CalendarCheck, Phone } from 'lucide-react'
import { telHref, whatsappUrl } from '@/lib/tours'
import { WhatsAppIcon } from './primitives'

/** Sticky Call / WhatsApp / Book bar on mobile; floating WhatsApp button on desktop. */
export function ConversionBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const onTourDetail = /^\/tours\/[^/]+/.test(pathname)
  const bookLabel = onTourDetail ? 'Enquire / Book' : 'Book Now'

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 pb-safe backdrop-blur-xl md:hidden">
        <div className="grid h-16 grid-cols-[1fr_1fr_1.4fr] items-center gap-2 px-3">
          <a href={telHref()} className="flex h-11 items-center justify-center gap-1.5 rounded-full text-sm font-semibold text-white">
            <Phone className="size-4" /> Call
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex h-11 items-center justify-center gap-1.5 rounded-full text-sm font-semibold text-[#4ee17f]">
            <WhatsAppIcon className="size-[18px]" /> WhatsApp
          </a>
          {onTourDetail ? (
            <a href="#book" className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-gold text-sm font-bold text-navy">
              <CalendarCheck className="size-4" /> {bookLabel}
            </a>
          ) : (
            <Link to="/contact" hash="book" className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-gold text-sm font-bold text-navy">
              <CalendarCheck className="size-4" /> {bookLabel}
            </Link>
          )}
        </div>
      </div>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with NP Service on WhatsApp"
        className="group fixed right-6 bottom-6 z-40 hidden items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)] transition hover:pr-5 md:flex"
      >
        <WhatsAppIcon className="size-7" />
        <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40">WhatsApp Our Team</span>
      </a>
    </>
  )
}
