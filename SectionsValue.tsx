import { useState } from 'react'
import {
  Award,
  Coins,
  Database,
  Gauge,
  Globe,
  Headset,
  Layers,
  Radar,
  Search,
  Table,
  Target,
  Users,
  Wallet,
  Factory,
  Cart,
  Activity,
} from './icons'
import { Reveal, Section, SectionHeader } from './ui'

/* ---------- 13. Hyödyt ---------- */

const BENEFITS = [
  { icon: Target, t: 'Paremmat päätökset', d: 'Päätöksiä voidaan perustaa enemmän dataan ja vähemmän oletuksiin.' },
  { icon: Radar, t: 'Ennakoitavuus', d: 'Yritys voi valmistautua tuleviin muutoksiin ennen kuin ne näkyvät tuloksessa.' },
  { icon: Gauge, t: 'Tehokkuus', d: 'Manuaalista analysointia voidaan automatisoida, jolloin asiantuntijoiden aika vapautuu tulkintaan.' },
  { icon: Coins, t: 'Kustannussäästöt', d: 'Poikkeamat ja tehottomuus voidaan tunnistaa aikaisemmin.' },
  { icon: Users, t: 'Asiakasymmärrys', d: 'Asiakkaiden käyttäytymistä voidaan analysoida syvemmin ja segmentoida tarkemmin.' },
  { icon: Award, t: 'Kilpailuetu', d: 'Dataa voidaan käyttää kilpailuedun rakentamiseen myös kansainvälisillä markkinoilla.' },
]

