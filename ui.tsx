// Yhteiset rakennuspalikat: osiot, otsikot, animaatiot ja numeroiden muotoilu.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const nf = new Map<number, Intl.NumberFormat>()
/** Suomalainen numeromuotoilu: 2,84 · 284 000 */
export function fmt(value: number, decimals = 0) {
  let f = nf.get(decimals)
  if (!f) {
    f = new Intl.NumberFormat('fi-FI', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    nf.set(decimals, f)
  }
  // Käytetään kapeaa sitovaa välilyöntiä tuhaterottimena kaikissa ympäristöissä
  return f.format(value).replace(/[  \s]/g, ' ').replace('-', '−')
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(m.matches)
    update()
    m.addEventListener('change', update)
    return () => m.removeEventListener('change', update)
  }, [])
  return reduced
}

/** Palauttaa true, kun elementti on ensimmäisen kerran näkyvissä. */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, inView] as const
}

type RevealTag = 'div' | 'li' | 'article' | 'figure' | 'ol' | 'ul'

/** Häivyttää sisällön näkyviin. Ilman JavaScriptiä sisältö näkyy heti. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  id,
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: RevealTag
  id?: string
}) {
  const [ref, inView] = useInView<HTMLElement>()
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined
  return (
    <Tag ref={ref as never} id={id} className={`reveal ${inView ? 'is-visible' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  )
}

/** Laskee luvun nollasta lopulliseen arvoon, kun se tulee näkyviin. */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1500,
  className = '',
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current || reduced) return
    started.current = true
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setShown(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value, duration])

  const final = `${prefix}${fmt(value, decimals)}${suffix}`
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {fmt(shown, decimals)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  )
}

type Tone = 'light' | 'muted' | 'dark'

export function Section({
  id,
  tone = 'light',
  labelledBy,
  className = '',
  children,
}: {
  id?: string
  tone?: Tone
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  const tones: Record<Tone, string> = {
    light: 'bg-white text-ink-900',
    muted: 'bg-mist-50 text-ink-900',
    dark: 'bg-ink-900 text-white',
  }
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-16 py-20 sm:py-28 lg:py-32 ${tones[tone]} ${className}`}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] ${
        dark ? 'text-accent-300' : 'text-accent-600'
      }`}
    >
      <span className="h-px w-7 bg-current opacity-60" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
  className = '',
  children,
}: {
  id: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={`mt-5 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem] lg:text-[2.9rem] ${
          dark ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <div className={`mt-6 space-y-4 text-[1.0625rem] leading-relaxed sm:text-lg ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {intro}
        </div>
      )}
      {children}
    </Reveal>
  )
}

/** Pieni merkintä kuvitteelliselle datalle. */
export function DemoBadge({ dark = false, children = 'Kuvitteellinen esimerkkidata' }: { dark?: boolean; children?: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${
        dark ? 'bg-white/[0.07] text-slate-300 ring-1 ring-white/10' : 'bg-mist-100 text-slate-600 ring-1 ring-mist-200'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" />
      {children}
    </span>
  )
}

/** Vaakapalkki (esim. tekijän painoarvo). */
export function Bar({ value, max = 100, tone = 'accent', delay = 0 }: { value: number; max?: number; tone?: 'accent' | 'ink' | 'soft' | 'white'; delay?: number }) {
  const colors = {
    accent: 'bg-accent-500',
    ink: 'bg-ink-900',
    soft: 'bg-slate-300',
    white: 'bg-white',
  }
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-current/10" aria-hidden="true">
      <span
        className={`bar-grow block h-full rounded-full ${colors[tone]}`}
        style={{ width: `${(value / max) * 100}%`, animationDelay: `${delay}ms` }}
      />
    </span>
  )
}

export function Logo({ href = '#etusivu' }: { href?: string }) {
  return (
    <a href={href} className="group flex items-center gap-3 rounded-md" aria-label="AI Analytics – etusivulle">
      <LogoMark />
      <span className="leading-none">
        <span className="block whitespace-nowrap text-[0.95rem] font-semibold tracking-[0.2em] text-white">AI ANALYTICS</span>
        <span className="mt-1 block text-[0.7rem] tracking-wide text-slate-400">aianalytics.fi</span>
      </span>
    </a>
  )
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <rect width="32" height="32" rx="8" fill="var(--color-accent-500)" />
      <rect x="8" y="17.5" width="3.6" height="6.5" rx="1.4" fill="#fff" fillOpacity=".5" />
      <rect x="14.2" y="13" width="3.6" height="11" rx="1.4" fill="#fff" fillOpacity=".78" />
      <rect x="20.4" y="8" width="3.6" height="16" rx="1.4" fill="#fff" />
    </svg>
  )
}
