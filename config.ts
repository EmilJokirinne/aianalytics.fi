// Sivuston keskeiset asetukset. Muokkaa tätä tiedostoa ennen julkaisua.

export const SITE = {
  name: 'AI Analytics',
  domain: 'aianalytics.fi',
  url: 'https://aianalytics.fi/',
  tagline: 'Tekoälyä, dataa ja analytiikkaa suomalaisen liiketoiminnan tueksi.',
  // Yhteydenottojen vastaanotto-osoite. Tarkista ennen julkaisua.
  contactEmail: 'yhteys@aianalytics.fi',
}

export const NAV = [
  { href: '#etusivu', label: 'Etusivu' },
  { href: '#mita', label: 'Mitä on AI-analytiikka?' },
  { href: '#kayttokohteet', label: 'Käyttökohteet' },
  { href: '#miten', label: 'Miten se toimii?' },
  { href: '#hyodyt', label: 'Hyödyt yritykselle' },
  { href: '#suomessa', label: 'Suomessa' },
  { href: '#ukk', label: 'Usein kysyttyä' },
] as const

// Tilastokeskus: Tietotekniikan käyttö yrityksissä 2025 (julkaistu 27.11.2025)
export const SOURCE_STATFI_2025 = 'https://stat.fi/julkaisu/cm1hnps701dbm07w59uo0jw6u'
export const SOURCE_STATFI_SERIES = 'https://stat.fi/tilasto/icte'
