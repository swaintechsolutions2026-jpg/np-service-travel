import { createFileRoute } from '@tanstack/react-router'
import { bookingTerms } from '@/data/fixtures'
import { seo } from '@/lib/seo'
import { PolicyLayout, PolicySection } from '@/components/site/PolicyLayout'

export const Route = createFileRoute('/_site/booking-terms')({
  head: () =>
    seo({
      title: 'Booking Terms | NP Service – Tour & Travels',
      description: 'Booking advance, refund, cancellation credit, documents and meal terms for NP Service group tours.',
      path: '/booking-terms',
    }),
  component: BookingTermsPage,
})

function BookingTermsPage() {
  return (
    <PolicyLayout
      eyebrow="Booking terms"
      title="Booking Terms & Travel Conditions"
      intro="Please read these terms before you book. Each tour may carry package-specific conditions, which our team explains when you enquire."
      notice="These terms summarise the conditions in the Darjeeling & Gangtok tour brochure. The final English and Odia wording of the cancellation and meal-exception policies is being reviewed by NP Service; the approved text will replace this summary."
    >
      {bookingTerms.map((t) => (
        <PolicySection key={t.id} title={t.title} badge={t.status === 'source_based' ? 'From tour brochure' : undefined}>
          {t.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </PolicySection>
      ))}
      <PolicySection title="Booking confirmation">
        <p>Submitting an enquiry through this website or WhatsApp does not confirm a booking. A reservation is confirmed only when the NP Service team confirms it with you directly. No payment is collected on this website.</p>
      </PolicySection>
    </PolicyLayout>
  )
}
