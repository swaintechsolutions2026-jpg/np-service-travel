import {
  departures,
  regions,
  siteSettings,
  tours,
  type Departure,
  type RegionSlug,
  type Tour,
} from '@/data/fixtures'

/** Today's date in India as YYYY-MM-DD, so server and browser agree. */
export function todayIST() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
}

export function isUpcoming(dep: Departure, today = todayIST()) {
  return dep.approval === 'confirmed' && dep.date >= today
}

export function publishedTours() {
  return tours.filter((t) => t.publishStatus === 'published')
}

export function getTour(slug: string) {
  return publishedTours().find((t) => t.slug === slug)
}

export function getRegion(slug: string) {
  return regions.find((r) => r.slug === slug)
}

export function toursInRegion(slug: RegionSlug) {
  return publishedTours().filter((t) => t.region === slug)
}

/** Confirmed, future, bookable departures — the only ones shown publicly as offers. */
export function upcomingDepartures(tourId: string) {
  return departures
    .filter((d) => d.tourId === tourId && isUpcoming(d))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function pastDepartures(tourId: string) {
  const today = todayIST()
  return departures.filter((d) => d.tourId === tourId && d.approval === 'confirmed' && d.date < today)
}

export function nextDeparture(tourId: string) {
  return upcomingDepartures(tourId)[0]
}

/** The featured, confirmed departure for the homepage hero panel. */
export function featuredDeparture(): { tour: Tour; departure: Departure } | undefined {
  const featured = publishedTours().filter((t) => t.isFeatured)
  for (const tour of featured) {
    const dep = nextDeparture(tour.id)
    if (dep) return { tour, departure: dep }
  }
}

export function startingPrice(dep?: Departure) {
  if (!dep) return undefined
  const prices = [dep.seatPrice, dep.sleeperPrice].filter((p): p is number => typeof p === 'number')
  return prices.length ? Math.min(...prices) : undefined
}

export function formatINR(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', { ...opts, timeZone: 'UTC' })
}

export function formatDateParts(iso: string) {
  return {
    day: formatDate(iso, { day: '2-digit' }),
    month: formatDate(iso, { month: 'short' }),
    year: formatDate(iso, { year: 'numeric' }),
  }
}

/** Netlify Image CDN URL for a file in /public. */
export function img(src: string, w: number, q = 75) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&q=${q}&fm=webp`
}

export function imgSrcSet(src: string, widths: number[]) {
  return widths.map((w) => `${img(src, w)} ${w}w`).join(', ')
}

export const telHref = (e164: string = siteSettings.phones.primary.e164) => `tel:${e164}`

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteSettings.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export interface EnquiryMessage {
  tour: string
  departure: string
  travelers: string
  travelType?: string
  name: string
  phone: string
  city: string
}

export function buildEnquiryMessage(e: EnquiryMessage) {
  return [
    'Namaskar NP Service! I would like to enquire about a tour.',
    '',
    `Tour: ${e.tour}`,
    `Departure: ${e.departure}`,
    `Travelers: ${e.travelers}`,
    e.travelType ? `Travel Type: ${e.travelType}` : null,
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    `City: ${e.city}`,
    '',
    'Please share availability, payment details and booking instructions.',
  ]
    .filter((l) => l !== null)
    .join('\n')
}

/** Accepts 10-digit Indian mobiles with optional +91 / 91 / 0 prefix. Returns 10 digits or null. */
export function normalizeIndianMobile(input: string) {
  const digits = input.replace(/[^\d]/g, '')
  const m = digits.match(/^(?:91|0)?([6-9]\d{9})$/)
  return m ? m[1] : null
}

export const regionLabel: Record<RegionSlug, string> = {
  'north-india': 'North India',
  'south-india': 'South India',
  'darjeeling-sikkim': 'Darjeeling & Sikkim',
}
