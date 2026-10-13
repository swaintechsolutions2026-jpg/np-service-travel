import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { AlertTriangle, ArrowRight, CalendarDays, Check, ChevronRight, Clock, IndianRupee, MapPin, Minus, Phone } from 'lucide-react'
import { faqs, gallery, siteSettings } from '@/data/fixtures'
import {
  formatDate,
  formatINR,
  getTour,
  nextDeparture,
  pastDepartures,
  regionLabel,
  startingPrice,
  telHref,
  upcomingDepartures,
  whatsappUrl,
} from '@/lib/tours'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { BookingForm } from '@/components/site/BookingForm'
import { FAQAccordion } from '@/components/site/FAQAccordion'
import { Gallery } from '@/components/site/Gallery'
import { Eyebrow, Picture, StatusPill, WhatsAppIcon } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/tours/$slug')({
  loader: ({ params }) => {
    const tour = getTour(params.slug)
    if (!tour) throw notFound()
    return { tour }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { tour } = loaderData
    const dep = nextDeparture(tour.id)
    const description = dep
      ? `${tour.name}: ${tour.durationDays} days from ${dep.city}, departing ${formatDate(dep.date)}. From ${formatINR(startingPrice(dep)!)} per person. ${tour.summary}`
      : `${tour.name} with NP Service – Tour & Travels. ${tour.summary} Enquire for the upcoming schedule.`
    const base = seo({ title: `${tour.name} | NP Service – Tour & Travels`, description, path: `/tours/${tour.slug}`, image: tour.image })
    // TouristTrip structured data only carries confirmed facts
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.name,
      description: tour.summary,
      touristType: tour.tags.includes('pilgrimage') ? 'Pilgrimage' : 'Sightseeing',
      provider: { '@type': 'TravelAgency', name: siteSettings.businessName, telephone: siteSettings.phones.primary.e164 },
    }
    if (tour.approval === 'confirmed') schema.itinerary = { '@type': 'ItemList', itemListElement: tour.destinations.map((d, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name: d } })) }
    if (dep) {
      schema.offers = [
        dep.seatPrice && { '@type': 'Offer', name: 'Seat', price: dep.seatPrice, priceCurrency: 'INR', validThrough: dep.date },
        dep.sleeperPrice && { '@type': 'Offer', name: 'Sleeper', price: dep.sleeperPrice, priceCurrency: 'INR', validThrough: dep.date },
      ].filter(Boolean)
    }
    return { ...base, scripts: [{ type: 'application/ld+json', children: JSON.stringify(schema) }] }
  },
  component: TourDetail,
  notFoundComponent: () => (
    <div className="bg-navy px-5 pt-40 pb-24 text-center text-white">
      <h1 className="font-display text-4xl">This tour isn't available</h1>
      <p className="mt-3 text-white/70">It may have been archived or the link is incorrect.</p>
      <Link to="/tours" className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 font-bold text-navy">
        See all tours
      </Link>
    </div>
  ),
})

const sections = [
  ['overview', 'Overview'],
  ['highlights', 'Highlights'],
  ['itinerary', 'Itinerary'],
  ['inclusions', 'Inclusions'],
  ['exclusions', 'Exclusions'],
  ['travel', 'Travel & Stay'],
  ['gallery', 'Gallery'],
  ['terms', 'Booking Terms'],
  ['faq', 'FAQ'],
] as const

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border py-10 last:border-0 sm:py-12">
      <h2 className="font-display text-[1.75rem] font-semibold text-navy sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Pending({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-border bg-secondary/60 p-5 text-sm text-muted-foreground">{children}</p>
}

