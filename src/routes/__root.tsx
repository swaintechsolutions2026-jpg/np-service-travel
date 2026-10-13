import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { siteSettings } from '@/data/fixtures'
import { seo } from '@/lib/seo'

import '../styles.css'

const siteName = 'NP Service – Tour & Travels | Group Tours & Pilgrimage Travel from Odisha'
const siteDescription =
  'Explore group tours, pilgrimage journeys and scenic holiday packages with NP Service – Tour & Travels, serving travelers from Baripada, Odisha since 1992.'

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: siteSettings.businessName,
  slogan: siteSettings.tagline,
  foundingDate: String(siteSettings.established),
  url: siteSettings.siteUrl,
  telephone: [siteSettings.phones.primary.e164, siteSettings.phones.secondary.e164],
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteSettings.address.line1,
    addressLocality: siteSettings.address.city,
    addressRegion: siteSettings.address.state,
    postalCode: siteSettings.address.postalCode,
    addressCountry: 'IN',
  },
  areaServed: 'Odisha, India',
}

export const Route = createRootRoute({
  head: () => {
    const base = seo({ title: siteName, description: siteDescription, path: '/' })
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#0c1c32' },
        ...base.meta,
      ],
      links: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Noto+Sans+Oriya:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      ],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify(travelAgencySchema) }],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-center" />
        <Scripts />
      </body>
    </html>
  )
}
