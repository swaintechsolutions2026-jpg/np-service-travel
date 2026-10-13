import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { siteSettings } from '@/data/fixtures'
import { seo } from '@/lib/seo'
import { telHref, whatsappUrl } from '@/lib/tours'
import { PageHero } from '@/components/site/PageHero'
import { BookingForm } from '@/components/site/BookingForm'
import { Eyebrow, WhatsAppIcon } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/contact')({
  validateSearch: (search: Record<string, unknown>): { tour?: string } => ({
    tour: typeof search.tour === 'string' ? search.tour : undefined,
  }),
  head: () =>
    seo({
      title: 'Contact & Booking Enquiry | NP Service – Tour & Travels, Baripada',
      description: 'Call, WhatsApp or send a tour enquiry to NP Service – Tour & Travels, Badaligan, Baripada, Odisha. +91 98617 17404.',
      path: '/contact',
    }),
  component: ContactPage,
})

function ContactPage() {
  const { tour } = Route.useSearch()
  const a = siteSettings.address
  const socials = siteSettings.socials.filter((s) => s.status === 'verified')
  return (
    <>
      <PageHero eyebrow="Contact & booking" title="Let's Plan Your Journey" intro="Call or WhatsApp our Baripada team, or send your enquiry below. We'll get back to you with availability and booking instructions." image="/img/dest-gangtok.png" />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="grid content-start gap-4">
            <a href={telHref()} className="group flex items-center gap-4 rounded-[1.5rem] bg-navy p-5 text-white transition hover:bg-royal">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-gold"><Phone className="size-5" /></span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-white/60 uppercase">Primary · Call</span>
                <span className="text-lg font-bold">{siteSettings.phones.primary.display}</span>
              </span>
            </a>
            <a href={telHref(siteSettings.phones.secondary.e164)} className="flex items-center gap-4 rounded-[1.5rem] bg-white p-5 ring-1 ring-border transition hover:ring-turquoise">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-royal"><Phone className="size-5" /></span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">Secondary · Call</span>
                <span className="text-lg font-bold text-navy">{siteSettings.phones.secondary.display}</span>
              </span>
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-[1.5rem] bg-[#25D366] p-5 text-white transition hover:brightness-95">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/20"><WhatsAppIcon className="size-6" /></span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-white/80 uppercase">WhatsApp</span>
                <span className="text-lg font-bold">{siteSettings.whatsapp.display}</span>
              </span>
            </a>
            <div className="rounded-[1.5rem] bg-white p-6 ring-1 ring-border">
              <p className="font-display text-xl font-semibold text-navy">{siteSettings.businessName}</p>
              <address className="mt-4 space-y-3 text-sm text-navy/80 not-italic">
                <p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-turquoise" /> {a.line1}, {a.city}, {a.state} – {a.postalCode}, {a.country}</p>
                {siteSettings.workingHours && <p className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-turquoise" /> {siteSettings.workingHours}</p>}
                <p className="flex gap-3 text-muted-foreground"><Mail className="mt-0.5 size-4 shrink-0 text-turquoise" /> Official email will be listed here soon</p>
              </address>
              {socials.length > 0 && (
                <ul className="mt-4 flex gap-4 text-sm font-semibold text-royal">
                  {socials.map((s) => <li key={s.platform}><a href={s.url} target="_blank" rel="noreferrer">{s.platform}</a></li>)}
                </ul>
              )}
            </div>
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-border">
              {siteSettings.mapEmbedUrl ? (
                <iframe title="NP Service office location" src={siteSettings.mapEmbedUrl} loading="lazy" className="h-64 w-full border-0" />
              ) : (
                <div className="grid h-48 place-items-center bg-[radial-gradient(circle_at_30%_30%,#dfe8f4,#eef3fa)] p-6 text-center">
                  <div>
                    <MapPin className="mx-auto size-7 text-royal" />
                    <p className="mt-2 font-semibold text-navy">Badaligan, Baripada</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Badaligan, Baripada, Odisha 757017')}`} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-semibold text-royal underline-offset-4 hover:underline">
                      Open area in Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="book" className="scroll-mt-24 rounded-[1.75rem] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(12,28,50,0.5)] ring-1 ring-border sm:p-8">
            <Eyebrow>Booking enquiry</Eyebrow>
            <h2 className="mt-3 mb-6 font-display text-3xl font-semibold text-navy">Send your tour enquiry</h2>
            <BookingForm key={tour ?? 'none'} defaultTour={tour} idPrefix="contact" />
          </div>
        </div>
      </section>
    </>
  )
}
