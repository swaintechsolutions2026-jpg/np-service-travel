import { Link } from '@tanstack/react-router'
import { ArrowUpRight, CalendarDays, Clock, MapPin, Armchair } from 'lucide-react'
import type { Tour } from '@/data/fixtures'
import { formatDate, formatINR, nextDeparture, regionLabel, startingPrice } from '@/lib/tours'
import { cn } from '@/lib/utils'
import { Picture, StatusPill } from './primitives'

export function TourCard({ tour, className }: { tour: Tour; className?: string }) {
  const dep = nextDeparture(tour.id)
  const price = startingPrice(dep)
  const seating = dep && [dep.seatPrice && 'Seat', dep.sleeperPrice && 'Sleeper'].filter(Boolean).join(' / ')

  return (
    <article className={cn('group flex flex-col overflow-hidden rounded-[1.6rem] bg-card shadow-[0_1px_0_rgba(12,28,50,0.04),0_24px_48px_-28px_rgba(12,28,50,0.35)] ring-1 ring-border/70', className)}>
      <Link to="/tours/$slug" params={{ slug: tour.slug }} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Picture src={tour.image} alt="" widths={[480, 720]} sizes="(min-width: 1024px) 380px, 85vw" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold tracking-wide text-navy backdrop-blur">
          {regionLabel[tour.region]}
        </span>
        {dep && (
          <div className="absolute right-4 bottom-4 rounded-2xl bg-gold px-3 py-2 text-center text-navy shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-wider">Departs</p>
            <p className="text-sm leading-tight font-extrabold">{formatDate(dep.date, { day: 'numeric', month: 'short' })}</p>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {dep ? (
            dep.bookingStatus === 'open' ? <StatusPill tone="open">Enquiries open</StatusPill> : <StatusPill>Bookings closed</StatusPill>
          ) : (
            <StatusPill>Enquire for Schedule</StatusPill>
          )}
          {tour.tags.includes('pilgrimage') && <StatusPill>Pilgrimage</StatusPill>}
        </div>
        <h3 className="mt-3 font-display text-[1.45rem] leading-snug font-semibold text-navy">
          <Link to="/tours/$slug" params={{ slug: tour.slug }} className="hover:text-royal">
            {tour.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-dashed border-border pt-4 text-[13px]">
          <div className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-turquoise" />
            <div>
              <dt className="sr-only">Departure</dt>
              <dd className="font-semibold text-navy">{dep ? formatDate(dep.date) : 'Schedule to be announced'}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-turquoise" />
            <div>
              <dt className="sr-only">Duration</dt>
              <dd className="font-semibold text-navy">{tour.durationDays ? `${tour.durationDays} Days` : 'Details coming soon'}</dd>
            </div>
          </div>
          <div className="col-span-2 flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-turquoise" />
            <div>
              <dt className="sr-only">Destinations</dt>
              <dd className="line-clamp-1 text-muted-foreground">{tour.destinations.slice(0, 5).join(' · ')}{tour.destinations.length > 5 ? ' …' : ''}</dd>
            </div>
          </div>
          {seating && (
            <div className="col-span-2 flex items-start gap-2">
              <Armchair className="mt-0.5 size-4 shrink-0 text-turquoise" />
              <div>
                <dt className="sr-only">Seating</dt>
                <dd className="text-muted-foreground">AC coach · {seating}</dd>
              </div>
            </div>
          )}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{price ? 'Starting from' : 'Package price'}</p>
            <p className="text-xl font-extrabold text-navy">
              {price ? (
                <>
                  {formatINR(price)}
                  <span className="text-xs font-medium text-muted-foreground"> /person</span>
                </>
              ) : (
                <span className="text-base">Contact for Price</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to="/tours/$slug" params={{ slug: tour.slug }} className="flex h-11 items-center justify-center gap-1 rounded-full bg-navy text-sm font-semibold text-white transition hover:bg-royal">
            View Itinerary <ArrowUpRight className="size-4" />
          </Link>
          <Link to="/contact" search={{ tour: tour.slug }} hash="book" className="flex h-11 items-center justify-center rounded-full border border-navy/15 text-sm font-semibold text-navy transition hover:border-turquoise hover:text-[#067a73]">
            Enquire Now
          </Link>
        </div>
      </div>
    </article>
  )
}
