import { siteSettings } from '@/data/fixtures'

const defaultImage = '/img/hero-darjeeling.png'

/** Builds unique title, description, Open Graph and canonical tags for a route. */
export function seo({
  title,
  description,
  path,
  image = defaultImage,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
}) {
  const url = `${siteSettings.siteUrl}${path}`
  const imageUrl = `${siteSettings.siteUrl}/.netlify/images?url=${encodeURIComponent(image)}&w=1200&h=630&fit=cover&fm=jpg`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteSettings.businessName },
      { name: 'twitter:card', content: 'summary_large_image' },
      ...(noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
