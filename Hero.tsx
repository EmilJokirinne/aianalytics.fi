import type { ReactNode } from 'react'
import { ForecastChart, Sparkline } from './charts'
import { ArrowRight, Lightbulb } from './icons'
import { CountUp } from './ui'

// Deterministinen pisteverkko taustalle (sama tulos palvelimella ja selaimessa)
function seeded(seed: number) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}
const rnd = seeded(11)
const NODES = Array.from({ length: 30 }, () => ({ x: 560 + rnd() * 680, y: 30 + rnd() * 660, r: 1 + rnd() * 1.8 }))
const EDGES: [number, number][] = []
NODES.forEach((a, i) => {
  const near = NODES.map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
    .filter((o) => o.j !== i)
    .sort((p, q) => p.d - q.d)
    .slice(0, 2)
  near.forEach(({ j }) => {
    if (!EDGES.some(([p, q]) => (p === j && q === i) || (p === i && q === j))) EDGES.push([i, j])
  })
})

function NetworkBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_35%,#000_30%,transparent_75%)]" />
      <div className="absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-accent-500/[0.13] blur-3xl" />
      <svg className="absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 1240 720" preserveAspectRatio="xMidYMid slice">
        <g className="stroke-white/[0.07]" strokeWidth="1">
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
          ))}
        </g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            className={`${i % 3 === 0 ? 'fill-accent-300/60 float-a' : 'fill-white/25 float-b'}`}
            style={{ animationDelay: `${-i * 0.9}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

function Kpi({ label, children, sub, spark }: { label: string; children: ReactNode; sub?: ReactNode; spark?: number[] }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5 sm:p-4">
      <p className="text-[0.72rem] text-slate-400">{label}</p>
      <p className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-[1.4rem]">{children}</p>
      {sub && <p className="mt-0.5 text-[0.72rem] text-slate-400">{sub}</p>}
      {spark && (
        <div className="mt-2">
          <Sparkline values={spark} />
        </div>
      )}
    </div>
  )
}

const REVENUE = [208, 214, 221, 219, 230, 236, 229, 241, 247, 252, 268, 275]
const REVENUE_FC = [281, 290, 297, 306]

function HeroDashboard() {
  return (
    <div className="is-visible rise relative" style={{ animationDelay: '120ms' }}>
      <figure className="relative rounded-2xl border border-white/10 bg-ink-900/85 p-4 shadow-[0_40px_120px_-40px_rgba(74,114,255,0.45)] backdrop-blur-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-slate-500">Tilannekuva</p>
            <p className="mt-1 text-sm font-medium text-white">Liiketoiminta · 12 kk</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.72rem] text-slate-300 ring-1 ring-white/10">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            Esimerkkidata
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          <Kpi label="Liikevaihto" sub="viim. 12 kk">
            <CountUp value={2.84} decimals={2} suffix=" M€" />
          </Kpi>
          <Kpi label="Ennuste" sub="seuraavat 12 kk">
            <span className="text-accent-300">
              <CountUp value={12.4} decimals={1} prefix="+" suffix=" %" />
            </span>
          </Kpi>
          <Kpi label="Asiakaspoistuma" sub="kuukausittain">
            <CountUp value={3.2} decimals={1} suffix=" %" />
          </Kpi>
          <Kpi label="Kysyntäennuste" sub="seuraava neljännes">
            <CountUp value={8.7} decimals={1} prefix="+" suffix=" %" />
          </Kpi>
          <Kpi label="Tuotannon tehokkuus" sub="käyttöaste (OEE)">
            <CountUp value={86} suffix=" %" />
          </Kpi>
          <Kpi label="Riskitaso" sub="kokonaisarvio">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Matala
            </span>
          </Kpi>
        </div>

        <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.78rem] font-medium text-slate-300">Liikevaihto ja ennuste, k€/kk</p>
            <div className="flex items-center gap-4 text-[0.7rem] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-4 rounded bg-white" aria-hidden="true" />
                Toteutunut
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-4 rounded border-t-2 border-dashed border-accent-400" aria-hidden="true" />
                Ennuste
              </span>
            </div>
          </div>
          <div className="mt-3">
            <ForecastChart
              tone="dark"
              height={190}
              history={REVENUE}
              forecast={REVENUE_FC}
              band={{ lo: [274, 278, 280, 284], hi: [288, 302, 314, 328] }}
              title="Esimerkkikaavio: kuukausittainen liikevaihto noussut 208 000 eurosta 275 000 euroon, ennuste nousee 306 000 euroon."
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <p className="text-[0.72rem] text-slate-400">Kustannukset / budjetti</p>
            <p className="mt-1 text-sm font-medium text-white">97 %</p>
            <Sparkline values={[101, 103, 100, 99, 100, 98, 99, 97, 98, 97]} className="stroke-slate-400" />
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <p className="text-[0.72rem] text-slate-400">Kysyntäindeksi</p>
            <p className="mt-1 text-sm font-medium text-white">112</p>
            <Sparkline values={[96, 98, 97, 101, 103, 102, 106, 108, 110, 112]} />
          </div>
        </div>
        <figcaption className="sr-only">Esimerkki AI-analytiikan tuottamasta näkymästä. Kaikki luvut ovat kuvitteellisia.</figcaption>
      </figure>

      <div className="rise relative mt-4 max-w-sm rounded-xl border border-mist-200 bg-white p-4 text-ink-900 shadow-2xl sm:-ml-8 sm:-mt-6 lg:-ml-12" style={{ animationDelay: '900ms' }}>
        <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-accent-600">
          <Lightbulb size={15} /> AI:n havainto
        </p>
        <p className="mt-2 text-[0.9rem] leading-snug text-slate-700">
          Kysynnän kasvu painottuu marras–joulukuulle. Kahden tuoteryhmän varastotaso kannattaa tarkistaa nyt.
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="etusivu" aria-labelledby="hero-title" className="relative overflow-hidden bg-ink-950 pt-16 text-white">
      <NetworkBackdrop />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-14 lg:pb-32 lg:pt-24">
        <div>
          <p className="flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-accent-300">
            <span className="h-px w-7 bg-current opacity-60" aria-hidden="true" />
            AI-analytiikka suomalaisille yrityksille
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.35rem]"
          >
            Tekoäly tekee datasta <span className="text-accent-400">päätöksiä.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-slate-300 sm:text-lg">
            AI-analytiikka yhdistää yrityksen datan, koneoppimisen ja tekoälyn. Sen avulla voidaan tunnistaa trendejä,
            ennustaa tulevaa, löytää poikkeamia ja auttaa yritystä tekemään parempia päätöksiä.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#mita" className="btn btn-primary">
              Tutustu AI-analytiikkaan <ArrowRight size={18} />
            </a>
            <a href="#kayttokohteet" className="btn btn-ghost-dark">
              Katso käyttökohteet
            </a>
          </div>
          <dl className="mt-14 grid max-w-xl grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-6">
            {[
              ['Data', 'kertoo, mitä tapahtuu.'],
              ['AI', 'auttaa ymmärtämään, mitä seuraavaksi voi tapahtua.'],
              ['Ihminen', 'tekee lopullisen päätöksen.'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm font-semibold text-white">{k}</dt>
                <dd className="mt-1 text-sm leading-snug text-slate-400">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:pl-4">
          <HeroDashboard />
          <p className="mt-5 text-[0.78rem] text-slate-500 sm:text-right">
            Esimerkki AI-analytiikan tuottamasta näkymästä. Luvut ovat kuvitteellisia.
          </p>
        </div>
      </div>
    </section>
  )
}
