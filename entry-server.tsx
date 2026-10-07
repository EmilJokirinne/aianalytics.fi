// Esirenderöinti: tuottaa sivun valmiin HTML:n hakukoneita ja nopeaa ensilatausta varten.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { SITE } from './config'
import { FAQ } from './SectionsTrust'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export function structuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      inLanguage: 'fi-FI',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      email: SITE.contactEmail,
      areaServed: 'FI',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'AI-analytiikka yrityksille | AI Analytics',
      url: SITE.url,
      inLanguage: 'fi-FI',
      description:
        'Mitä AI-analytiikka on ja miten tekoälyä voidaan hyödyntää suomalaisessa liiketoiminnassa? Tutustu ennustamiseen, data-analytiikkaan, optimointiin ja käytännön käyttökohteisiin.',
      about: ['AI-analytiikka', 'Ennakoiva analytiikka', 'Koneoppiminen', 'Business intelligence'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
}
