import { SOURCE_STATFI_2025 } from './config'
import {
  Activity,
  Alert,
  Building,
  CalendarClock as Calendar,
  Cart,
  Coins,
  Cpu,
  Factory,
  Globe,
  Info,
  Megaphone,
  Message,
  Network,
  Puzzle,
  Search,
  Sigma,
  Target,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from './icons'
import { DemoBadge, Reveal, Section, SectionHeader } from './ui'

/* ---------- 8. Käyttökohteet ---------- */

const USE_CASES = [
  {
    icon: TrendingUp,
    title: 'Myynti',
    verb: 'Ennusta',
    items: ['myyntiä', 'kysyntää', 'asiakaskohtaista ostotodennäköisyyttä', 'myyntimahdollisuuksia'],
    note: 'AI voi auttaa myyntitiimiä keskittymään asiakkaisiin, joissa potentiaali on suurin.',
  },
  {
    icon: Megaphone,
    title: 'Markkinointi',
    verb: 'Analysoi',
    items: ['kampanjoita', 'asiakassegmenttejä', 'konversioita', 'asiakaskäyttäytymistä'],
    note: 'AI voi auttaa tunnistamaan, mikä markkinointi toimii ja missä asiakkaat reagoivat parhaiten.',
  },
  {
    icon: Users,
    title: 'Asiakkuudet',
    verb: 'Tunnista',
    items: ['poistumisriski', 'asiakkaan ostokäyttäytyminen', 'asiakasarvo', 'seuraava todennäköinen ostos'],
    note: 'Kun riski näkyy ajoissa, asiakkuuteen ehtii vielä vaikuttaa.',
  },
  {
    icon: Wallet,
    title: 'Talous',
    verb: 'Analysoi',
    items: ['kassavirtaa', 'kustannuksia', 'budjetteja', 'poikkeamia', 'taloudellisia riskejä'],
    note: 'Poikkeamat ja kassavirran muutokset voidaan havaita ennen kuukauden sulkemista.',
  },
  {
    icon: Factory,
    title: 'Tuotanto',
    verb: 'AI voi auttaa',
    items: ['ennakoivassa kunnossapidossa', 'tuotannon optimoinnissa', 'laatupoikkeamien tunnistamisessa', 'kapasiteetin suunnittelussa'],
    note: 'Seisokkeja voidaan ennakoida ja huoltoja suunnitella tuotannon kannalta parhaaseen aikaan.',
  },
  {
    icon: Truck,
    title: 'Logistiikka',
    verb: 'Analysoi',
    items: ['toimituksia', 'reittejä', 'varastotasoja', 'kysyntää', 'toimitusriskejä'],
    note: 'Varasto ja kuljetukset voidaan mitoittaa ennustetun kysynnän mukaan.',
  },
  {
    icon: Calendar,
    title: 'Henkilöstö',
    verb: 'Mahdollisia käyttökohteita',
    items: ['resurssien suunnittelu', 'työvuorojen optimointi', 'henkilöstötarpeen ennustaminen'],
    note: 'Kyse on resurssien suunnittelusta. Tekoäly ei arvioi työntekijöitä eikä tee rekrytointipäätöksiä.',
  },
  {
    icon: Cart,
    title: 'Verkkokauppa',
    verb: 'AI voi auttaa',
    items: [
      'tuotesuosituksissa',
      'kysynnän ennustamisessa',
      'hinnoittelun analysoinnissa',
      'asiakkaiden segmentoinnissa',
      'ostoskorikäyttäytymisen analysoinnissa',
    ],
    note: 'Valikoimaa, varastoa ja markkinointia voidaan ohjata saman datan pohjalta.',
  },
]

export function UseCases() {
  return (
    <Section id="kayttokohteet" tone="muted" labelledBy="kayttokohteet-title">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader
          id="kayttokohteet-title"
          eyebrow="Käyttökohteet"
          title="Missä AI-analytiikka on hyödyllistä?"
          intro={
            <p>
              Hyvä käyttökohde löytyy yleensä sieltä, missä yrityksesi tekee toistuvasti päätöksiä epävarman tiedon varassa:
              paljonko tilataan, kehen kannattaa olla yhteydessä, milloin kone huolletaan.
            </p>
          }
        />
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((u, i) => (
          <Reveal
            as="li"
            key={u.title}
            delay={(i % 4) * 80}
            className="group relative flex flex-col rounded-2xl border border-mist-200 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-[0_20px_40px_-24px_rgba(10,17,31,0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-white transition-colors group-hover:bg-accent-500">
                <u.icon size={20} />
              </span>
              <span className="text-[0.72rem] font-medium tabular-nums text-slate-400">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink-900">{u.title}</h3>
            <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-accent-600">{u.verb}</p>
            <ul className="mb-6 mt-2 space-y-1.5 text-[0.95rem] text-slate-700">
              {u.items.map((it) => (
                <li key={it} className="flex gap-2.5">
                  <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-mist-100 pt-4 text-sm leading-relaxed text-slate-600">
              {u.note}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

/* ---------- 9. AI-analytiikkaa käytetään jo ---------- */

const TECH = [
  {
    icon: TrendingUp,
    title: 'Ennakoiva analytiikka',
    text: 'Ennustaa tulevaa historiallisen ja reaaliaikaisen datan perusteella.',
    ex: ['kysynnän ennustaminen', 'myyntiennusteet', 'asiakaspoistuman ennustaminen', 'huoltotarpeen ennustaminen'],
  },
  {
    icon: Alert,
    title: 'Poikkeamien tunnistus',
    text: 'AI tunnistaa datasta normaalista poikkeavia tilanteita.',
    ex: ['epäilyttävät maksut', 'tuotannon poikkeamat', 'talouden poikkeamat', 'verkkoliikenteen poikkeamat'],
  },
  {
    icon: Target,
    title: 'Suositusjärjestelmät',
    text: 'AI ehdottaa asiakkaalle tai työntekijälle seuraavaa vaihtoehtoa.',
    ex: ['verkkokaupan tuotesuositukset', 'sisällön suositukset', 'seuraava paras toimenpide'],
  },
  {
    icon: Cpu,
    title: 'Koneoppiminen',
    text: 'Mallit oppivat historiallisesta datasta ja käyttävät opittuja malleja uuden datan analysointiin.',
    ex: ['luokittelu', 'ennustemallit', 'ryhmittely eli segmentointi'],
  },
  {
    icon: Message,
    title: 'Luonnollisen kielen analyysi',
    text: 'AI analysoi tekstiä ja tiivistää siitä olennaisen.',
    ex: ['asiakaspalautteet', 'sähköpostit', 'dokumentit', 'keskustelut', 'avoimet vastaukset'],
  },
]

export function Technologies() {
  return (
    <Section id="teknologiat" labelledBy="teknologiat-title">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
        <SectionHeader
          id="teknologiat-title"
          eyebrow="Teknologiat"
          title="AI-analytiikkaa käytetään jo nyt."
          intro={
            <p>
              Tekoälyanalytiikka ei tarkoita yhtä tiettyä ohjelmaa. Se koostuu useista teknologioista, joita yritykset
              käyttävät jo päivittäisessä toiminnassaan.
            </p>
          }
        />
        <Reveal className="rounded-2xl border border-mist-200 bg-mist-50 p-6">
          <p className="flex items-center gap-2 text-sm font-medium text-ink-900">
            <Info size={16} className="text-accent-600" /> Tilastokeskuksen mukaan
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            yleisin yritysten käyttämä tekoälyteknologia vuonna 2025 oli kirjoitettua tekstiä analysoiva teknologia. Sitä
            käytti <strong className="font-semibold text-ink-900">29 %</strong> yrityksistä.
          </p>
          <a href={SOURCE_STATFI_2025} target="_blank" rel="noopener" className="mt-3 inline-block text-[0.8rem] text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-ink-900">
            Lähde: Tilastokeskus 2025
          </a>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-3">
        {TECH.map((t, i) => (
          <Reveal as="li" key={t.title} delay={(i % 3) * 90} className="bg-white p-7">
            <t.icon size={22} className="text-accent-600" />
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900">{t.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{t.text}</p>
            <p className="mt-5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-slate-500">Esimerkkejä</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {t.ex.map((e) => (
                <li key={e} className="rounded-md bg-mist-100 px-2.5 py-1 text-[0.8rem] text-slate-700">
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal as="li" className="bg-ink-900 p-7 text-white sm:col-span-2 lg:col-span-1">
          <Sigma size={22} className="text-accent-300" />
          <h3 className="mt-5 text-lg font-semibold tracking-tight">Generatiivinen AI + analytiikka</h3>
          <p className="mt-2 leading-relaxed text-slate-300">
            Generatiivinen AI voi tehdä analytiikan tuloksista ymmärrettävämpiä: se muodostaa yrityksen datasta luonnollisen
            kielen yhteenvedon siitä, mitkä tekijät vaikuttivat muutokseen.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-accent-500 px-4 py-2.5">
              Miksi myynti laski viime kuussa?
            </p>
            <div className="max-w-[95%] rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3 leading-relaxed text-slate-200 ring-1 ring-white/10">
              Myynti laski 6,8 % edellisestä kuukaudesta. Suurimmat tekijät olivat kampanjan siirtyminen seuraavalle kuulle
              ja yhden tuoteryhmän saatavuusongelmat. Asiakasmäärä pysyi ennallaan, mutta keskiostos pieneni.
              <p className="mt-2 text-[0.72rem] text-slate-400">Lähteet: myyntidata · kampanjakalenteri · varastodata</p>
            </div>
          </div>
          <div className="mt-5">
            <DemoBadge dark>Havainnollistava esimerkki</DemoBadge>
          </div>
        </Reveal>
      </ul>
    </Section>
  )
}

/* ---------- 10. Suomessa ---------- */

const FIN_POINTS = [
  {
    title: 'Korkeat työvoimakustannukset',
    text: 'Automaatio ja parempi päätöksenteko voivat auttaa vähentämään manuaalista analyysityötä.',
  },
  {
    title: 'Pienet kotimarkkinat',
    text: 'Yritysten täytyy löytää tehokkuutta ja kansainvälistä kilpailuetua. Viennissä ennakoitavuus on erityisen arvokasta.',
  },
  {
    title: 'Vahva digitaalinen infrastruktuuri',
    text: 'Suomalaisilla yrityksillä on jo paljon digitaalista dataa, ERP-järjestelmiä, CRM-järjestelmiä ja pilvipalveluita.',
  },
  {
    title: 'Teollisuus',
    text: 'Suomessa on paljon valmistavaa teollisuutta, jossa ennakoiva analytiikka, tuotannon optimointi ja kunnossapito voivat tuottaa merkittävää arvoa.',
  },
  {
    title: 'Pk-yritykset',
    text: 'AI-analytiikan ei tarvitse tarkoittaa miljoonaluokan hanketta. Pieni pilotti voi alkaa yhdestä liiketoimintaongelmasta.',
  },
]

const INFRA = [
  { v: 79, l: 'käytti maksullisia pilvipalveluita' },
  { v: 58, l: 'käytti toiminnanohjausjärjestelmää (ERP)' },
  { v: 56, l: 'käytti asiakkuudenhallintajärjestelmää (CRM)' },
  { v: 43, l: 'käytti BI-ohjelmistoa' },
]

const INDUSTRIES = [
  { icon: Factory, t: 'Valmistava teollisuus', d: 'ennakoiva kunnossapito, laatu' },
  { icon: Building, t: 'Rakennusala', d: 'kustannus- ja aikatauluriskit' },
  { icon: Cart, t: 'Vähittäiskauppa', d: 'menekki ja valikoima' },
  { icon: Globe, t: 'Verkkokauppa', d: 'suositukset, kysyntä' },
  { icon: Truck, t: 'Logistiikka', d: 'reitit, toimitusvarmuus' },
  { icon: Activity, t: 'Energia', d: 'kulutus- ja tuotantoennusteet' },
  { icon: Network, t: 'Metsäala', d: 'hankinnan ja kuljetusten suunnittelu' },
  { icon: Cpu, t: 'Teknologia', d: 'tuotteen käyttödata' },
  { icon: Puzzle, t: 'Asiantuntijapalvelut', d: 'resursointi ja projektiennusteet' },
  { icon: Users, t: 'Terveydenhuolto', d: 'palvelukysynnän ennakointi' },
  { icon: Coins, t: 'Finanssi', d: 'poikkeamien tunnistus' },
  { icon: Search, t: 'Matkailu', d: 'kausivaihtelu ja kysyntä' },
  { icon: Building, t: 'Julkiset palvelut', d: 'palvelutarpeen ennakointi' },
]

export function Finland() {
  return (
    <Section id="suomessa" tone="dark" labelledBy="suomessa-title" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" aria-hidden="true" />
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionHeader
          dark
          id="suomessa-title"
          eyebrow="Suomalainen näkökulma"
          title="Miksi AI-analytiikka on tärkeää Suomessa?"
          intro={
            <p>
              Suomessa yritysten kilpailukyky perustuu usein osaamiseen, tehokkuuteen ja kykyyn tehdä enemmän vähemmällä.
              AI-analytiikka voi auttaa yrityksiä hyödyntämään olemassa olevaa dataa paremmin ilman, että kaikkea tarvitsee
              rakentaa alusta asti uudelleen.
            </p>
          }
        />
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:mt-8">
          <p className="text-sm font-medium text-white">Suomalaisten yritysten digitaalinen perusta 2025</p>
          <ul className="mt-6 space-y-5">
            {INFRA.map((r, i) => (
              <li key={r.l}>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-slate-300">{r.l}</span>
                  <span className="font-semibold tabular-nums text-white">{r.v} %</span>
                </div>
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden="true">
                  <span className="bar-grow block h-full rounded-full bg-accent-400" style={{ width: `${r.v}%`, animationDelay: `${i * 120}ms` }} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.78rem] text-slate-400">
            Osuus vähintään 10 henkilöä työllistävistä yrityksistä. Lähde:{' '}
            <a href={SOURCE_STATFI_2025} target="_blank" rel="noopener" className="underline decoration-slate-600 underline-offset-2 hover:text-white">
              Tilastokeskus, Tietotekniikan käyttö yrityksissä 2025
            </a>
            .
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {FIN_POINTS.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 80} className="rounded-2xl border border-white/10 bg-ink-800/60 p-6">
            <span className="text-sm font-semibold tabular-nums text-accent-300">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white">{p.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-400">{p.text}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-16 border-t border-white/10 pt-12">
        <h3 className="text-xl font-semibold tracking-tight text-white">Esimerkkejä suomalaisilta toimialoilta</h3>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <li key={ind.t} className="flex items-start gap-3">
              <ind.icon size={18} className="mt-0.5 shrink-0 text-slate-500" />
              <span>
                <span className="block font-medium text-white">{ind.t}</span>
                <span className="block text-sm text-slate-400">{ind.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
