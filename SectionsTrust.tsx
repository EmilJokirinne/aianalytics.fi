import { SOURCE_STATFI_2025 } from './config'
import {
  Activity,
  Check,
  ChevronDown,
  Eye,
  FileSearch,
  Funnel,
  Key,
  Lock,
  Scale,
  Shield,
  ShieldCheck,
  UserCheck,
  XCircle,
} from './icons'
import { Reveal, Section, SectionHeader } from './ui'

/* ---------- 17. Tietoturva ja vastuullisuus ---------- */

const TRUST = [
  { icon: Shield, t: 'Tietosuoja', d: 'Henkilötietojen käsittelylle tarvitaan peruste ja selkeä käyttötarkoitus.' },
  { icon: Scale, t: 'GDPR', d: 'EU:n yleinen tietosuoja-asetus koskee henkilötietoja myös analytiikassa.' },
  { icon: Key, t: 'Käyttöoikeudet', d: 'Dataan ja tuloksiin pääsevät vain ne, joiden työ sitä edellyttää.' },
  { icon: Funnel, t: 'Datan minimointi', d: 'Käytetään vain dataa, jota käyttötapaus todella tarvitsee.' },
  { icon: Lock, t: 'Tietoturva', d: 'Salaus, turvalliset integraatiot ja tieto siitä, missä data käsitellään.' },
  { icon: FileSearch, t: 'Auditointi', d: 'Lokitus osoittaa, mitä dataa käytettiin, milloin ja mihin.' },
  { icon: Activity, t: 'Mallien valvonta', d: 'Mallin tarkkuutta seurataan, koska data ja olosuhteet muuttuvat.' },
  { icon: Eye, t: 'Selitettävyys', d: 'Käyttäjän pitää ymmärtää, mihin tekijöihin tulos perustuu.' },
  { icon: UserCheck, t: 'Ihmisen päätösvastuu', d: 'Merkittävät päätökset tekee ja niistä vastaa ihminen.' },
  { icon: ShieldCheck, t: 'EU:n tekoälysääntely', d: 'EU:n tekoälyasetus asettaa vaatimuksia riskiperusteisesti, ja velvoitteet tulevat sovellettaviksi vaiheittain.' },
]

