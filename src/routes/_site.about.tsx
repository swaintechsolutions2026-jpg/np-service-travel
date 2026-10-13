import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { siteSettings } from '@/data/fixtures'
import { seo } from '@/lib/seo'
import { telHref, whatsappUrl } from '@/lib/tours'
import { PageHero } from '@/components/site/PageHero'
import { Eyebrow, Picture, Reveal, SectionHeading, WhatsAppIcon } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/about')({
  head: () =>
    seo({
      title: 'About NP Service – Journeys Built on Trust Since 1992',
      description: 'NP Service – Tour & Travels is based in Baripada, Odisha, organizing group tours and pilgrimage journeys across India since 1992.',
      path: '/about',
      image: '/img/np/office-np-logo.png',
    }),
  component: AboutPage,
})

const timeline = [
  { mark: '1992', title: 'NP Service begins', body: 'The business is established in Baripada, Odisha — the founding year behind “Service You Trust Since 1992”.' },
  { mark: 'Over the years', title: 'Group tours & pilgrimages', body: 'NP Service organizes group journeys and pilgrimages to sacred and scenic destinations across India.' },
  { mark: 'Today', title: 'Own coaches, organized departures', body: 'Travellers journey in NP Service AC sleeper coaches, with stays, meals and sightseeing coordinated by the team.' },
  { mark: 'Oct 2026', title: 'Darjeeling & Gangtok departure', body: 'The next confirmed group journey leaves Bhubaneswar for the Eastern Himalaya on 17 October 2026.' },
]

function AboutPage() {
  const a = siteSettings.address
  return (
    <>
      <PageHero eyebrow="About NP Service" title="Journeys Built on Trust Since 1992" image="/img/dest-pilgrimage.png" />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="font-display text-2xl leading-snug text-navy sm:text-[2rem]">
              NP Service – Tour &amp; Travels is based in Baripada, Odisha. With a business history dating back to 1992, NP Service organizes travel experiences, group tours and pilgrimage journeys to memorable destinations across India.
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Families, pilgrims and groups from across Odisha travel with us to the Himalaya, the holy cities of the north and the temple towns of the south. We plan the route, travel in our own AC coaches and coordinate hotels, meals and sightseeing, so our travellers can focus on the journey.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <figure className="overflow-hidden rounded-[2rem]">
              <Picture src="/img/np/office-np-logo.png" alt="Inside the NP Service office, with the NP Tour & Travel Agency logo on the wall" widths={[480, 800]} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/5] w-full object-cover object-top" />
              <figcaption className="bg-navy px-5 py-3 text-sm text-white/80">At the NP Service office</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading tone="light" eyebrow="Our journey" title="Exploring India Since 1992" />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 90} className="relative border-t border-white/15 pt-6">
                <span className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-gold" />
                <p className="font-display text-3xl font-semibold text-gold">{t.mark}</p>
                <h3 className="mt-3 font-bold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-3">
          {[
            { title: 'Tours & pilgrimages', body: 'Hill-station holidays like Darjeeling & Gangtok, and pilgrimage journeys across North and South India.', img: '/img/np/group-bodh-gaya.png', alt: 'NP Service travellers at the Mahabodhi Temple, Bodh Gaya' },
            { title: 'Comfort & coordination', body: 'AC coach travel with seat or sleeper options on packages where available, with hotels and meals arranged.', img: '/img/np/bus-np-service-ac-sleeper.png', alt: 'NP Service AC sleeper coach' },
            { title: 'Real travel moments', body: 'Our gallery shows real NP Service journeys — the people, the coaches and the meals shared on the road.', img: '/img/np/group-coach-large.png', alt: 'A large NP Service tour group beside their coach' },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-border">
              <Picture src={c.img} alt={c.alt} widths={[480, 720]} sizes="(min-width:1024px) 33vw, 100vw" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col gap-6 rounded-[2rem] bg-[#eef3fa] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Eyebrow>Visit or call us</Eyebrow>
              <p className="mt-3 font-display text-2xl font-semibold text-navy sm:text-3xl">{siteSettings.businessName}</p>
              <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4 text-turquoise" /> {a.line1}, {a.city}, {a.state} – {a.postalCode}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={telHref()} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 font-semibold text-white">
                <Phone className="size-4" /> {siteSettings.phones.primary.display}
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-white">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
              <Link to="/tours" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-navy/15 px-6 font-semibold text-navy">
                View tours <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
