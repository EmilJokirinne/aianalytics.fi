import { Fragment } from 'react'
import { SOURCE_STATFI_2025 } from './config'
import { ArrowRight, ArrowUpRight, Cpu, Database, Layers, LineChart, CheckCircle } from './icons'
import { CountUp, Reveal, Section, SectionHeader } from './ui'

/* ---------- 5. Tilastot ---------- */

const STATS = [
  { value: 38, text: 'suomalaisista yrityksistä käytti tekoälyteknologioita vuonna 2025.' },
  { value: 45, text: 'yrityksistä teki data-analytiikkaa vuonna 2025.' },
  { value: 68, text: 'vähintään 100 henkilöä työllistävistä yrityksistä käytti tekoälyteknologioita.' },
]

export function Stats() {
  return (
    <Section id="tilastot" labelledBy="tilastot-title">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.25fr] lg:gap-20">
        <SectionHeader
          id="tilastot-title"
          eyebrow="Tilannekuva Suomessa"
          title="Tekoäly ei ole enää tulevaisuutta."
          intro={
            <p>
              Tekoäly ja data-analytiikka ovat jo osa suomalaisen yritysmaailman arkea. Teknologian käyttö kasvaa nopeasti,
              mutta monissa yrityksissä seuraava askel on vielä ottamatta: datan muuttaminen ennakoivaksi päätöksenteoksi.
            </p>
          }
        >
          <div className="mt-10 rounded-2xl border border-mist-200 bg-mist-50 p-6">
            <p className="text-sm font-medium text-ink-900">Tekoälyteknologioita käyttäneiden yritysten osuus</p>
            <div className="mt-5 space-y-4">
              {[
                { y: '2024', v: 24, cls: 'bg-slate-300' },
                { y: '2025', v: 38, cls: 'bg-accent-500' },
              ].map((r, i) => (
                <div key={r.y} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3 text-sm">
                  <span className="text-slate-500">{r.y}</span>
                  <span className="block h-2.5 overflow-hidden rounded-full bg-mist-200" aria-hidden="true">
                    <span className={`bar-grow block h-full rounded-full ${r.cls}`} style={{ width: `${r.v}%`, animationDelay: `${i * 200}ms` }} />
                  </span>
                  <span className="text-right font-semibold tabular-nums text-ink-900">{r.v} %</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">Osuus kasvoi vuodessa 14 prosenttiyksikköä.</p>
          </div>
        </SectionHeader>

        <div>
          <ul className="divide-y divide-mist-200 border-y border-mist-200">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.value} delay={i * 120} className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-10">
                <p className="text-6xl font-semibold tracking-[-0.045em] text-ink-900 sm:text-7xl">
                  <CountUp value={s.value} suffix=" %" />
                </p>
                <div>
                  <p className="text-lg leading-snug text-slate-700">{s.text}</p>
                  <span className="mt-4 block h-1 w-full overflow-hidden rounded-full bg-mist-100" aria-hidden="true">
                    <span className="bar-grow block h-full rounded-full bg-accent-500" style={{ width: `${s.value}%` }} />
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-[0.8rem] leading-relaxed text-slate-500">
            Lähde:{' '}
            <a href={SOURCE_STATFI_2025} className="underline decoration-slate-300 underline-offset-2 hover:text-ink-900" rel="noopener" target="_blank">
              Tilastokeskus, Tietotekniikan käyttö yrityksissä 2025
            </a>{' '}
            (julkaistu 27.11.2025) ja Tietotekniikan käyttö yrityksissä 2024. Tilasto koskee vähintään 10 henkilöä työllistäviä yrityksiä.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 6. Mitä AI-analytiikka on ---------- */

const LEVELS = [
  { n: '01', q: 'Mitä tapahtui?', t: 'Data-analytiikka ja raportointi.', tag: 'Kuvaileva analytiikka' },
  { n: '02', q: 'Miksi tapahtui?', t: 'Tekoäly etsii datasta yhteyksiä, malleja ja poikkeamia.', tag: 'Diagnosoiva analytiikka' },
  { n: '03', q: 'Mitä seuraavaksi?', t: 'Ennustava analytiikka arvioi tulevaa ja tukee päätöksentekoa.', tag: 'Ennakoiva analytiikka' },
]

const FLOW = [
  { k: 'Data', d: 'Yrityksen järjestelmät, tiedostot ja tapahtumat' },
  { k: 'AI', d: 'Mallit etsivät yhteyksiä, trendejä ja poikkeamia' },
  { k: 'Oivallus', d: 'Ymmärrys siitä, mitä tapahtuu ja miksi' },
  { k: 'Toimenpide', d: 'Päätös tai muutos liiketoimintaprosessissa' },
]

export function WhatIs() {
  return (
    <Section id="mita" tone="muted" labelledBy="mita-title">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <SectionHeader
          id="mita-title"
          eyebrow="Määritelmä"
          title="Mitä AI-analytiikka tarkoittaa?"
          intro={
            <>
              <p>
                AI-analytiikka tarkoittaa tekoälyn, koneoppimisen ja data-analytiikan hyödyntämistä liiketoiminnan datan
                ymmärtämiseen, ennustamiseen ja optimointiin.
              </p>
              <p>
                Perinteinen raportointi kertoo usein, mitä tapahtui. AI-analytiikka voi auttaa ymmärtämään, miksi jotain
                tapahtui, mitä todennäköisesti tapahtuu seuraavaksi ja mitä vaihtoehtoja yrityksellä on.
              </p>
            </>
          }
        />
        <ol className="space-y-4">
          {LEVELS.map((l, i) => (
            <Reveal as="li" key={l.n} delay={i * 110} className="group relative rounded-2xl border border-mist-200 bg-white p-6 sm:p-7">
              <div className="flex items-start gap-5">
                <span className="text-sm font-semibold tabular-nums text-accent-600">{l.n}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-ink-900">{l.q}</h3>
                    <span className="text-[0.75rem] uppercase tracking-[0.12em] text-slate-500">{l.tag}</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-slate-600">{l.t}</p>
                </div>
              </div>
              <span
                className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-accent-500 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal className="mt-16 sm:mt-20">
        <p className="sr-only">Prosessi: data, tekoäly, oivallus, toimenpide.</p>
        <ol className="flex flex-col items-stretch md:flex-row" aria-hidden="false">
          {FLOW.map((f, i) => (
            <Fragment key={f.k}>
              <li className={`flex-1 rounded-2xl p-6 ${i === 1 ? 'bg-ink-900 text-white' : 'border border-mist-200 bg-white'}`}>
                <p className={`text-[0.72rem] font-medium uppercase tracking-[0.16em] ${i === 1 ? 'text-accent-300' : 'text-slate-500'}`}>
                  Vaihe {i + 1}
                </p>
                <p className={`mt-2 text-2xl font-semibold tracking-tight ${i === 1 ? 'text-white' : 'text-ink-900'}`}>{f.k}</p>
                <p className={`mt-2 text-sm leading-relaxed ${i === 1 ? 'text-slate-300' : 'text-slate-600'}`}>{f.d}</p>
              </li>
              {i < FLOW.length - 1 && (
                <li aria-hidden="true" className="flex items-center justify-center py-2 md:px-2 md:py-0">
                  <span className="flow-line-v h-8 w-0.5 rounded-full bg-mist-200 md:hidden" />
                  <span className="flow-line hidden h-0.5 w-10 rounded-full bg-mist-200 md:block" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}

/* ---------- 7. Miten se toimii ---------- */

const STEPS = [
  {
    icon: Database,
    title: 'Data',
    text: 'Yrityksen data kerätään eri lähteistä.',
    chips: ['ERP', 'CRM', 'Verkkokauppa', 'Taloushallinto', 'Tuotanto', 'IoT', 'Verkkosivusto', 'Asiakaspalvelu', 'Markkinointi'],
  },
  {
    icon: Layers,
    title: 'Datan yhdistäminen',
    text: 'Eri lähteiden data yhdistetään analysoitavaan muotoon. Samalla tarkistetaan datan laatu, puutteet ja määritelmät, jotta esimerkiksi "asiakas" tai "myynti" tarkoittaa samaa kaikissa järjestelmissä.',
  },
  {
    icon: Cpu,
    title: 'AI-mallit',
    text: 'Koneoppiminen ja tekoäly etsivät datasta:',
    chips: ['trendejä', 'riippuvuuksia', 'poikkeamia', 'riskejä', 'mahdollisuuksia'],
  },
  {
    icon: LineChart,
    title: 'Ennuste',
    text: 'Järjestelmä voi arvioida esimerkiksi:',
    chips: ['kysyntää', 'myyntiä', 'asiakaspoistumaa', 'kustannuksia', 'tuotannon ongelmia', 'varastotarpeita'],
  },
  {
    icon: CheckCircle,
    title: 'Päätös',
    text: 'Tulokset tuodaan ihmisen nähtäväksi dashboardiin, raporttiin tai suoraan liiketoimintaprosessiin.',
  },
]

const PIPE = ['Data', 'Analyysi', 'AI', 'Ennuste', 'Päätös']

function Pipeline() {
  return (
    <div className="rounded-2xl bg-ink-900 p-6 text-white sm:p-7">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-slate-400">Datavirta</p>
      <ol className="mt-5 flex flex-wrap items-center gap-2 lg:flex-col lg:items-stretch lg:gap-0">
        {PIPE.map((p, i) => (
          <Fragment key={p}>
            <li
              className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold tracking-[0.12em] ${
                p === 'AI' ? 'bg-accent-500 text-white' : 'bg-white/[0.06] text-slate-200 ring-1 ring-white/10'
              }`}
            >
              {p.toUpperCase()}
            </li>
            {i < PIPE.length - 1 && (
              <li aria-hidden="true" className="flex items-center justify-center text-slate-500 lg:h-9">
                <ArrowRight size={16} className="lg:hidden" />
                <span className="flow-line-v hidden h-full w-0.5 rounded-full bg-white/10 lg:block" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

export function HowItWorks() {
  return (
    <Section id="miten" labelledBy="miten-title">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="miten-title"
            eyebrow="Prosessi"
            title="Miten AI-analytiikka toimii käytännössä?"
            intro={
              <p>
                Prosessi etenee datasta päätökseen. Ihminen määrittää jokaisessa vaiheessa, mitä halutaan selvittää ja miten
                tuloksia käytetään.
              </p>
            }
          />
          <Reveal className="mt-10" delay={150}>
            <Pipeline />
          </Reveal>
        </div>

        <ol className="relative">
          <span className="absolute bottom-10 left-[1.4rem] top-10 w-px bg-mist-200" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} className="relative pb-6 last:pb-0" delay={i * 60}>
              <div className="flex gap-5 sm:gap-6">
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mist-200 bg-white text-ink-900 shadow-sm">
                  <s.icon size={20} />
                </span>
                <div className="flex-1 rounded-2xl border border-mist-200 p-6">
                  <p className="text-[0.75rem] font-medium tabular-nums text-accent-600">Vaihe {i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink-900">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
                  {s.chips && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <li key={c} className="rounded-md bg-mist-100 px-2.5 py-1 text-[0.8rem] text-slate-700">
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal className="mt-16 overflow-hidden rounded-3xl bg-ink-900 text-white sm:mt-20">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-14">
          <blockquote>
            <p className="text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-[2.1rem]">
              AI ei ole päätöksenteon korvaaja. <span className="text-accent-300">Se on päätöksenteon apuväline.</span>
            </p>
          </blockquote>
          <ul className="space-y-4 border-t border-white/10 pt-8 text-slate-300 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <li className="flex gap-3">
              <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-accent-300" />
              Data kertoo, mitä tapahtuu.
            </li>
            <li className="flex gap-3">
              <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-accent-300" />
              AI auttaa ymmärtämään, mitä seuraavaksi voi tapahtua.
            </li>
            <li className="flex gap-3">
              <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-accent-300" />
              Ihminen tekee lopullisen päätöksen.
            </li>
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