export function Benefits() {
  return (
    <Section id="hyodyt" tone="muted" labelledBy="hyodyt-title">
      <SectionHeader
        id="hyodyt-title"
        eyebrow="Hyödyt yritykselle"
        title="Mitä AI-analytiikalla voidaan saavuttaa?"
        intro={
          <p>
            Hyötyjen suuruus riippuu aina käyttötapauksesta, datan laadusta ja toteutuksesta. Siksi vaikutus kannattaa
            arvioida yrityskohtaisesti, esimerkiksi rajatun pilotin avulla.
          </p>
        }
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <Reveal as="li" key={b.t} delay={(i % 3) * 90} className="rounded-2xl border border-mist-200 bg-white p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600">
              <b.icon size={21} />
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink-900">{b.t}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{b.d}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

/* ---------- 14. Vertailu ---------- */

const ROWS: [string, string, string][] = [
  ['Keskeinen kysymys', 'Mitä tapahtui?', 'Mitä tapahtuu seuraavaksi?'],
  ['Painopiste', 'Raportointi', 'Ennustaminen'],
  ['Data', 'Historiallinen data', 'Historiallinen + uusi data'],
  ['Poikkeamat', 'Ihminen etsii poikkeamat', 'AI tunnistaa poikkeamia'],
  ['Tulokset', 'Staattiset raportit', 'Dynaamiset ennusteet'],
  ['Työtapa', 'Manuaalinen analyysi', 'Automatisoitu analyysi'],
  ['Lopputulos', 'Kuvaus menneestä', 'Mitä kannattaa tehdä?'],
]

export function Comparison() {
  return (
    <Section id="vertailu" labelledBy="vertailu-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader
          id="vertailu-title"
          eyebrow="Vertailu"
          title={
            <>
              Perinteinen analytiikka <span className="text-accent-600">+</span> AI-analytiikka
            </>
          }
          intro={
            <p>
              Business intelligence (BI) ja raportointi ovat edelleen perusta. AI-analytiikka rakentuu niiden päälle ja tuo
              mukaan ennustamisen, poikkeamien automaattisen tunnistamisen ja toimenpidesuositukset.
            </p>
          }
        >
          <p className="mt-8 rounded-2xl bg-ink-900 p-6 text-lg font-medium leading-snug text-white">
            AI-analytiikka ei korvaa BI:tä tai data-analytiikkaa. <span className="text-accent-300">Se laajentaa niiden mahdollisuuksia.</span>
          </p>
        </SectionHeader>

        <Reveal className="overflow-hidden rounded-2xl border border-mist-200">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Perinteisen analytiikan ja AI-analytiikan vertailu</caption>
            <thead>
              <tr className="bg-mist-50 text-sm">
                <th scope="col" className="hidden w-[26%] px-5 py-4 font-medium text-slate-500 sm:table-cell">
                  <span className="sr-only">Näkökulma</span>
                </th>
                <th scope="col" className="px-4 py-4 font-semibold text-ink-900 sm:px-5">
                  Perinteinen analytiikka
                </th>
                <th scope="col" className="bg-ink-900 px-4 py-4 font-semibold text-white sm:px-5">
                  AI-analytiikka
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, a, b]) => (
                <tr key={k} className="border-t border-mist-200 align-top">
                  <th scope="row" className="hidden px-5 py-4 text-[0.8rem] font-medium uppercase tracking-[0.1em] text-slate-500 sm:table-cell">
                    {k}
                  </th>
                  <td className="px-4 py-4 text-[0.95rem] text-slate-600 sm:px-5">
                    <span className="mb-1 block text-[0.7rem] uppercase tracking-[0.1em] text-slate-400 sm:hidden">{k}</span>
                    {a}
                  </td>
                  <td className="bg-accent-500/[0.05] px-4 py-4 text-[0.95rem] font-medium text-ink-900 sm:px-5">
                    <span className="mb-1 block text-[0.7rem] uppercase tracking-[0.1em] text-transparent select-none sm:hidden" aria-hidden="true">
                      {k}
                    </span>
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------- 15. Kypsyyspolku ---------- */

const MATURITY = [
  { t: 'Dataa kertyy.', d: 'Dataa syntyy järjestelmiin ja tiedostoihin, mutta sitä ei vielä käytetä järjestelmällisesti.', next: 'Tunnista tärkeimmät tietolähteet ja niiden omistajat.' },
  { t: 'Dataa raportoidaan.', d: 'Säännölliset raportit kertovat, mitä tapahtui.', next: 'Yhtenäistä mittarit ja määritelmät eri järjestelmien välillä.' },
  { t: 'Dataa analysoidaan.', d: 'Dataa tutkitaan syiden ja yhteyksien löytämiseksi.', next: 'Valitse yksi liiketoimintakysymys, jonka ennustaminen tuottaisi arvoa.' },
  { t: 'Dataa ennustetaan.', d: 'Mallit arvioivat tulevaa kysyntää, riskejä tai kustannuksia.', next: 'Tuo ennusteet osaksi arjen päätöksentekoa ja työkaluja.' },
  { t: 'AI tukee päätöksentekoa.', d: 'Ennusteet ja suositukset ovat osa arjen työkaluja. Ihminen päättää.', next: 'Seuraa mallien laatua ja mittaa vaikutusta liiketoimintaan.' },
  { t: 'Prosesseja optimoidaan automaattisesti.', d: 'Tarkasti rajatut toimenpiteet tapahtuvat automaattisesti ja valvotusti.', next: 'Ylläpidä valvontaa, auditointia ja ihmisen päätösvastuuta.' },
]

export function Maturity() {
  const [sel, setSel] = useState(3)
  const m = MATURITY[sel]
  return (
    <Section id="matka" tone="dark" labelledBy="matka-title">
      <SectionHeader
        dark
        id="matka-title"
        eyebrow="Datasta päätökseen"
        title="Yrityksen matka kohti AI-analytiikkaa"
        intro={<p>Useimmat yritykset etenevät vaiheittain. Valitse taso, joka kuvaa yritystäsi parhaiten, ja katso luonteva seuraava askel.</p>}
      />

      <Reveal className="mt-14">
        <div className="relative">
          <div className="absolute left-0 right-0 top-[1.15rem] hidden h-1 rounded-full bg-white/10 md:block" aria-hidden="true">
            <div
              className="h-full rounded-full bg-accent-500 transition-[width] duration-700 ease-out"
              style={{ width: `${(sel / (MATURITY.length - 1)) * 100}%` }}
            />
          </div>
          <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            {MATURITY.map((lvl, i) => {
              const reached = i <= sel
              return (
                <li key={lvl.t}>
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    aria-pressed={i === sel}
                    className={`group flex h-full w-full flex-col items-start rounded-xl p-3 text-left transition-colors md:p-0 md:hover:bg-transparent ${
                      i === sel ? 'bg-white/[0.06] md:bg-transparent' : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ring-4 ring-ink-900 transition-colors ${
                        i === sel ? 'bg-accent-500 text-white' : reached ? 'bg-white text-ink-900' : 'bg-ink-700 text-slate-400 group-hover:bg-ink-600'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="mt-3 text-[0.72rem] uppercase tracking-[0.14em] text-slate-500">Taso {i + 1}</span>
                    <span className={`mt-1 text-[0.95rem] font-medium leading-snug ${i === sel ? 'text-white' : 'text-slate-300'}`}>{lvl.t}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2" aria-live="polite">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-slate-400">Taso {sel + 1} – tyypillistä</p>
            <p className="mt-3 text-lg leading-relaxed text-white">{m.d}</p>
          </div>
          <div className="rounded-2xl bg-accent-500 p-6 sm:p-7">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-white/75">Luonteva seuraava askel</p>
            <p className="mt-3 text-lg font-medium leading-relaxed text-white">{m.next}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ---------- 16. Mitä dataa tarvitaan ---------- */

const SOURCES = [
  { icon: Table, t: 'Excel' },
  { icon: Layers, t: 'ERP' },
  { icon: Users, t: 'CRM' },
  { icon: Cart, t: 'Verkkokauppa' },
  { icon: Wallet, t: 'Taloushallinto' },
  { icon: Factory, t: 'Tuotantojärjestelmät' },
  { icon: Activity, t: 'IoT' },
  { icon: Globe, t: 'Verkkosivusto' },
  { icon: Headset, t: 'Asiakaspalvelu' },
]

const MATTERS = [
  { t: 'Datan laatu', d: 'Puuttuvat ja virheelliset tiedot heikentävät mitä tahansa mallia.' },
  { t: 'Datan saatavuus', d: 'Data pitää saada järjestelmistä käyttöön turvallisesti ja säännöllisesti.' },
  { t: 'Liiketoimintaongelman selkeys', d: 'Mitä päätöstä analyysin on tarkoitus parantaa?' },
  { t: 'Oikea analyysimenetelmä', d: 'Aina ei tarvita raskasta tekoälyä. Joskus tilastollinen malli riittää.' },
]

export function DataNeeds() {
  return (
    <Section id="data" labelledBy="data-title">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            id="data-title"
            eyebrow="Lähtökohdat"
            title="Tarvitaanko valtava määrä dataa?"
          >
            <p className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-accent-600 sm:text-6xl">Ei välttämättä.</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              AI-analytiikkaprojekti voi alkaa olemassa olevasta datasta. Jos yritykselläsi on muutaman vuoden myynti-,
              tuotanto- tai asiakasdata, sillä pääsee usein jo pitkälle.
            </p>
          </SectionHeader>
          <Reveal className="mt-10">
            <h3 className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-slate-500">Tyypillisiä lähteitä</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SOURCES.map((s) => (
                <li key={s.t} className="flex items-center gap-2.5 rounded-lg border border-mist-200 px-3 py-2.5 text-sm text-slate-700">
                  <s.icon size={17} className="shrink-0 text-slate-400" />
                  {s.t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="rounded-3xl bg-mist-50 p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <Database size={20} className="text-accent-600" />
            <h3 className="text-xl font-semibold tracking-tight text-ink-900">Tärkeämpää kuin datan määrä</h3>
          </div>
          <ol className="mt-8 space-y-7">
            {MATTERS.map((x, i) => (
              <li key={x.t} className="grid grid-cols-[2.5rem_1fr] gap-2">
                <span className="text-2xl font-semibold tabular-nums text-slate-300">{i + 1}</span>
                <div>
                  <p className="text-lg font-semibold text-ink-900">{x.t}</p>
                  <p className="mt-1 leading-relaxed text-slate-600">{x.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-9 flex gap-3 border-t border-mist-200 pt-6 text-sm leading-relaxed text-slate-600">
            <Search size={18} className="mt-0.5 shrink-0 text-slate-400" />
            Voit aloittaa yksinkertaisesti: valitse yksi kysymys, kokoa siihen liittyvä data ja testaa, paljonko ennuste parantaa
            nykyistä arviota.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
