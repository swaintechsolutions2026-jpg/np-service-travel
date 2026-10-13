import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowRight, Check, Info, MapPin } from 'lucide-react'
import { gallery } from '@/data/fixtures'
import { getRegion, regionLabel, toursInRegion, whatsappUrl, telHref } from '@/lib/tours'
import { seo } from '@/lib/seo'
import { PageHero } from '@/components/site/PageHero'
import { TourCard } from '@/components/site/TourCard'
import { Gallery } from '@/components/site/Gallery'
import { Reveal, SectionHeading, WhatsAppIcon } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/destinations/$region')({
  loader: ({ params }) => {
    const region = getRegion(params.region)
    if (!region) throw notFound()
    return { region }
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          title: `${loaderData.region.title} | NP Service – Tour & Travels`,
          description: `${loaderData.region.intro} Group tours from Odisha with NP Service.`,
          path: `/destinations/${loaderData.region.slug}`,
          image: loaderData.region.image,
        })
      : {},
  component: RegionPage,
})

const regionPhotos: Record<string, string[]> = {
  'darjeeling-sikkim': ['brochure-kanchenjunga', 'brochure-tea-garden', 'brochure-toy-train', 'brochure-batasia', 'brochure-tsomgo', 'brochure-nathula'],
  'north-india': ['group-taj', 'group-bodh-gaya'],
  'south-india': [],
}

function RegionPage() {
  const { region } = Route.useLoaderData()
  const tours = toursInRegion(region.slug)
  const photos = gallery.filter((g) => regionPhotos[region.slug]?.includes(g.id))
  return (
    <>
      <PageHero eyebrow={region.eyebrow} title={region.title} intro={region.intro} image={region.image} imageAlt={region.imageAlt}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" search={{ tour: tours[0]?.slug }} hash="book" className="inline-flex h-12 items-center rounded-full bg-gold px-6 font-bold text-navy">
            Enquire Now
          </Link>
          <a href={whatsappUrl(`Namaskar NP Service! Please share upcoming ${regionLabel[region.slug]} tour dates and package details.`)} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-semibold text-white">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </div>
      </PageHero>

      {region.scheduleNotice && (
        <div className="bg-gold/95 text-navy">
          <p className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 text-sm font-semibold sm:px-6">
            <Info className="size-4 shrink-0" /> {region.scheduleNotice}
          </p>
        </div>
      )}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading eyebrow="Places on the route" title={`Destinations in ${regionLabel[region.slug]}`} intro={region.scheduleNotice ? 'Destinations featured in our journeys. The final list is confirmed with each departure.' : undefined} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {region.places.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 50} className="rounded-2xl bg-background p-5 ring-1 ring-border">
                <MapPin className="size-5 text-turquoise" />
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading tone="light" eyebrow="Travel with NP Service" title="Organized from Odisha, together as a group" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {region.features.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-sm ring-1 ring-white/10">
                <Check className="size-4 shrink-0 text-gold" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading eyebrow="Tour packages" title="Tours in this region" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
            <div className="flex flex-col justify-between rounded-[1.6rem] bg-royal p-7 text-white">
              <div>
                <p className="font-display text-2xl font-semibold">Planning a group or family journey?</p>
                <p className="mt-3 text-sm text-white/75">Tell us your preferred dates and number of travellers. We'll share the next confirmed departure.</p>
              </div>
              <div className="mt-6 grid gap-2">
                <Link to="/contact" hash="book" className="flex h-11 items-center justify-center gap-2 rounded-full bg-gold font-bold text-navy">
                  Send an enquiry <ArrowRight className="size-4" />
                </Link>
                <a href={telHref()} className="flex h-11 items-center justify-center rounded-full border border-white/30 text-sm font-semibold">Call our team</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <SectionHeading eyebrow="Gallery" title="Glimpses of the journey" />
            <Gallery items={photos} className="mt-10" />
          </div>
        </section>
      )}
    </>
  )
}
