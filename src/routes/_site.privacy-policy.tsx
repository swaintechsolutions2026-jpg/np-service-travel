import { createFileRoute } from '@tanstack/react-router'
import { siteSettings } from '@/data/fixtures'
import { seo } from '@/lib/seo'
import { PolicyLayout, PolicySection } from '@/components/site/PolicyLayout'

export const Route = createFileRoute('/_site/privacy-policy')({
  head: () =>
    seo({
      title: 'Privacy Policy | NP Service – Tour & Travels',
      description: 'How NP Service – Tour & Travels handles the personal details you share when you enquire about a tour.',
      path: '/privacy-policy',
    }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <PolicyLayout eyebrow="Privacy" title="Privacy Policy" intro="Your trust matters to us. This page explains what we collect when you enquire about a tour and how we use it." notice="This policy is a draft awaiting final approval by NP Service.">
      <PolicySection title="What we collect">
        <p>When you send an enquiry we ask for your name, mobile and WhatsApp number, the tour and departure you are interested in, the number of travellers, your preferred boarding point, your city or district and any message you choose to add.</p>
      </PolicySection>
      <PolicySection title="How we use it">
        <p>We use these details only to respond to your enquiry, discuss availability, share booking and payment instructions, and follow up about your tour. You give consent for this contact when you submit the form.</p>
      </PolicySection>
      <PolicySection title="WhatsApp messages">
        <p>When you choose to contact us on WhatsApp, the message is sent through WhatsApp, which is operated by a third party under its own privacy policy. You review the message before sending it.</p>
      </PolicySection>
      <PolicySection title="Who can see your details">
        <p>Enquiry details are visible only to authorised NP Service staff. We do not sell your personal information.</p>
      </PolicySection>
      <PolicySection title="Identity documents">
        <p>Identity documents needed for travel or permits are requested directly by our team for confirmed bookings, never through public website forms.</p>
      </PolicySection>
      <PolicySection title="Contact">
        <p>
          For any question about your information, call {siteSettings.phones.primary.display} or visit us at {siteSettings.address.line1}, {siteSettings.address.city}, {siteSettings.address.state} – {siteSettings.address.postalCode}.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
