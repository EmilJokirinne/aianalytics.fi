import { useState, type FormEvent } from 'react'
import { SITE } from './config'
import { ArrowRight, Mail } from './icons'
import { Reveal } from './ui'

const INDUSTRIES = [
  'Valmistava teollisuus',
  'Rakennusala',
  'Vähittäiskauppa',
  'Verkkokauppa',
  'Logistiikka',
  'Energia',
  'Metsäala',
  'Teknologia',
  'Asiantuntijapalvelut',
  'Terveydenhuolto',
  'Finanssi',
  'Matkailu',
  'Julkiset palvelut',
  'Muu',
]

const DATA = ['Excel', 'ERP', 'CRM', 'Verkkokauppa', 'Taloushallinto', 'Tuotanto / IoT', 'Asiakaspalvelu', 'En ole varma']

const inputCls =
  'w-full rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-3 text-[0.95rem] text-white placeholder:text-slate-500 transition-colors focus:border-accent-400 focus:bg-white/[0.07] focus:outline-none'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = fd.getAll('data').join(', ') || '–'
    const body = [
      `Nimi: ${fd.get('nimi') || '–'}`,
      `Yritys: ${fd.get('yritys') || '–'}`,
      `Toimiala: ${fd.get('toimiala') || '–'}`,
      `Käytössä oleva data: ${data}`,
      '',
      'Mihin kysymykseen haluaisimme vastauksen:',
      String(fd.get('kysymys') || '–'),
    ].join('\n')
    const subject = 'AI-analytiikan käyttökohteen kartoitus'
    window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="yhteys" aria-labelledby="yhteys-title" className="relative scroll-mt-16 overflow-hidden bg-ink-950 py-20 text-white sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_40%,#000_20%,transparent_70%)]" />
        <div className="absolute -bottom-40 right-0 h-[36rem] w-[36rem] rounded-full bg-accent-500/[0.16] blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-accent-300">
            <span className="h-px w-7 bg-current opacity-60" aria-hidden="true" />
            Mistä aloittaisimme?
          </p>
          <h2 id="yhteys-title" className="mt-5 text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]">
            Missä AI voisi auttaa sinun yrityksessäsi?
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
            Paras AI-analytiikan käyttökohde ei välttämättä ole teknisesti hienoin. Se on ongelma, jossa parempi ennustaminen,
            analyysi tai päätöksenteko tuottaa yritykselle todellista arvoa.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#kartoitus" className="btn btn-primary">
              Kartoita käyttökohde <ArrowRight size={18} />
            </a>
            <a href={`mailto:${SITE.contactEmail}`} className="btn btn-ghost-dark">
              <Mail size={18} /> Ota yhteyttä
            </a>
          </div>
          <ol className="mt-14 space-y-5 border-t border-white/10 pt-8">
            {[
              ['Kysymys', 'Mikä päätös tai ennuste toisi eniten arvoa?'],
              ['Data', 'Mitä dataa siihen on jo olemassa?'],
              ['Pilotti', 'Rajattu kokeilu näyttää, kannattaako jatkaa.'],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="text-sm font-semibold tabular-nums text-accent-300">{i + 1}.</span>
                <span>
                  <span className="font-semibold text-white">{t}</span>
                  <span className="text-slate-400"> – {d}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <form
            id="kartoitus"
            onSubmit={onSubmit}
            action={`mailto:${SITE.contactEmail}`}
            method="post"
            encType="text/plain"
            className="scroll-mt-24 rounded-3xl border border-white/10 bg-ink-900/80 p-6 backdrop-blur-sm sm:p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight">Kartoita käyttökohde</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Kerro lyhyesti tilanteestasi. Lomake avaa viestin sähköpostiohjelmassasi, eikä tietoja tallenneta sivustolle.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-nimi" className="mb-2 block text-sm text-slate-300">
                  Nimi
                </label>
                <input id="f-nimi" name="nimi" autoComplete="name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="f-yritys" className="mb-2 block text-sm text-slate-300">
                  Yritys
                </label>
                <input id="f-yritys" name="yritys" autoComplete="organization" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-toimiala" className="mb-2 block text-sm text-slate-300">
                  Toimiala
                </label>
                <select id="f-toimiala" name="toimiala" defaultValue="" className={`${inputCls} appearance-none`}>
                  <option value="" disabled className="bg-ink-900">
                    Valitse toimiala
                  </option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} className="bg-ink-900">
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mb-3 text-sm text-slate-300">Mitä dataa yritykselläsi on käytössä?</legend>
                <div className="flex flex-wrap gap-2">
                  {DATA.map((d) => (
                    <label key={d} className="chip-check cursor-pointer">
                      <input type="checkbox" name="data" value={d} className="peer sr-only" />
                      <span className="inline-block rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-slate-300 transition-colors peer-checked:border-accent-400 peer-checked:bg-accent-500 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-400 hover:border-white/30">
                        {d}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="f-kysymys" className="mb-2 block text-sm text-slate-300">
                  Mihin kysymykseen haluaisit datasta vastauksen?
                </label>
                <textarea
                  id="f-kysymys"
                  name="kysymys"
                  rows={4}
                  placeholder="Esimerkiksi: miten ennustaisimme kysyntää tarkemmin ennen sesonkia?"
                  className={`${inputCls} resize-y`}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-7 w-full">
              Avaa viesti sähköpostissa <ArrowRight size={18} />
            </button>
            <p className="mt-4 text-center text-[0.8rem] text-slate-500" role="status">
              {sent ? 'Sähköpostiohjelmasi pitäisi nyt avautua. Jos ei, kirjoita meille: ' : 'Voit myös kirjoittaa suoraan: '}
              <a href={`mailto:${SITE.contactEmail}`} className="text-slate-300 underline decoration-slate-600 underline-offset-2 hover:text-white">
                {SITE.contactEmail}
              </a>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
