import { useMemo, useState } from 'react'
import { AlertCircle, ArrowLeft, Info, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteSettings } from '@/data/fixtures'
import {
  buildEnquiryMessage,
  formatDate,
  formatINR,
  normalizeIndianMobile,
  publishedTours,
  telHref,
  upcomingDepartures,
  whatsappUrl,
} from '@/lib/tours'
import { cn } from '@/lib/utils'
import { WhatsAppIcon } from './primitives'

const NO_DATE = '__ask__'

type Errors = Partial<Record<'name' | 'mobile' | 'whatsapp' | 'tour' | 'travelers' | 'city' | 'consent' | 'travelType', string>>

const selectClass =
  'h-12 w-full rounded-xl border border-input bg-white px-3.5 text-[15px] text-navy outline-none focus-visible:border-turquoise focus-visible:ring-[3px] focus-visible:ring-turquoise/25 aria-invalid:border-destructive'
const inputClass = 'h-12 rounded-xl bg-white px-3.5 text-[15px]'

function Field({ id, label, optional, error, children, className }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('grid gap-1.5', className)}>
      <Label htmlFor={id} className="text-[13px] font-semibold text-navy">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs font-medium text-destructive">
          <AlertCircle className="size-3.5" /> {error}
        </p>
      )}
    </div>
  )
}

/**
 * Booking enquiry form. Builds a pre-filled WhatsApp message the customer reviews and sends.
 * Saving enquiries to the database arrives with the enquiry pipeline milestone (see PLAN.md);
 * until then the form never claims a lead was stored.
 */
