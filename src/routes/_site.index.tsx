import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BedDouble,
  Bus,
  CalendarDays,
  Compass,
  MapPin,
  MessageCircle,
  Phone,
  Route as RouteIcon,
  ShieldCheck,
  UsersRound,
  UtensilsCrossed,
} from 'lucide-react'
import { faqs, gallery, regions, siteSettings, testimonials } from '@/data/fixtures'
import {
  featuredDeparture,
  formatDate,
  formatDateParts,
  formatINR,
  nextDeparture,
  publishedTours,
  regionLabel,
  startingPrice,
  telHref,
  whatsappUrl,
} from '@/lib/tours'
import { cn } from '@/lib/utils'
import { seo } from '@/lib/seo'
import { TourCard } from '@/components/site/TourCard'
import { TourFilters, filterTours, type FilterId } from '@/components/site/TourFilters'
import { FAQAccordion, faqSchema } from '@/components/site/FAQAccordion'
import { Eyebrow, Picture, Reveal, SectionHeading, WhatsAppIcon } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/')({
  head: () => ({
    ...seo({
      title: 'NP Service – Tour & Travels | Group Tours & Pilgrimage Travel from Odisha',
      description:
        'Explore group tours, pilgrimage journeys and scenic holiday packages with NP Service – Tour & Travels, serving travelers from Baripada, Odisha since 1992.',
      path: '/',
    }),
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(faqSchema(faqs.slice(0, 5))) }],
  }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <DepartureStrip />
      <ToursSection />
      <Destinations />
      <WhyUs />
      <BusShowcase />
      <Memories />
      <HowToBook />
      <HomeFaq />
      <FinalCta />
    </>
  )
}

