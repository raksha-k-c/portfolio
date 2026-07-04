import { useEffect } from 'react'

const SITE = 'Raksha KC'
const BASE = 'https://rakshakc.xyz'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Lightweight SEO for a Vite SPA: updates title, meta description, Open Graph,
 * Twitter cards, canonical link, and optional JSON-LD structured data.
 * (Note: this is client-side; for crawler-critical SEO an SSR framework helps,
 * but this covers titles, sharing previews, and structured data well.)
 */
export default function SEO({ title, description, path = '', image, type = 'website', jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE}` : `${SITE} · Software Developer & AI Engineer`
    document.title = fullTitle
    const url = BASE + path

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:site_name', SITE)
    if (image) setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    if (image) setMeta('name', 'twitter:image', image)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    let ld
    if (jsonLd) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(ld)
    }
    return () => {
      if (ld) document.head.removeChild(ld)
    }
  }, [title, description, path, image, type, jsonLd])

  return null
}
