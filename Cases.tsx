import { useState } from 'react'
import { ForecastBars, ForecastChart } from './charts'
import { Alert, Check, Info, Wrench } from './icons'
import { DemoBadge, Reveal, Section, SectionHeader } from './ui'

/* ---------- 11. Valmistava yritys ---------- */

const SOLUTION = [
  'Yhdistetään tuotantokoneiden data.',
  'Lisätään huoltohistoria.',
  'AI etsii vikaantumista ennakoivia malleja.',
  'Järjestelmä antaa varoituksen.',
  'Huolto voidaan suunnitella ennen rikkoutumista.',
]

const MACHINES = [
  { id: 11, s: 'ok' },
  { id: 12, s: 'ok' },
  { id: 13, s: 'watch' },
  { id: 14, s: 'risk' },
  { id: 15, s: 'ok' },
  { id: 16, s: 'ok' },
] as const

const VIBRATION = [2.1, 2.0, 2.2, 2.1, 2.3, 2.2, 2.4, 2.3, 2.6, 2.8, 3.1, 3.4]

export function CaseManufacturing() {
  const [step, setStep] = useState(SOLUTION.length) // oletuksena koko näkymä
  const show = (n: number) => step >= n
  const dim = (n: number) => `transition-opacity duration-500 ${show(n) ? 'opacity-100' : 'opacity-25'}`

  return (
    <Section id="esimerkki-teollisuus" tone="muted" labelledBy="case1-title">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader
          id="case1-title"
          eyebrow="Esimerkki 1 · Ennakoiva kunnossapito"
          title="Esimerkki: suomalainen valmistava yritys"
          intro={
            <p>
              Kuvitteellinen <strong className="font-semibold text-ink-900">Nordic Manufacturing Oy</strong> valmistaa
              metallikomponentteja vientiin. Tuotannon seisokit aiheuttavat vuosittain merkittäviä kustannuksia.
            </p>
          }
        />
      </div>

      <Reveal className="mt-8 flex items-start gap-3 rounded-xl border border-amber-300/70 bg-amber-50 px-5 py-4 text-amber-900">
        <Info size={20} className="mt-0.5 shrink-0" />
        <p className="text-[0.95rem] font-medium">Tämä on havainnollistava esimerkki, ei todellinen asiakasdata.</p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        <Reveal className="space-y-8">
          <div>
            <h3 className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-slate-500">Lähtötilanne – yrityksellä on</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {['ERP', 'tuotantodata', 'varastodata', 'myyntidata', 'huoltohistoria'].map((d) => (
                <li key={d} className="rounded-md border border-mist-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-slate-500">AI-analytiikan ratkaisu</h3>
            <p className="mt-2 text-sm text-slate-500">Valitse vaihe nähdäksesi, mitä näkymään tulee kussakin vaiheessa.</p>
            <ol className="mt-4 space-y-2">
              {SOLUTION.map((s, i) => {
                const n = i + 1
                const active = step === n
                const done = step > n
                return (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setStep(n)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                        active
                          ? 'border-ink-900 bg-ink-900 text-white'
                          : done
                            ? 'border-mist-200 bg-white text-ink-900 hover:border-slate-300'
                            : 'border-mist-200 bg-white/60 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-semibold ${
                          active ? 'bg-accent-500 text-white' : done ? 'bg-ink-900 text-white' : 'bg-mist-100 text-slate-500'
                        }`}
                      >
                        {done ? <Check size={14} strokeWidth={2.5} /> : n}
                      </span>
                      <span className="text-[0.95rem]">{s}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <figure className="rounded-2xl bg-ink-900 p-5 text-white shadow-[0_30px_80px_-40px_rgba(10,17,31,0.6)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium">Kunnossapidon ennuste · Tehdas 2</p>
              <DemoBadge dark>Havainnollistava esimerkki</DemoBadge>
            </div>

            <div className={`mt-6 ${dim(1)}`}>
              <p className="text-[0.72rem] uppercase tracking-[0.14em] text-slate-400">Koneet</p>
              <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {MACHINES.map((m) => {
                  const state = m.s === 'risk' && show(4) ? 'risk' : m.s === 'watch' && show(3) ? 'watch' : 'ok'
                  const cls =
                    state === 'risk'
                      ? 'bg-amber-400/15 ring-amber-400/60 text-amber-200'
                      : state === 'watch'
                        ? 'bg-white/[0.05] ring-amber-200/25 text-slate-200'
                        : 'bg-white/[0.04] ring-white/10 text-slate-300'
                  return (
                    <li key={m.id} className={`rounded-lg px-3 py-2.5 ring-1 transition-colors duration-500 ${cls}`}>
                      <span className="block text-[0.7rem] text-slate-400">Kone</span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold">
                        {m.id}
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${state === 'risk' ? 'bg-amber-400' : state === 'watch' ? 'bg-amber-200/70' : 'bg-emerald-400'}`}
                        />
                      </span>
                      <span className="sr-only">
                        {state === 'risk' ? 'riski kohonnut' : state === 'watch' ? 'seurannassa' : 'normaali'}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className={`mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 ${dim(3)}`}>
              <p className="text-[0.78rem] text-slate-300">Kone 14 · laakerin värähtely, mm/s (RMS) · viikoittain</p>
              <div className="mt-3">
                <ForecastChart
                  tone="dark"
                  height={170}
                  history={VIBRATION}
                  forecast={[3.7, 4.0, 4.4]}
                  band={{ lo: [3.5, 3.6, 3.8], hi: [3.9, 4.4, 5.0] }}
                  threshold={{ value: 4.5, label: 'Hälytysraja' }}
                  title="Esimerkkikaavio: koneen 14 värähtelytaso nousee kohti hälytysrajaa."
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className={`rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 ${dim(2)}`}>
                <p className="text-[0.72rem] uppercase tracking-[0.14em] text-slate-400">Huoltohistoria</p>
                <ul className="mt-3 space-y-2 text-[0.85rem] text-slate-300">
                  <li className="flex justify-between gap-3"><span>Laakerin vaihto</span><span className="text-slate-500">14 kk sitten</span></li>
                  <li className="flex justify-between gap-3"><span>Voitelu</span><span className="text-slate-500">3 kk sitten</span></li>
                  <li className="flex justify-between gap-3"><span>Vastaava vika, kone 11</span><span className="text-slate-500">2 v sitten</span></li>
                </ul>
              </div>

              <div
                className={`rounded-xl border p-4 transition-[opacity,border-color] duration-500 ${
                  show(4) ? 'border-amber-400/50 bg-amber-400/[0.08] opacity-100' : 'border-white/[0.08] opacity-25'
                }`}
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Alert size={16} className="text-amber-300" /> Kone 14
                </p>
                <dl className="mt-3 space-y-2 text-[0.85rem]">
                  <div>
                    <dt className="text-slate-400">Riski</dt>
                    <dd className="font-semibold text-amber-200">Kohonnut</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Todennäköinen huoltotarve</dt>
                    <dd className="font-semibold text-white">7–14 päivää</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className={`mt-4 rounded-xl bg-white p-4 text-ink-900 ${dim(4)}`}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent-600">Suositus</p>
              <p className="mt-1 font-medium">Tarkista laakerin lämpötila ja värähtelydata.</p>
              <p
                className={`mt-3 flex items-center gap-2 border-t border-mist-100 pt-3 text-sm text-slate-600 transition-opacity duration-500 ${
                  show(5) ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Wrench size={16} className="text-accent-600" /> Huolto ehdotettu ensi viikon suunniteltuun huoltoikkunaan.
              </p>
            </div>
            <figcaption className="mt-5 text-[0.78rem] text-slate-400">
              Tämä on havainnollistava esimerkki, ei todellinen asiakasdata. Päätöksen huollosta tekee kunnossapidon ammattilainen.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------- 12. Kysynnän ennustaminen ---------- */

const WEEKS = ['vk 33', 'vk 34', 'vk 35', 'vk 36', 'vk 37', 'vk 38', 'vk 39', 'vk 40', 'vk 41']
const SALES = [742, 768, 731, 790, 805, 779, 822, 851, 1004]

export function CaseDemand() {
  return (
    <Section id="esimerkki-verkkokauppa" labelledBy="case2-title">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeader
            id="case2-title"
            eyebrow="Esimerkki 2 · Kauppa ja verkkokauppa"
            title="Esimerkki: kysynnän ennustaminen"
            intro={<p>Kuvittele suomalainen verkkokauppa, joka myy kodin tuotteita koko Suomeen. AI analysoi:</p>}
          />
          <Reveal as="ul" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {[
              'aikaisemman myynnin',
              'sesongit',
              'kampanjat',
              'viikonpäivät',
              'tuotteiden väliset suhteet',
              'varastotilanteen',
            ].map((x) => (
              <li key={x} className="flex items-center gap-3 border-b border-mist-200 pb-3 text-slate-700">
                <Check size={16} className="shrink-0 text-accent-600" strokeWidth={2.25} />
                {x}
              </li>
            ))}
          </Reveal>
          <Reveal as="figure" className="mt-10 border-l-2 border-accent-500 pl-6">
            <blockquote className="text-xl font-medium leading-snug tracking-tight text-ink-900">
              Ennusteen avulla yritys voi valmistautua kysynnän muutokseen ennen kuin ongelma näkyy toteutuneessa myynnissä.
            </blockquote>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <figure className="rounded-2xl border border-mist-200 bg-white p-5 shadow-[0_30px_80px_-50px_rgba(10,17,31,0.35)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-lg font-semibold tracking-tight text-ink-900">Tuotteen A kysyntäennuste</p>
              <DemoBadge />
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-mist-50 p-4">
                <dt className="text-[0.78rem] text-slate-500">Ensi viikko</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums text-accent-600">+18 %</dd>
              </div>
              <div className="rounded-xl bg-mist-50 p-4">
                <dt className="text-[0.78rem] text-slate-500">Suositeltu varastotaso</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums text-ink-900">1 240 kpl</dd>
              </div>
              <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
                <dt className="text-[0.78rem] text-amber-800">Riski</dt>
                <dd className="mt-1 text-2xl font-semibold text-amber-700">Korkea</dd>
                <dd className="text-[0.72rem] text-amber-800">loppuunmyynti ilman täydennystä</dd>
              </div>
            </dl>
            <div className="mt-8">
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium text-slate-700">Myynti, kpl / viikko</p>
                <div className="flex items-center gap-4 text-[0.75rem] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-ink-900/[0.14]" aria-hidden="true" /> Toteutunut
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-accent-500" aria-hidden="true" /> Ennuste
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <ForecastBars
                  values={SALES}
                  labels={WEEKS}
                  valueLabel="1 004"
                  title="Esimerkkikaavio: tuotteen A viikkomyynti 731–851 kappaletta, ensi viikon ennuste 1 004 kappaletta."
                />
              </div>
            </div>
            <figcaption className="mt-5 text-[0.78rem] text-slate-500">
              Kuvitteellinen esimerkki. Suositeltu varastotaso sisältää ennustetun kysynnän ja varmuusvaraston.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
