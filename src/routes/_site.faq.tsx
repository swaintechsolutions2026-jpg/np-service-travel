import { createFileRoute } from '@tanstack/react-router'
import { faqs } from '@/data/fixtures'
import { seo } from '@/lib/seo'
import { telHref, whatsappUrl } from '@/lib/tours'
import { PageHero } from '@/components/site/PageHero'
import { FAQAccordion, faqSchema } from '@/components/site/FAQAccordion'
import { WhatsAppIcon } from '@/components/site/primitives'

export const Route = createFileRoute('/_site/faq')({
  head: () => ({
    ...seo({
      title: 'Frequently Asked Questions | NP Service – Tour & Travels',
      description: 'How to book an NP Service tour, departure points, AC coaches, meals, accommodation, documents and cancellation — answered.',
      path: '/faq',
    }),
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(faqSchema(faqs)) }],
  }),
  component: FaqPage,
})

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Help" title="Frequently Asked Questions" intro="Answers reflect each tour's approved details. For anything else, our team is a call or WhatsApp away." image="/img/dest-hills.png" />
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <FAQAccordion items={faqs.filter((f) => f.language === 'en')} />
          <div className="mt-12 rounded-[1.75rem] bg-navy p-7 text-center text-white">
            <p className="font-display text-2xl">Still have a question?</p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold">
                <WhatsAppIcon className="size-4" /> WhatsApp us
              </a>
              <a href={telHref()} className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 font-semibold">Call +91 98617 17404</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
