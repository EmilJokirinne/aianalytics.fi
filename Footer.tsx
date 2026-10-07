import { useEffect } from 'react'
import { SITE } from './config'
import { Logo } from './ui'

const LINKS = [
  { href: '#mita', label: 'AI-analytiikka' },
  { href: '#kayttokohteet', label: 'Käyttökohteet' },
  { href: '#hyodyt', label: 'Yrityksille' },
  { href: '#suomessa', label: 'Suomessa' },
  { href: '#ukk', label: 'FAQ' },
  { href: '#yhteys', label: 'Yhteystiedot' },
]

export default function Footer() {
  // Avaa Tietosuoja- tai Evästeet-osion, kun siihen linkitetään
  useEffect(() => {
    const openFromHash = () => {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el instanceof HTMLDetailsElement) el.open = true
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  return (
    <footer className="border-t border-white/10 bg-ink-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed">{SITE.tagline}</p>
          </div>
          <nav aria-label="Alavalikko">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-slate-500">Sivusto</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-300 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-slate-500">Yhteys</p>
            <a href={`mailto:${SITE.contactEmail}`} className="mt-4 inline-block text-slate-300 hover:text-white">
              {SITE.contactEmail}
            </a>
            <ul className="mt-6 space-y-3">
              <li>
                <a href="#tietosuoja" className="text-slate-300 hover:text-white">
                  Tietosuoja
                </a>
              </li>
              <li>
                <a href="#evasteet" className="text-slate-300 hover:text-white">
                  Evästeet
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/10 pt-10 md:grid-cols-2">
          <details id="tietosuoja" className="faq group scroll-mt-24 rounded-xl border border-white/10 px-5">
            <summary className="flex cursor-pointer items-center justify-between py-4 font-medium text-slate-200">
              Tietosuoja
              <span aria-hidden="true" className="text-slate-500 transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="space-y-3 pb-5 text-sm leading-relaxed">
              <p>
                Sivusto ei kerää kävijöistä henkilötietoja eikä käytä analytiikka- tai markkinointityökaluja. Sivuston fontit
                ladataan omalta palvelimelta, joten sivun lataaminen ei välitä tietoja kolmansille osapuolille.
              </p>
              <p>
                Yhteydenottolomake ei lähetä tietoja palvelimelle, vaan avaa viestin omassa sähköpostiohjelmassasi. Lähettämiäsi
                viestejä käytetään vain yhteydenottoon vastaamiseen. Tietosuojaa koskevat kysymykset:{' '}
                <a href={`mailto:${SITE.contactEmail}`} className="text-slate-200 underline underline-offset-2">
                  {SITE.contactEmail}
                </a>
                .
              </p>
            </div>
          </details>
          <details id="evasteet" className="faq group scroll-mt-24 rounded-xl border border-white/10 px-5">
            <summary className="flex cursor-pointer items-center justify-between py-4 font-medium text-slate-200">
              Evästeet
              <span aria-hidden="true" className="text-slate-500 transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="pb-5 text-sm leading-relaxed">
              <p>
                Sivusto ei käytä evästeitä eikä muita seurantatekniikoita. Siksi sivustolla ei näytetä evästebanneria. Jos
                sivustolle lisätään myöhemmin analytiikkaa, tätä kohtaa päivitetään ja suostumus pyydetään ennen
                käyttöönottoa.
              </p>
            </div>
          </details>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <p>© 2026 AI Analytics</p>
          <p>{SITE.domain}</p>
        </div>
      </div>
    </footer>
  )
}
