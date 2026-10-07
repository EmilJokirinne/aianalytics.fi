import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { ForecastChart } from './charts'
import { ChevronDown, Lightbulb } from './icons'
import { Bar, DemoBadge, Reveal, Section, SectionHeader } from './ui'

type View = {
  key: string
  label: string
  metrics: { label: string; value: string; note?: string; accent?: boolean }[]
  chartTitle: string
  history: number[]
  forecast: number[]
  band: { lo: number[]; hi: number[] }
  threshold?: { value: number; label: string }
  insight: string
  how: string
  driversTitle: string
  drivers: { label: string; value: number }[]
}

const MONTHS = ['marras', '', '', 'helmi', '', '', 'touko', '', '', 'elo', '', 'loka', '', '', 'tammi']

const VIEWS: View[] = [
  {
    key: 'myynti',
    label: 'Myynti',
    metrics: [
      { label: 'Nykyinen myynti / kk', value: '284 000 €' },
      { label: 'Ennuste 3 kk päähän', value: '317 000 €', note: '+11,6 %', accent: true },
      { label: 'Ennusteen vaihteluväli', value: '301–332 k€' },
    ],
    chartTitle: 'Kuukausimyynti, k€',
    history: [236, 241, 238, 247, 252, 259, 255, 263, 270, 268, 279, 284],
    forecast: [295, 306, 317],
    band: { lo: [289, 296, 301], hi: [301, 316, 332] },
    insight: 'Myynnin kasvu näyttää keskittyvän kolmeen asiakassegmenttiin. Kasvu on voimakkainta Etelä-Suomen alueella.',
    how: 'Malli analysoi historiallista myyntiä, asiakassegmenttejä, alueellista jakaumaa ja ajallisia muutoksia. Se erotteli kausivaihtelun pysyvästä trendistä ja vertasi segmenttien kehitystä keskenään.',
    driversTitle: 'Ennustetun kasvun jakautuminen segmenteittäin',
    drivers: [
      { label: 'Teollisuusasiakkaat', value: 41 },
      { label: 'Pk-yritykset', value: 29 },
      { label: 'Julkinen sektori', value: 18 },
      { label: 'Muut', value: 12 },
    ],
  },
  {
    key: 'asiakkaat',
    label: 'Asiakkaat',
    metrics: [
      { label: 'Aktiiviset asiakkaat', value: '1 842' },
      { label: 'Poistumisriski', value: '3,2 %', note: '59 asiakasta', accent: true },
      { label: 'Muutos 12 kk', value: '+0,8 %-yks.' },
    ],
    chartTitle: 'Kuukausittainen poistumisriski, %',
    history: [2.4, 2.5, 2.3, 2.6, 2.5, 2.7, 2.6, 2.8, 2.9, 2.8, 3.0, 3.2],
    forecast: [3.4, 3.5, 3.6],
    band: { lo: [3.2, 3.2, 3.2], hi: [3.6, 3.8, 4.0] },
    insight:
      'Poistumisriski on kasvanut asiakkailla, joiden tilausväli on pidentynyt selvästi ja jotka ovat olleet yhteydessä asiakaspalveluun useammin kuin ennen.',
    how: 'Malli vertasi nykyisten asiakkaiden käyttäytymistä aiemmin poistuneiden asiakkaiden ostohistoriaan, tilausväleihin ja asiakaspalvelukontakteihin. Ennuste kuvaa tilannetta ilman uusia toimenpiteitä.',
    driversTitle: 'Riskiin vaikuttavat tekijät (suhteellinen painoarvo)',
    drivers: [
      { label: 'Tilausvälin piteneminen', value: 38 },
      { label: 'Asiakaspalvelukontaktit', value: 27 },
      { label: 'Käytön väheneminen', value: 21 },
      { label: 'Hintamuutos', value: 14 },
    ],
  },
  {
    key: 'varasto',
    label: 'Varasto',
    metrics: [
      { label: 'Varaston arvo', value: '1,12 M€' },
      { label: 'Loppumisriskissä', value: '3 nimikettä', note: 'alle 14 päivässä', accent: true },
      { label: 'Hitaasti kiertävät', value: '86 000 €' },
    ],
    chartTitle: 'Varaston riittävyys, päivää (tuoteryhmä B)',
    history: [32, 31, 33, 30, 29, 30, 28, 27, 26, 24, 23, 21],
    forecast: [18, 15, 12],
    band: { lo: [16, 12, 8], hi: [20, 18, 16] },
    threshold: { value: 14, label: 'Tilauspiste 14 pv' },
    insight:
      'Kolmen nimikkeen varasto riittää ennusteen mukaan alle kahdeksi viikoksi, koska kysyntä kasvaa ennen marraskuun kampanjaa. Samaan aikaan 11 hitaasti kiertävää nimikettä sitoo noin 86 000 € käyttöpääomaa.',
    how: 'Malli yhdisti myyntihistorian, kampanjakalenterin, toimittajien toteutuneet toimitusajat ja nykyiset varastosaldot. Riittävyys laskettiin nimikekohtaisesti ennustetun kysynnän perusteella.',
    driversTitle: 'Kysynnän muutokseen vaikuttavat tekijät',
    drivers: [
      { label: 'Kausivaihtelu', value: 34 },
      { label: 'Tuleva kampanja', value: 29 },
      { label: 'Toimittajan toimitusaika', value: 22 },
      { label: 'Pitkän aikavälin trendi', value: 15 },
    ],
  },
  {
    key: 'tuotanto',
    label: 'Tuotanto',
    metrics: [
      { label: 'Kokonaistehokkuus (OEE)', value: '78,4 %' },
      { label: 'Arvio toimenpiteiden jälkeen', value: '81,2 %', note: '+2,8 %-yks.', accent: true },
      { label: 'Suunnittelemattomat seisokit', value: '−18 h / kk' },
    ],
    chartTitle: 'Linjan 2 kokonaistehokkuus, %',
    history: [74.2, 75.0, 74.6, 75.8, 76.1, 75.4, 76.9, 77.3, 76.8, 77.9, 78.1, 78.4],
    forecast: [79.3, 80.4, 81.2],
    band: { lo: [78.6, 79.2, 79.6], hi: [80.0, 81.6, 82.8] },
    insight:
      'Linjan 2 lyhyet pysähdykset keskittyvät tuotevaihtoihin. Jos vaihtojen järjestys suunnitellaan ennustetun tilauskannan mukaan, kokonaistehokkuus voi nousta arviolta 2–3 prosenttiyksikköä.',
    how: 'Malli analysoi koneiden tilatiedot, pysähdyskoodit, tuotevaihtojen ajankohdat ja tilauskannan. Se vertasi samankaltaisia tuotantojaksoja keskenään ja simuloi vaihtoehtoisen vaihtojärjestyksen.',
    driversTitle: 'Pysähdysten syyt (osuus pysähdysajasta)',
    drivers: [
      { label: 'Tuotevaihdot', value: 41 },
      { label: 'Materiaalin odotus', value: 24 },
      { label: 'Laatuhylkäykset', value: 19 },
      { label: 'Muut', value: 16 },
    ],
  },
]