function TourDetail() {
  const { tour } = Route.useLoaderData()
  const deps = upcomingDepartures(tour.id)
  const dep = deps[0]
  const past = pastDepartures(tour.id)
  const price = startingPrice(dep)
  const photos = gallery.filter((g) => tour.galleryIds.includes(g.id))
  const tourFaqs = faqs.filter((f) => ['f2', 'f3', 'f4', 'f7', 'f8', 'f9', 'f10'].includes(f.id))
  const quickWa = whatsappUrl(`Namaskar NP Service! I would like details about the ${tour.name}${dep ? ` departing ${formatDate(dep.date)}` : ''}.`)

  return (
    <>
      {/* Banner */}
      <section className="relative isolate overflow-hidden bg-navy pt-28 pb-28 text-white sm:pt-36 sm:pb-36 lg:pt-44">
        <Picture src={tour.image} alt={tour.imageAlt} priority widths={[640, 1200, 1920]} className="absolute inset-0 -z-10 size-full animate-slow-zoom object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/50 to-navy/40" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/tours" className="hover:text-white">Tours</Link>
            <ChevronRight className="size-3" />
            <span className="truncate text-white/85">{tour.name}</span>
          </nav>
          <Eyebrow className="mt-6 text-gold">{regionLabel[tour.region]}</Eyebrow>
          <h1 className="mt-3 max-w-4xl animate-rise font-display text-[2.4rem] leading-[1.04] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">{tour.name}</h1>
          <p className="mt-4 max-w-2xl text-white/80 sm:text-lg">{tour.tagline}</p>
          {dep && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <CalendarDays className="size-4 text-gold" /> Departs {formatDate(dep.date)} · {dep.time} · {dep.city}
            </p>
          )}
        </div>
      </section>

      {/* Summary strip */}
      <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-5 sm:-mt-20 sm:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-border shadow-[0_30px_60px_-30px_rgba(12,28,50,0.45)] lg:grid-cols-4">
          {[
            { icon: CalendarDays, label: 'Departure', value: dep ? formatDate(dep.date) : 'Schedule to be announced' },
            { icon: Clock, label: 'Duration', value: tour.durationDays ? `${tour.durationDays} Days` : 'Details coming soon' },
            { icon: MapPin, label: 'Departure city', value: dep ? `${dep.city}${dep.time ? `, ${dep.time}` : ''}` : 'To be confirmed' },
            { icon: IndianRupee, label: 'Starting price', value: price ? `${formatINR(price)} / person` : 'Contact for Price' },
          ].map((s) => (
            <div key={s.label} className="bg-white p-4 sm:p-6">
              <dt className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                <s.icon className="size-3.5 text-turquoise" /> {s.label}
              </dt>
              <dd className="mt-1.5 text-[15px] font-bold text-navy sm:text-lg">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <nav aria-label="On this page" className="no-scrollbar -mx-5 mt-8 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-navy">
              {label}
            </a>
          ))}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div className="min-w-0">
            <Section id="overview" title="Tour Overview">
              <div className="space-y-4 text-[16px] leading-relaxed text-navy/80">
                {tour.overview.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
            </Section>

            <Section id="highlights" title="Destination Highlights">
              <ul className="flex flex-wrap gap-2">
                {tour.destinations.map((d) => (
                  <li key={d} className="rounded-full bg-navy px-3.5 py-1.5 text-sm font-semibold text-white">{d}</li>
                ))}
              </ul>
              {tour.destinationsNote && <p className="mt-3 text-sm text-muted-foreground italic">{tour.destinationsNote}</p>}
              {tour.highlights.length > 0 && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {tour.highlights.map((h) => (
                    <div key={h.place} className="rounded-2xl bg-white p-5 ring-1 ring-border">
                      <h3 className="font-display text-xl font-semibold text-royal">{h.place}</h3>
                      <ul className="mt-3 space-y-2 text-sm text-navy/80">
                        {h.items.map((i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-turquoise" /> {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {tour.highlights.some((h) => h.items.some((i) => i.endsWith('*'))) && (
                <p className="mt-4 text-xs text-muted-foreground">* Subject to permits, weather and local restrictions.</p>
              )}
            </Section>

            <Section id="itinerary" title="Day-by-Day Itinerary">
              {tour.itinerary.length ? (
                <>
                  <ol className="relative space-y-3 border-l-2 border-dashed border-royal/20 pl-6">
                    {tour.itinerary.map((d) => (
                      <li key={d.day} className="relative rounded-2xl bg-white p-4 ring-1 ring-border">
                        <span className="absolute top-4 -left-[2.15rem] grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-gold">{d.day}</span>
                        <p className="font-semibold text-navy">{d.title}</p>
                        <p className={cn('mt-1 text-sm', d.status === 'to_be_confirmed' ? 'text-muted-foreground italic' : 'text-navy/75')}>{d.description}</p>
                      </li>
                    ))}
                  </ol>
                  {tour.itinerary.some((d) => d.status === 'to_be_confirmed') && (
                    <p className="mt-4 text-sm text-muted-foreground">The brochure lists the places covered but not the exact day-by-day order. NP Service shares the detailed schedule with confirmed travellers.</p>
                  )}
                </>
              ) : (
                <Pending>The itinerary is shared with each confirmed departure. Ask our team for the route of the next journey.</Pending>
              )}
            </Section>

            <Section id="inclusions" title="Package Inclusions">
              {tour.inclusions.length ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tour.inclusions.map((i) => (
                    <li key={i} className="flex gap-3 text-[15px] text-navy/85">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-turquoise/15 text-[#067a73]">
                        <Check className="size-3.5" />
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending>Inclusions are confirmed with each departure.</Pending>
              )}
            </Section>

            <Section id="exclusions" title="Exclusions & Important Notes">
              {tour.exclusions.length > 0 && (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tour.exclusions.map((e) => (
                    <li key={e.label} className="flex gap-3 text-[15px]">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground">
                        <Minus className="size-3.5" />
                      </span>
                      <span>
                        <span className="font-semibold text-navy">{e.label}</span>
                        <span className="block text-sm text-muted-foreground">{e.detail ?? 'Details to be confirmed by NP Service'}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-6 space-y-3">
                {tour.importantNotes.map((n) => (
                  <li key={n} className="flex gap-3 rounded-2xl bg-[#fff7e3] p-4 text-sm text-navy/85 ring-1 ring-gold/30">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#b7860b]" /> {n}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="travel" title="Travel & Accommodation">
              <ul className="space-y-3">
                {tour.travelAndStay.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-navy/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" /> {t}
                  </li>
                ))}
              </ul>
              <figure className="mt-6 overflow-hidden rounded-2xl">
                <Picture src="/img/np/bus-np-service-ac-sleeper.png" alt="NP Service AC sleeper coach" widths={[640, 1000]} sizes="(min-width:1024px) 700px, 100vw" className="aspect-[16/6] w-full object-cover" />
              </figure>
            </Section>

            <Section id="gallery" title="Gallery">
              {photos.length ? (
                <>
                  <Gallery items={photos} />
                  <p className="mt-2 text-xs text-muted-foreground">Destination images from the tour brochure and NP Service travel photographs.</p>
                </>
              ) : (
                <Pending>Photos from this journey will be added soon.</Pending>
              )}
            </Section>

            <Section id="terms" title="Booking Terms">
              <ul className="space-y-2 text-[15px] text-navy/85">
                {dep?.advanceAmount && <li>• Booking advance of {formatINR(dep.advanceAmount)} per traveller, subject to the brochure's booking conditions.</li>}
                <li>• The advance follows a restrictive refund policy.</li>
                <li>• Cancellation at least 10 days before travel may qualify for a conditional tour credit — not a cash refund.</li>
                <li>• Valid identity documents are required for every traveller.</li>
              </ul>
              <Link to="/booking-terms" className="mt-5 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy">
                Read the full booking terms <ArrowRight className="size-4" />
              </Link>
            </Section>

            <Section id="faq" title="Frequently Asked Questions">
              <FAQAccordion items={tourFaqs} />
            </Section>

            {past.length > 0 && (
              <section className="py-10">
                <h2 className="font-display text-2xl font-semibold text-navy">Previous departures</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {past.map((p) => (
                    <li key={p.id}><StatusPill>{formatDate(p.date)} · Completed</StatusPill></li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sticky booking card */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 mt-10 rounded-[1.75rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(12,28,50,0.45)] ring-1 ring-border">
              <BookingCard tourName={tour.name} dep={dep} quickWa={quickWa} />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile booking summary + enquiry form */}
      <section id="book" className="scroll-mt-20 bg-[#eef3fa] py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div>
            <Eyebrow>Enquire / Book</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">Reserve your place on this journey</h2>
            <p className="mt-3 text-muted-foreground">Send your details and our team will confirm availability, booking requirements and payment instructions with you.</p>
            <div className="mt-6 rounded-[1.5rem] bg-white p-5 ring-1 ring-border lg:hidden">
              <BookingCard tourName={tour.name} dep={dep} quickWa={quickWa} compact />
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(12,28,50,0.5)] ring-1 ring-border sm:p-8">
            <BookingForm defaultTour={tour.slug} idPrefix="tour" />
          </div>
        </div>
      </section>
    </>
  )
}

function BookingCard({ tourName, dep, quickWa, compact = false }: { tourName: string; dep: ReturnType<typeof nextDeparture>; quickWa: string; compact?: boolean }) {
  return (
    <div>
      {!compact && <p className="font-display text-xl font-semibold text-navy">{tourName}</p>}
      {dep ? (
        <>
          <p className={cn('flex items-center gap-2 text-sm text-muted-foreground', !compact && 'mt-1')}>
            <CalendarDays className="size-4 text-turquoise" /> {formatDate(dep.date)} · {dep.time} · {dep.city}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {dep.seatPrice && (
              <div className="rounded-2xl border border-border p-4">
                <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Seat</p>
                <p className="mt-1 text-2xl font-extrabold text-navy">{formatINR(dep.seatPrice)}</p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
            )}
            {dep.sleeperPrice && (
              <div className="rounded-2xl border-2 border-turquoise bg-turquoise/5 p-4">
                <p className="text-xs font-bold tracking-wider text-[#067a73] uppercase">Sleeper</p>
                <p className="mt-1 text-2xl font-extrabold text-navy">{formatINR(dep.sleeperPrice)}</p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
            )}
          </div>
          {dep.advanceAmount && (
            <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-sm text-navy">
              Booking advance <strong>{formatINR(dep.advanceAmount)}</strong> <span className="text-muted-foreground">· subject to booking terms</span>
            </p>
          )}
          <p className="mt-3 text-xs text-muted-foreground">Seat availability is confirmed by our team when you enquire. No online payment is taken.</p>
        </>
      ) : (
        <div className="mt-3 rounded-2xl bg-secondary p-4">
          <StatusPill>Enquire for Schedule</StatusPill>
          <p className="mt-3 text-sm text-navy">Departure dates and package price are shared by NP Service on enquiry.</p>
        </div>
      )}
      {!compact && (
        <a href="#book" className="mt-5 flex h-12 items-center justify-center rounded-full bg-gold font-bold text-navy hover:bg-[#ffc944]">
          Enquire / Book
        </a>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a href={quickWa} target="_blank" rel="noreferrer" className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-sm font-semibold text-white">
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
        <a href={telHref()} className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-navy/15 text-sm font-semibold text-navy">
          <Phone className="size-4" /> Call
        </a>
      </div>
    </div>
  )
}