export function BookingForm({ defaultTour, idPrefix = 'bk' }: { defaultTour?: string; idPrefix?: string }) {
  const tours = publishedTours()
  const [tourSlug, setTourSlug] = useState(defaultTour && tours.some((t) => t.slug === defaultTour) ? defaultTour : '')
  const tour = tours.find((t) => t.slug === tourSlug)
  const deps = useMemo(() => (tour ? upcomingDepartures(tour.id).filter((d) => d.bookingStatus === 'open') : []), [tour])

  const [departureId, setDepartureId] = useState('')
  const dep = deps.find((d) => d.id === departureId) ?? (deps.length === 1 && departureId !== NO_DATE ? deps[0] : undefined)
  const effectiveDepartureId = dep?.id ?? (departureId || (deps.length ? '' : NO_DATE))

  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [sameWhatsapp, setSameWhatsapp] = useState(false)
  const [whatsapp, setWhatsapp] = useState('')
  const [travelType, setTravelType] = useState('')
  const [travelers, setTravelers] = useState('2')
  const [boarding, setBoarding] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [review, setReview] = useState<string | null>(null)

  const hasTypes = Boolean(dep && (dep.seatPrice || dep.sleeperPrice))
  const pickupPoints = dep?.pickupPoints ?? []

  function validate(): Errors {
    const e: Errors = {}
    if (name.trim().length < 2) e.name = 'Please enter your full name.'
    if (!normalizeIndianMobile(mobile)) e.mobile = 'Enter a valid 10-digit Indian mobile number.'
    if (!sameWhatsapp && whatsapp.trim() && !normalizeIndianMobile(whatsapp)) e.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
    if (!tour) e.tour = 'Please choose a tour package.'
    const n = Number(travelers)
    if (!Number.isInteger(n) || n < 1 || n > 60) e.travelers = 'Enter between 1 and 60 travellers.'
    if (city.trim().length < 2) e.city = 'Please enter your city or district.'
    if (hasTypes && !travelType) e.travelType = 'Choose seat or sleeper.'
    if (!consent) e.consent = 'Please allow NP Service to contact you about this enquiry.'
    return e
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0]
      document.getElementById(`${idPrefix}-${first}`)?.focus()
      return
    }
    const phone = `+91 ${normalizeIndianMobile(mobile)}`
    const wa = sameWhatsapp ? phone : whatsapp.trim() ? `+91 ${normalizeIndianMobile(whatsapp)}` : null
    const lines = buildEnquiryMessage({
      tour: tour!.name,
      departure: dep ? `${formatDate(dep.date)}${dep.time ? `, ${dep.time}` : ''} from ${dep.city}` : 'Please share upcoming dates',
      travelers: travelers,
      travelType: hasTypes ? travelType : undefined,
      name: name.trim(),
      phone,
      city: city.trim(),
    })
    const extra = [
      wa && wa !== phone ? `WhatsApp: ${wa}` : null,
      boarding ? `Preferred boarding: ${boarding}` : null,
      message.trim() ? `Message: ${message.trim()}` : null,
    ].filter(Boolean)
    setReview(extra.length ? lines.replace('\n\nPlease share', `\n${extra.join('\n')}\n\nPlease share`) : lines)
  }

  const err = (k: keyof Errors) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${idPrefix}-${k}-error` } : {})

  if (review) {
    return (
      <div className="grid gap-5" aria-live="polite">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-turquoise">Review your message</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-navy">Send your enquiry on WhatsApp</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            WhatsApp opens with this message ready. Tap send in WhatsApp to reach the NP Service team on {siteSettings.whatsapp.display}.
          </p>
        </div>
        <pre className="max-h-72 overflow-auto rounded-2xl bg-[#e7f8ee] p-4 font-sans text-[13px] leading-relaxed whitespace-pre-wrap text-navy ring-1 ring-[#25D366]/25">{review}</pre>
        <div className="flex gap-2.5 rounded-xl bg-secondary p-3.5 text-[13px] text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-royal" />
          <p>
            This is an enquiry, not a confirmed booking. Online enquiry saving is being set up, so please send the message on WhatsApp or call us — your booking is confirmed only when our team confirms it with you.
          </p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <a href={whatsappUrl(review)} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] font-bold text-white transition hover:brightness-95">
            <WhatsAppIcon className="size-5" /> Open WhatsApp
          </a>
          <a href={telHref()} className="flex h-12 items-center justify-center gap-2 rounded-full border border-navy/15 font-semibold text-navy">
            <Phone className="size-4" /> Call {siteSettings.phones.primary.display}
          </a>
        </div>
        <button type="button" onClick={() => setReview(null)} className="flex items-center justify-center gap-1.5 text-sm font-semibold text-royal">
          <ArrowLeft className="size-4" /> Edit details
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field id={`${idPrefix}-name`} label="Full name" error={errors.name}>
        <Input id={`${idPrefix}-name`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} {...err('name')} />
      </Field>
      <Field id={`${idPrefix}-mobile`} label="Mobile number" error={errors.mobile}>
        <div className="flex">
          <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-input bg-secondary px-3 text-sm font-semibold text-navy">+91</span>
          <Input id={`${idPrefix}-mobile`} type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98XXXXXXXX" value={mobile} onChange={(e) => setMobile(e.target.value)} className={cn(inputClass, 'rounded-l-none')} {...err('mobile')} />
        </div>
      </Field>

      <Field id={`${idPrefix}-whatsapp`} label="WhatsApp number" optional error={errors.whatsapp} className="sm:col-span-2">
        <label className="flex items-center gap-2.5 text-sm text-navy">
          <input type="checkbox" checked={sameWhatsapp} onChange={(e) => setSameWhatsapp(e.target.checked)} className="size-4 accent-[#08afa5]" />
          My WhatsApp number is the same as my mobile number
        </label>
        {!sameWhatsapp && (
          <Input id={`${idPrefix}-whatsapp`} type="tel" inputMode="numeric" placeholder="If different from mobile" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputClass} {...err('whatsapp')} />
        )}
      </Field>

      <Field id={`${idPrefix}-tour`} label="Tour package" error={errors.tour} className="sm:col-span-2">
        <select
          id={`${idPrefix}-tour`}
          value={tourSlug}
          onChange={(e) => {
            setTourSlug(e.target.value)
            setDepartureId('')
            setTravelType('')
            setBoarding('')
          }}
          className={selectClass}
          {...err('tour')}
        >
          <option value="">Select a tour</option>
          {tours.map((t) => (
            <option key={t.id} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${idPrefix}-departure`} label="Preferred departure date">
        <select id={`${idPrefix}-departure`} value={effectiveDepartureId} onChange={(e) => setDepartureId(e.target.value)} className={selectClass} disabled={!tour}>
          {deps.length > 1 && <option value="">Select a date</option>}
          {deps.map((d) => (
            <option key={d.id} value={d.id}>
              {formatDate(d.date)} · {d.city}
            </option>
          ))}
          <option value={NO_DATE}>{deps.length ? 'Ask about other dates' : 'Upcoming dates to be shared'}</option>
        </select>
      </Field>

      <Field id={`${idPrefix}-travelers`} label="Number of travellers" error={errors.travelers}>
        <Input id={`${idPrefix}-travelers`} type="number" inputMode="numeric" min={1} max={60} value={travelers} onChange={(e) => setTravelers(e.target.value)} className={inputClass} {...err('travelers')} />
      </Field>

      {hasTypes && dep && (
        <fieldset className="grid gap-1.5 sm:col-span-2" id={`${idPrefix}-travelType`} tabIndex={-1}>
          <legend className="mb-1.5 text-[13px] font-semibold text-navy">Seat or sleeper</legend>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { v: 'Seat', price: dep.seatPrice },
              { v: 'Sleeper', price: dep.sleeperPrice },
            ]
              .filter((o) => o.price)
              .map((o) => (
                <label key={o.v} className={cn('cursor-pointer rounded-xl border p-3.5 transition', travelType === o.v ? 'border-turquoise bg-turquoise/8 ring-2 ring-turquoise/25' : 'border-input bg-white')}>
                  <input type="radio" name={`${idPrefix}-type`} value={o.v} checked={travelType === o.v} onChange={() => setTravelType(o.v)} className="sr-only" />
                  <span className="block text-sm font-bold text-navy">{o.v}</span>
                  <span className="text-[13px] text-muted-foreground">{formatINR(o.price!)} per person</span>
                </label>
              ))}
          </div>
          {errors.travelType && (
            <p id={`${idPrefix}-travelType-error`} className="flex items-center gap-1 text-xs font-medium text-destructive">
              <AlertCircle className="size-3.5" /> {errors.travelType}
            </p>
          )}
        </fieldset>
      )}

      <Field id={`${idPrefix}-boarding`} label="Preferred boarding point">
        <select id={`${idPrefix}-boarding`} value={boarding} onChange={(e) => setBoarding(e.target.value)} className={selectClass} disabled={!tour}>
          <option value="">{pickupPoints.length ? 'Select boarding point' : 'To be confirmed by NP Service'}</option>
          {pickupPoints.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${idPrefix}-city`} label="Your city / district" error={errors.city}>
        <Input id={`${idPrefix}-city`} autoComplete="address-level2" placeholder="e.g. Baripada, Mayurbhanj" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} {...err('city')} />
      </Field>

      <Field id={`${idPrefix}-message`} label="Message" optional className="sm:col-span-2">
        <Textarea id={`${idPrefix}-message`} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any questions, special requirements or travel companions" className="rounded-xl bg-white px-3.5 text-[15px]" />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[13px] leading-relaxed text-navy">
          <input id={`${idPrefix}-consent`} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[#08afa5]" {...err('consent')} />
          I agree that NP Service may contact me by phone or WhatsApp about this enquiry.
        </label>
        {errors.consent && (
          <p id={`${idPrefix}-consent-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive">
            <AlertCircle className="size-3.5" /> {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" className="h-13 rounded-full bg-gold py-3.5 text-base font-bold text-navy hover:bg-[#ffc944] sm:col-span-2">
        Continue to WhatsApp
      </Button>
      <p className="text-center text-xs text-muted-foreground sm:col-span-2">
        No payment is taken online. Our team shares availability and payment instructions directly.
      </p>
    </form>
  )
}
