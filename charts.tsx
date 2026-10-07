// Kevyet SVG-kaaviot ilman ulkoisia kirjastoja.
import { useId } from 'react'

type Pt = [number, number]
const toPath = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')

export function ForecastChart({
  history,
  forecast,
  band,
  labels,
  threshold,
  tone = 'light',
  title,
  height = 240,
  forecastLabel = 'Ennuste',
}: {
  history: number[]
  forecast: number[]
  band?: { lo: number[]; hi: number[] }
  labels?: string[]
  threshold?: { value: number; label: string }
  tone?: 'light' | 'dark'
  title: string
  height?: number
  forecastLabel?: string
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const W = 640
  const H = height
  const pl = 4
  const pr = 4
  const pt = 24
  const pb = labels ? 30 : 8
  const all = [...history, ...forecast, ...(band ? [...band.lo, ...band.hi] : []), ...(threshold ? [threshold.value] : [])]
  let min = Math.min(...all)
  let max = Math.max(...all)
  const span = max - min || 1
  min -= span * 0.22
  max += span * 0.1
  const n = history.length + forecast.length
  const x = (i: number) => pl + (i / (n - 1)) * (W - pl - pr)
  const y = (v: number) => pt + (1 - (v - min) / (max - min)) * (H - pt - pb)
  const hp: Pt[] = history.map((v, i) => [x(i), y(v)])
  const last = hp[hp.length - 1]
  const fp: Pt[] = [last, ...forecast.map((v, i) => [x(history.length + i), y(v)] as Pt)]
  const base = H - pb
  const area = `${toPath(hp)} L${last[0].toFixed(1)} ${base} L${hp[0][0].toFixed(1)} ${base} Z`
  let bandPath = ''
  if (band) {
    const hi: Pt[] = band.hi.map((v, i) => [x(history.length + i), y(v)])
    const lo: Pt[] = band.lo.map((v, i) => [x(history.length + i), y(v)] as Pt).reverse()
    bandPath = `${toPath([last, ...hi])} ${lo.map((p) => `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')} Z`
  }
  const dark = tone === 'dark'
  const end = fp[fp.length - 1]
  const gridCls = dark ? 'stroke-white/[0.07]' : 'stroke-ink-900/[0.07]'
  const textCls = dark ? 'fill-slate-400' : 'fill-slate-500'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img" aria-label={title}>
      <defs>
        <linearGradient id={`area-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-500)" stopOpacity={dark ? 0.32 : 0.16} />
          <stop offset="100%" stopColor="var(--color-accent-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.33, 0.66, 1].map((f) => {
        const yy = pt + (H - pt - pb) * f
        return <line key={f} x1={pl} x2={W - pr} y1={yy} y2={yy} className={gridCls} strokeWidth="1" />
      })}
      <path d={area} fill={`url(#area-${uid})`} className="fade-late" />
      {bandPath && <path d={bandPath} className={`fade-late ${dark ? 'fill-accent-400/20' : 'fill-accent-500/12'}`} />}
      {threshold && (
        <g className="fade-late">
          <line
            x1={pl}
            x2={W - pr}
            y1={y(threshold.value)}
            y2={y(threshold.value)}
            strokeDasharray="2 5"
            strokeWidth="1.5"
            className="stroke-amber-500"
          />
          <text x={pl + 2} y={y(threshold.value) - 7} className="fill-amber-600 text-[15px] font-medium">
            {threshold.label}
          </text>
        </g>
      )}
      <line
        x1={last[0]}
        x2={last[0]}
        y1={pt - 10}
        y2={base}
        strokeDasharray="3 4"
        strokeWidth="1"
        className={dark ? 'stroke-white/25' : 'stroke-ink-900/25'}
      />
      <text x={last[0] + 8} y={pt - 1} className={`${dark ? 'fill-accent-300' : 'fill-accent-600'} text-[15px] font-medium`}>
        {forecastLabel}
      </text>
      <path
        d={toPath(hp)}
        pathLength={1}
        className={`draw fill-none ${dark ? 'stroke-white' : 'stroke-ink-900'}`}
        strokeWidth="2.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={toPath(fp)}
        className="fade-late fill-none stroke-accent-500"
        strokeWidth="2.25"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      <circle cx={end[0]} cy={end[1]} r="9" className="pulse-dot fade-late fill-accent-500" />
      <circle cx={end[0]} cy={end[1]} r="4.5" className={`fade-late fill-accent-500 ${dark ? 'stroke-ink-900' : 'stroke-white'}`} strokeWidth="2" />
      {labels &&
        labels.map((l, i) =>
          l ? (
            <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'} className={`${textCls} text-[15px]`}>
              {l}
            </text>
          ) : null,
        )}
    </svg>
  )
}

/** Pylväskaavio, jossa viimeiset pylväät ovat ennusteita. */
export function ForecastBars({
  values,
  labels,
  forecastCount = 1,
  title,
  valueLabel,
}: {
  values: number[]
  labels: string[]
  forecastCount?: number
  title: string
  valueLabel?: string
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const W = 640
  const H = 240
  const pt = 30
  const pb = 30
  const max = Math.max(...values) * 1.08
  const gap = 14
  const bw = (W - gap * (values.length - 1)) / values.length
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img" aria-label={title}>
      <defs>
        <pattern id={`hatch-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="var(--color-accent-500)" />
          <line x1="0" y1="0" x2="0" y2="7" stroke="#fff" strokeOpacity=".28" strokeWidth="3" />
        </pattern>
      </defs>
      {[0, 0.5, 1].map((f) => {
        const yy = pt + (H - pt - pb) * f
        return <line key={f} x1="0" x2={W} y1={yy} y2={yy} className="stroke-ink-900/[0.07]" strokeWidth="1" />
      })}
      {values.map((v, i) => {
        const h = (v / max) * (H - pt - pb)
        const xx = i * (bw + gap)
        const isF = i >= values.length - forecastCount
        return (
          <g key={i}>
            <rect
              x={xx}
              y={H - pb - h}
              width={bw}
              height={h}
              rx="4"
              className={`bar-grow-y ${isF ? '' : 'fill-ink-900/[0.14]'}`}
              fill={isF ? `url(#hatch-${uid})` : undefined}
              style={{ animationDelay: `${i * 60}ms` }}
            />
            {isF && valueLabel && (
              <text x={xx + bw / 2} y={H - pb - h - 9} textAnchor="middle" className="fade-late fill-accent-600 text-[14px] font-semibold">
                {valueLabel}
              </text>
            )}
            <text x={xx + bw / 2} y={H - 8} textAnchor="middle" className={`text-[15px] ${isF ? 'fill-accent-600 font-medium' : 'fill-slate-500'}`}>
              {labels[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function Sparkline({ values, className = 'stroke-accent-400', height = 28 }: { values: number[]; className?: string; height?: number }) {
  const W = 100
  const min = Math.min(...values)
  const max = Math.max(...values)
  const pts: Pt[] = values.map((v, i) => [(i / (values.length - 1)) * W, 3 + (1 - (v - min) / (max - min || 1)) * (height - 6)])
  return (
    <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className="block h-7 w-full" aria-hidden="true">
      <path d={toPath(pts)} className={`fill-none ${className}`} strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