function Hero() {
  const featured = featuredDeparture()
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy lg:max-h-[960px] lg:min-h-[720px]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Picture
          src="/img/hero-darjeeling.png"
          alt="Sunrise over the snow-covered Kanchenjunga range and Darjeeling tea gardens"
          priority
          widths={[640, 1080, 1600, 2200]}
          className="size-full animate-slow-zoom object-cover object-[60%_center] lg:object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/55 to-navy/35 lg:bg-gradient-to-r lg:from-navy/90 lg:via-navy/45 lg:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy to-transparent lg:h-32" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-28 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-6 md:pb-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-40 lg:pb-20">
        <div className="lg:col-span-7">
          <Eyebrow className="animate-rise text-gold">Discover India with NP Service</Eyebrow>
          <h1 className="mt-4 animate-rise font-display text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-white [animation-delay:80ms] min-[390px]:text-[2.85rem] sm:text-6xl lg:text-[5.2rem]">
            Beautiful Journeys.
            <br />
            <span className="text-gold italic">Timeless Memories.</span>
          </h1>
          <p className="mt-4 max-w-xl animate-rise text-[15px] leading-relaxed text-white/80 [animation-delay:160ms] sm:hidden">
            Organized group departures, scenic holidays and sacred pilgrimages from Odisha — since 1992.
          </p>
          <p className="mt-6 hidden max-w-xl animate-rise text-lg leading-relaxed text-white/80 [animation-delay:160ms] sm:block">
            Explore India's scenic destinations and sacred pilgrimage routes with NP Service – Tour &amp; Travels. Organized group departures, comfortable journeys and memorable experiences since 1992.
          </p>
          <div className="mt-6 flex animate-rise flex-wrap items-center gap-3 [animation-delay:240ms] sm:mt-8">
            <Link to="/tours" className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 font-bold text-navy shadow-[0_12px_30px_-10px_rgba(245,184,41,0.8)] transition hover:-translate-y-0.5 hover:bg-[#ffc944] sm:h-14 sm:px-8">
              Explore Upcoming Tours <ArrowRight className="size-4" />
            </Link>
            <Link to="/contact" hash="book" className="inline-flex h-12 items-center rounded-full border border-white/35 px-5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:h-14 sm:px-7">
              Plan My Journey
            </Link>
          </div>
          <p className="mt-6 hidden animate-rise text-xs font-semibold tracking-[0.2em] text-white/60 uppercase [animation-delay:320ms] sm:block">
            Since 1992 <span className="mx-2 text-turquoise">•</span> Odisha-Based Travel Service
          </p>

          {featured && (
            <Link
              to="/tours/$slug"
              params={{ slug: featured.tour.slug }}
              className="mt-6 flex animate-rise items-center gap-3.5 rounded-2xl border border-white/15 bg-white/10 p-3 pr-4 backdrop-blur-md [animation-delay:320ms] lg:hidden"
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-gold text-navy">
                <span className="text-center leading-none">
                  <span className="block text-lg font-extrabold">{formatDateParts(featured.departure.date).day}</span>
                  <span className="text-[10px] font-bold uppercase">{formatDateParts(featured.departure.date).month}</span>
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold tracking-[0.2em] text-turquoise uppercase">Next departure</p>
                <p className="truncate text-sm font-bold text-white">{featured.tour.name}</p>
                <p className="text-xs text-white/70">
                  {featured.tour.durationDays} Days · from {formatINR(startingPrice(featured.departure)!)}
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-gold" />
            </Link>
          )}
        </div>

        {featured && (
          <div className="hidden animate-rise [animation-delay:400ms] lg:col-span-5 lg:block">
            <div className="ml-auto max-w-sm rounded-[1.75rem] border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-[0.24em] text-gold uppercase">Next Departure</p>
                <span className="rounded-full bg-turquoise/20 px-2.5 py-1 text-[11px] font-semibold text-[#5ee6dd]">Enquiries open</span>
              </div>
              <h2 className="mt-4 font-display text-[1.7rem] leading-tight font-semibold">{featured.tour.name}</h2>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-white/15 py-5 text-sm">
                <div>
                  <dt className="text-white/55">Departure</dt>
                  <dd className="mt-0.5 font-semibold">{formatDate(featured.departure.date)}</dd>
                </div>
                <div>
                  <dt className="text-white/55">Duration</dt>
                  <dd className="mt-0.5 font-semibold">{featured.tour.durationDays} Days</dd>
                </div>
                <div>
                  <dt className="text-white/55">From</dt>
                  <dd className="mt-0.5 font-semibold">{featured.departure.city}</dd>
                </div>
                <div>
                  <dt className="text-white/55">Starting price</dt>
                  <dd className="mt-0.5 font-semibold">
                    {formatINR(startingPrice(featured.departure)!)} <span className="text-xs font-normal text-white/60">/ seat</span>
                  </dd>
                </div>
              </dl>
              <Link to="/tours/$slug" params={{ slug: featured.tour.slug }} className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-white font-bold text-navy transition hover:bg-gold">
                View Tour Details <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function DepartureStrip() {
  const tours = publishedTours()
  return (
    <section aria-label="Upcoming departures" className="bg-navy pb-10 text-white sm:pb-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04] md:grid-cols-3 md:divide-x md:divide-y-0">
          {tours.map((t) => {
            const dep = nextDeparture(t.id)
            return (
              <Link key={t.id} to="/tours/$slug" params={{ slug: t.slug }} className="group flex items-center gap-4 p-4 transition hover:bg-white/[0.04] sm:p-5">
                <CalendarDays className={cn('size-5 shrink-0', dep ? 'text-gold' : 'text-white/40')} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/60">{dep ? `${formatDate(dep.date)} · ${dep.city}` : 'Enquire for upcoming schedule'}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-gold" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ToursSection() {
  const [filter, setFilter] = useState<FilterId>('all')
  const list = filterTours(filter)
  return (
    <section id="tours" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Tour packages" title="Your Next Journey Starts Here" intro="Discover memorable holidays, scenic destinations and spiritual journeys organized by NP Service." />
          <Link to="/tours" className="hidden shrink-0 items-center gap-2 font-semibold text-royal hover:text-navy lg:inline-flex">
            View all tours <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8">
          <TourFilters value={filter} onChange={setFilter} />
        </div>
        {list.length ? (
          <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
            {list.map((t) => (
              <TourCard key={t.id} tour={t} className="w-[86%] shrink-0 snap-center min-[430px]:w-[78%] md:w-auto" />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-border bg-white p-10 text-center">
            <p className="font-display text-xl text-navy">New departures in this category are being planned.</p>
            <p className="mt-2 text-sm text-muted-foreground">Ask our team about the next scheduled journey.</p>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
              <WhatsAppIcon className="size-4" /> Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function Destinations() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading eyebrow="Explore destinations" title={<>From Sacred Darshan <span className="italic text-royal">to Scenic Escapes.</span></>} />
        <div className="mt-10 grid gap-4 lg:h-[620px] lg:grid-cols-5 lg:grid-rows-2">
          {regions.map((r, i) => (
            <Reveal key={r.slug} delay={i * 90} className={cn(i === 0 ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-span-2')}>
              <Link to="/destinations/$region" params={{ region: r.slug }} className="group relative flex h-72 overflow-hidden rounded-[1.75rem] sm:h-80 lg:h-full">
                <Picture src={r.image} alt={r.imageAlt} widths={[640, 1000, 1400]} sizes={i === 0 ? '(min-width:1024px) 60vw, 100vw' : '(min-width:1024px) 40vw, 100vw'} className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
                <div className="relative mt-auto p-6 sm:p-8">
                  <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">{r.eyebrow}</p>
                  <h3 className={cn('mt-2 font-display font-semibold text-white', i === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[1.7rem]')}>{regionLabel[r.slug]}</h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/75">{r.places.slice(0, 4).map((p) => p.name).join(' · ')}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const reasons = [
  { icon: ShieldCheck, title: 'Since 1992', body: 'A long-established travel service with its business history anchored in 1992.' },
  { icon: UsersRound, title: 'Organized Group Journeys', body: 'Travel planning and group-tour coordination from departure to return.' },
  { icon: Bus, title: 'Comfortable Travel', body: 'AC coach transport with seat or sleeper options, depending on the package.' },
  { icon: BedDouble, title: 'Accommodation Support', body: 'Hotel arrangements made according to each tour package.' },
  { icon: UtensilsCrossed, title: 'Meal Arrangements', body: 'Organized meals under the confirmed terms of each tour.' },
  { icon: Compass, title: 'Guided Travel Assistance', body: 'Tour coordinators and assistance throughout the journey.' },
]

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Picture src="/img/np/group-taj-mahal.png" alt="An NP Service travel group in front of the Taj Mahal" widths={[480, 800]} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]" />
            <span className="absolute bottom-3 left-3 rounded-full bg-navy/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">Our travellers at the Taj Mahal</span>
          </div>
          <div className="absolute -right-2 -bottom-8 rounded-[1.5rem] bg-navy p-5 text-white shadow-2xl sm:-right-6 sm:p-6">
            <p className="font-display text-5xl leading-none font-semibold text-gold sm:text-6xl">1992</p>
            <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">Exploring India since</p>
          </div>
        </Reveal>
        <div className="pt-6 lg:pt-0">
          <SectionHeading eyebrow="Why NP Service" title="Travel With Experience. Travel With Confidence." />
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 60} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-royal shadow-sm ring-1 ring-border">
                  <r.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-navy">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function BusShowcase() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-turquoise/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionHeading tone="light" eyebrow="Travel comfort" title="Your Journey Matters as Much as Your Destination" />
          <Reveal>
            <p className="text-white/70 lg:text-lg">
              Travel in NP Service's own AC sleeper coaches, with seat or sleeper choice on packages where it is available — and freshly prepared meals served along the route.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <figure className="relative overflow-hidden rounded-[2rem] bg-[#0f2440]">
            <Picture src="/img/np/bus-np-service-ac-sleeper.png" alt="NP Service white and blue AC sleeper coach, side view" widths={[720, 1200, 1600]} className="aspect-[16/7] w-full object-cover sm:aspect-[16/5]" />
            <figcaption className="absolute bottom-0 left-0 m-3 rounded-full bg-navy/75 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur sm:m-5">NP Service AC sleeper coach</figcaption>
          </figure>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { src: '/img/np/group-coach-large.png', alt: 'A large tour group of families standing in front of their coach', title: 'Group travel experience' },
            { src: '/img/np/meal-roadside-serving.png', alt: 'Travellers being served freshly cooked food beside the coach', title: 'Meal arrangements on the route' },
            { src: '/img/np/meal-thali-nonveg.png', alt: 'A thali with rice, dal, fish fry and vegetables', title: 'Veg & non-veg options' },
          ].map((c, i) => (
            <Reveal key={c.src} delay={i * 80}>
              <figure className="group relative overflow-hidden rounded-[1.5rem]">
                <Picture src={c.src} alt={c.alt} widths={[480, 720]} sizes="(min-width:640px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 font-semibold">{c.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/45">Coach facilities are listed for each vehicle only after NP Service confirms them.</p>
      </div>
    </section>
  )
}

function Memories() {
  const items = gallery.filter((g) => g.authentic && g.category !== 'buses').slice(0, 6)
  const approved = testimonials.filter((t) => t.isApproved)
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Moments from our journeys" title={<>Travel Together. <span className="italic text-royal">Create Memories Forever.</span></>} intro="Real photographs from NP Service group tours — our travellers, our coaches and the meals shared along the way." />
          <Link to="/gallery" className="inline-flex shrink-0 items-center gap-2 font-semibold text-royal hover:text-navy">
            See all travel memories <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={i * 60} className={cn('overflow-hidden rounded-2xl', i === 0 && 'col-span-2 row-span-2', i === 3 && 'lg:col-span-2')}>
              <Link to="/gallery" className="group relative block size-full">
                <Picture src={g.src} alt={g.alt} widths={[400, 800]} sizes="(min-width:1024px) 33vw, 50vw" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-3 pt-8 text-xs font-medium text-white">{g.caption}</span>
              </Link>
            </Reveal>
          ))}
        </div>

        {approved.length === 0 && (
          <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-[1.75rem] bg-secondary p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <MessageCircle className="mt-1 size-6 shrink-0 text-turquoise" />
              <div>
                <p className="font-display text-xl text-navy">Travelled with NP Service?</p>
                <p className="mt-1 text-sm text-muted-foreground">We'd love to hear about your journey. Share your memories and photos with our team on WhatsApp.</p>
              </div>
            </div>
            <a href={whatsappUrl('Namaskar NP Service! I travelled with you and would like to share my experience.')} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">
              <WhatsAppIcon className="size-4" /> Share your story
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function HowToBook() {
  const steps = [
    { icon: RouteIcon, title: 'Choose Your Journey', body: 'Browse available tour packages and confirmed departure dates.' },
    { icon: MessageCircle, title: 'Send Your Enquiry', body: 'Select your preferred journey and share your contact details.' },
    { icon: Phone, title: 'Confirm With NP Service', body: 'Our team contacts you about availability, booking requirements and payment instructions.' },
  ]
  return (
    <section className="relative overflow-hidden bg-[#eef3fa] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading align="center" eyebrow="How to book" title="Three Simple Steps to Your Next Tour" />
        <ol className="relative mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          <div className="absolute top-10 right-[16%] left-[16%] hidden h-px border-t-2 border-dashed border-royal/20 md:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100} className="relative rounded-[1.75rem] bg-white p-6 shadow-[0_20px_40px_-30px_rgba(12,28,50,0.4)] sm:p-8 md:text-center">
              <div className="flex items-center gap-4 md:flex-col">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-navy text-gold md:size-20 md:rounded-[1.6rem]">
                  <s.icon className="size-6 md:size-8" />
                  <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-turquoise text-xs font-extrabold text-white">{i + 1}</span>
                </span>
                <h3 className="font-display text-xl font-semibold text-navy md:mt-2">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/tours" className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 font-semibold text-white hover:bg-royal">
            Explore Upcoming Tours <ArrowRight className="size-4" />
          </Link>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-7 font-semibold text-white">
            <WhatsAppIcon className="size-5" /> WhatsApp Our Team
          </a>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">Sending an enquiry does not confirm a booking. Only the NP Service team can confirm your reservation.</p>
      </div>
    </section>
  )
}

function HomeFaq() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" intro="Answers reflect each tour's approved details. Ask us anything else." />
          <Link to="/faq" className="mt-6 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy">
            All FAQs <ArrowRight className="size-4" />
          </Link>
        </div>
        <FAQAccordion items={faqs.slice(0, 5)} />
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-28">
      <Picture src="/img/dest-pilgrimage.png" alt="" widths={[800, 1600]} className="absolute inset-0 -z-10 size-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/40" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-gold">Your Journey. Our Commitment.</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold sm:text-6xl">Discover India's Wonders With NP Service.</h2>
          <p className="mt-5 text-white/75 sm:text-lg">Call or WhatsApp our Baripada team to plan your family's next holiday or pilgrimage.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" hash="book" className="inline-flex h-13 items-center justify-center rounded-full bg-gold px-8 py-3.5 font-bold text-navy hover:bg-[#ffc944]">
              Book Your Tour
            </Link>
            <a href={telHref()} className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold">
              <Phone className="size-4" /> {siteSettings.phones.primary.display}
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <MapPin className="size-4 text-turquoise" /> Badaligan, Baripada, Odisha
          </p>
        </Reveal>
      </div>
    </section>
  )
}