export default function Demo() {
  const [idx, setIdx] = useState(0)
  const [howOpen, setHowOpen] = useState(false)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const base = useId().replace(/[^a-zA-Z0-9]/g, '')
  const v = VIEWS[idx]

  const select = (i: number) => {
    setIdx(i)
    setHowOpen(false)
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = idx
    if (e.key in keys) next = (idx + keys[e.key] + VIEWS.length) % VIEWS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = VIEWS.length - 1
    else return
    e.preventDefault()
    select(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <Section id="demo" labelledBy="demo-title">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader
          id="demo-title"
          eyebrow="Kokeile"
          title="Näe, mitä AI-analytiikka voi löytää datasta"
          intro={<p>Valitse näkymä. Dashboard päivittyy ja näyttää, millaisen havainnon AI tekee kuvitteellisen yrityksen datasta.</p>}
        />
        <Reveal>
          <DemoBadge />
        </Reveal>
      </div>

      <Reveal className="mt-12 overflow-hidden rounded-3xl border border-mist-200 bg-mist-50">
        <div
          role="tablist"
          aria-label="Demon näkymät"
          onKeyDown={onKey}
          className="grid grid-cols-4 gap-1 border-b border-mist-200 bg-white p-2 sm:flex sm:p-3"
        >
          {VIEWS.map((view, i) => (
            <button
              key={view.key}
              ref={(el) => {
                tabsRef.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${view.key}`}
              aria-selected={i === idx}
              aria-controls={`${base}-panel`}
              tabIndex={i === idx ? 0 : -1}
              onClick={() => select(i)}
              className={`whitespace-nowrap rounded-lg px-1 py-2.5 text-[0.8rem] font-medium transition-colors sm:px-5 sm:text-sm ${
                i === idx ? 'bg-ink-900 text-white' : 'text-slate-600 hover:bg-mist-100 hover:text-ink-900'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${v.key}`}
          className="grid gap-4 p-3 sm:p-5 lg:grid-cols-[1.45fr_1fr] lg:gap-5"
        >
          <div className="rounded-2xl border border-mist-200 bg-white p-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {v.metrics.map((m) => (
                <div key={m.label} className="border-l-2 border-mist-200 pl-4 first:border-l-0 first:pl-0 sm:first:border-l-0">
                  <dt className="text-[0.78rem] text-slate-500">{m.label}</dt>
                  <dd className={`mt-1 text-2xl font-semibold tracking-tight tabular-nums ${m.accent ? 'text-accent-600' : 'text-ink-900'}`}>
                    {m.value}
                  </dd>
                  {m.note && <dd className="text-[0.8rem] text-slate-500">{m.note}</dd>}
                </div>
              ))}
            </dl>
            <div className="mt-7">
              <p className="text-sm font-medium text-slate-700">{v.chartTitle}</p>
              <div className="mt-3" key={v.key}>
                <ForecastChart
                  history={v.history}
                  forecast={v.forecast}
                  band={v.band}
                  threshold={v.threshold}
                  labels={MONTHS}
                  title={`${v.chartTitle}. Toteutunut kehitys 12 kuukaudelta ja kolmen kuukauden ennuste vaihteluväleineen.`}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-ink-900 p-6 text-white" aria-live="polite">
              <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent-300">
                <Lightbulb size={15} /> AI:n havainto
              </p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-slate-100">{v.insight}</p>
              <button
                type="button"
                aria-expanded={howOpen}
                aria-controls={`${base}-how`}
                onClick={() => setHowOpen((o) => !o)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/[0.08] px-3.5 py-2 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/[0.14]"
              >
                Miten AI päätyi tähän?
                <ChevronDown size={16} className={`transition-transform ${howOpen ? 'rotate-180' : ''}`} />
              </button>
              <div id={`${base}-how`} hidden={!howOpen} className="mt-4 border-t border-white/10 pt-4 text-[0.95rem] leading-relaxed text-slate-300">
                {v.how}
              </div>
            </div>

            <div className="flex-1 rounded-2xl border border-mist-200 bg-white p-6">
              <p className="text-sm font-medium text-ink-900">{v.driversTitle}</p>
              <ul className="mt-5 space-y-4 text-slate-700" key={v.key}>
                {v.drivers.map((d, i) => (
                  <li key={d.label} className="is-visible">
                    <div className="flex items-baseline justify-between text-sm">
                      <span>{d.label}</span>
                      <span className="font-semibold tabular-nums text-ink-900">{d.value} %</span>
                    </div>
                    <div className="mt-2">
                      <Bar value={d.value} max={50} tone={i === 0 ? 'accent' : 'soft'} delay={i * 80} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
      <p className="mt-4 text-[0.8rem] text-slate-500">
        Demo käyttää kuvitteellista dataa. Todellisessa ratkaisussa ennusteen tarkkuus riippuu datan laadusta, määrästä ja
        käyttötapauksesta.
      </p>
    </Section>
  )
}
