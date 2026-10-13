import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/lib/seo'
import { PageHero } from '@/components/site/PageHero'
import { TourCard } from '@/components/site/TourCard'
import { TourFilters, filterTours, type FilterId } from '@/components/site/TourFilters'
import { whatsappUrl } from '@/lib/tours'
import { WhatsAppIcon } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/tours/')({
  head: () =>
    seo({
      title: 'Upcoming Tours & Group Departures | NP Service – Tour & Travels',
      description: 'Browse upcoming group tours from Odisha: Darjeeling & Gangtok, North India pilgrimages and South India darshan tours with NP Service.',
      path: '/tours',
    }),
  component: ToursPage,
})

function ToursPage() {
  const [filter, setFilter] = useState<FilterId>('all')
  const list = filterTours(filter)
  return (
    <>
      <PageHero eyebrow="All tours" title="Your Next Journey Starts Here" intro="Discover memorable holidays, scenic destinations and spiritual journeys organized by NP Service. Confirmed dates and prices are shown; other tours are open for enquiry." image="/img/dest-hills.png" />
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <TourFilters value={filter} onChange={setFilter} />
          {list.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-border bg-white p-10 text-center">
              <p className="font-display text-xl text-navy">New departures in this category are being planned.</p>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
                <WhatsAppIcon className="size-4" /> Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
