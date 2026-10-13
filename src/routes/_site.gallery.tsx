import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { gallery, galleryCategories, type GalleryCategory } from '@/data/fixtures'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { PageHero } from '@/components/site/PageHero'
import { Gallery } from '@/components/site/Gallery'
import { SectionHeading } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/gallery')({
  head: () =>
    seo({
      title: 'Our Travel Memories | NP Service – Tour & Travels',
      description: 'Real photographs from NP Service group tours: our AC sleeper coaches, travellers at the Taj Mahal and Bodh Gaya, and meals on the journey.',
      path: '/gallery',
      image: '/img/np/group-taj-mahal.png',
    }),
  component: GalleryPage,
})

function GalleryPage() {
  const [cat, setCat] = useState<GalleryCategory | 'all'>('all')
  const authentic = gallery.filter((g) => g.authentic && (cat === 'all' || g.category === cat))
  const destinations = gallery.filter((g) => !g.authentic)
  const tabs = [{ id: 'all' as const, label: 'All' }, ...galleryCategories.filter((c) => c.id !== 'destinations')]

  return (
    <>
      <PageHero eyebrow="Our travel memories" title="Moments From Our Journeys" intro="Genuine photographs from NP Service tours — our coaches, our travellers and the meals shared along the road." image="/img/np/group-coach-large.png" imageAlt="NP Service tour group in front of their coach" />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Photo categories">
            {tabs.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={cat === t.id} onClick={() => setCat(t.id)} className={cn('h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition', cat === t.id ? 'bg-navy text-white' : 'bg-secondary text-navy hover:bg-border')}>
                {t.label}
              </button>
            ))}
          </div>
          <Gallery items={authentic} className="mt-8" />
          <p className="mt-4 text-xs text-muted-foreground">All photos in this section are from NP Service tours. Higher-resolution originals are being collected from the team.</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading eyebrow="Destinations" title="Places We Travel To" intro="Destination images from our tour brochures, to help you picture the journey. These are not photographs of completed NP Service trips." />
          <Gallery items={destinations} className="mt-10" />
        </div>
      </section>
    </>
  )
}