export function Trust() {
  return (
    <Section id="luottamus" tone="muted" labelledBy="luottamus-title">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeader
            id="luottamus-title"
            eyebrow="Tietoturva ja vastuullisuus"
            title="AI-analytiikka tarvitsee luottamusta."
            intro={
              <>
                <p className="font-medium text-ink-900">
                  Yrityksen dataa ei pidä syöttää tekoälyratkaisuihin ilman, että tiedetään missä data käsitellään, kuka siihen
                  pääsee ja mihin sitä käytetään.
                </p>
                <p>
                  AI-ratkaisujen vaatimukset riippuvat käyttötarkoituksesta, datasta ja riskitasosta. Erityisesti henkilötietoja
                  tai työntekijöitä koskevissa käyttötapauksissa vaatimukset on arvioitava tapauskohtaisesti.
                </p>
              </>
            }
          />
          <Reveal className="mt-10 rounded-2xl border border-mist-200 bg-white p-6">
            <p className="text-sm font-medium text-ink-900">Käyttö on yleisempää kuin ohjeistus</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">
              Tilastokeskuksen mukaan 15 % yrityksistä oli vuonna 2025 dokumentoinut tekoälyn käyttöön liittyviä ohjeita tai
              toimintatapoja, kun tekoälyä käytti 38 %. Vähintään 100 henkilön yrityksistä ohjeistus oli 51 %:lla.
            </p>
            <a href={SOURCE_STATFI_2025} target="_blank" rel="noopener" className="mt-3 inline-block text-[0.8rem] text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-ink-900">
              Lähde: Tilastokeskus 2025
            </a>
          </Reveal>
        </div>

        <div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-mist-200 bg-mist-200 sm:grid-cols-2">
            {TRUST.map((x, i) => (
              <Reveal as="li" key={x.t} delay={(i % 2) * 80} className="flex gap-4 bg-white p-5 sm:p-6">
                <x.icon size={20} className="mt-0.5 shrink-0 text-accent-600" />
                <div>
                  <h3 className="font-semibold text-ink-900">{x.t}</h3>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-slate-600">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-4 text-[0.8rem] text-slate-500">Sivuston sisältö on yleistä tietoa, ei oikeudellista neuvontaa.</p>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 18. Mitä AI-analytiikka ei ole ---------- */

const NOT = [
  'tee huonosta datasta hyvää',
  'ratkaise epäselvää liiketoimintaongelmaa',
  'korvaa asiantuntijoita',
  'takaa täydellisiä ennusteita',
  'poista päätöksenteon riskiä',
]

export function NotMagic() {
  return (
    <Section id="realismi" tone="dark" labelledBy="realismi-title" className="overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-500/[0.12] blur-3xl" aria-hidden="true" />
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader dark id="realismi-title" eyebrow="Realismi" title="AI-analytiikka ei ole taikalaatikko." />
          <Reveal className="mt-10">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-slate-400">Se ei automaattisesti</p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {NOT.map((n) => (
                <li key={n} className="flex items-center gap-4 py-4 text-lg text-slate-300">
                  <XCircle size={20} className="shrink-0 text-slate-500" />
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="flex flex-col justify-end gap-10">
          <Reveal>
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-300">Mutta se voi</p>
            <p className="mt-4 flex gap-4 text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-3xl">
              <Check size={28} strokeWidth={2.25} className="mt-1 shrink-0 text-accent-400" />
              auttaa yritystä näkemään datastaan enemmän kuin ihminen ehtii manuaalisesti nähdä.
            </p>
          </Reveal>
          <Reveal delay={150} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 sm:p-8">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-slate-400">Tärkein periaate</p>
            <p className="mt-3 text-balance text-xl font-medium leading-snug text-white sm:text-2xl">
              Hyvä AI-analytiikka alkaa hyvästä liiketoimintaongelmasta, ei teknologiasta.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 19. FAQ ---------- */

export const FAQ = [
  {
    q: 'Mitä AI-analytiikka maksaa?',
    a: 'Kustannukset riippuvat käyttötapauksesta, datan määrästä, integraatioista ja ratkaisun laajuudesta. Yksinkertainen analytiikkapilotti voi olla huomattavasti kevyempi kuin kokonaisen yrityksen data-alustan rakentaminen.',
  },
  {
    q: 'Tarvitaanko oma AI-malli?',
    a: 'Ei aina. Monissa tapauksissa olemassa olevia koneoppimis- ja AI-malleja voidaan hyödyntää.',
  },
  {
    q: 'Voiko AI-analytiikka käyttää Excel-dataa?',
    a: 'Kyllä. Excel voi olla hyvä lähtöpiste ensimmäiseen analyysiin, vaikka tuotantoratkaisussa data kannattaa usein yhdistää järjestelmällisempiin tietolähteisiin.',
  },
  {
    q: 'Voiko AI ennustaa myyntiä?',
    a: 'Kyllä. Ennustemalleja voidaan rakentaa esimerkiksi historiallisen myynnin, kausivaihtelun, kampanjoiden ja muiden relevanttien muuttujien perusteella.',
  },
  {
    q: 'Voiko AI tunnistaa asiakaspoistuman?',
    a: 'Kyllä. Koneoppimismalli voi tunnistaa asiakkaiden käyttäytymismalleja, jotka liittyvät kasvaneeseen poistumisriskiin.',
  },
  {
    q: 'Tarvitaanko paljon dataa?',
    a: 'Ei välttämättä. Käyttötapaus ja datan laatu ovat usein tärkeämpiä kuin datan määrä.',
  },
  {
    q: 'Voiko AI tehdä päätökset yrityksen puolesta?',
    a: 'Joissain tarkasti rajatuissa prosesseissa automaatio voi tehdä toimenpiteitä. Monissa liiketoiminnan kannalta merkittävissä päätöksissä ihmisen valvonta ja päätösvastuu ovat kuitenkin edelleen tärkeitä.',
  },
  {
    q: 'Onko AI-analytiikka sama asia kuin ChatGPT?',
    a: 'Ei. Generatiivinen AI on yksi tekoälyn osa-alue. AI-analytiikka voi sisältää esimerkiksi koneoppimista, ennustamista, poikkeamien tunnistamista, optimointia ja generatiivista AI:ta.',
  },
]

export function Faq() {
  return (
    <Section id="ukk" labelledBy="ukk-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="ukk-title"
            eyebrow="Usein kysyttyä"
            title="Kysymyksiä AI-analytiikasta"
            intro={<p>Lyhyet vastaukset yleisimpiin kysymyksiin, joita yrityksissä mietitään ennen ensimmäistä AI-analytiikan pilottia.</p>}
          />
        </div>
        <Reveal className="divide-y divide-mist-200 border-y border-mist-200">
          {FAQ.map((f) => (
            <details key={f.q} className="faq group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg font-medium text-ink-900 transition-colors hover:text-accent-600">
                <span>{f.q}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mist-200 text-slate-500 transition-colors group-open:border-ink-900 group-open:bg-ink-900 group-open:text-white">
                  <ChevronDown size={16} className="transition-transform duration-300 group-open:rotate-180" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
