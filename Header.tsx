import { useEffect, useState } from 'react'
import { NAV } from './config'
import { Close, Menu } from './icons'
import { Logo } from './ui'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('#etusivu')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Korostaa navigaatiossa osion, joka on parhaillaan näkyvissä
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const targets = NAV.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? 'border-white/10 bg-ink-950/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#sisalto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Siirry sisältöön
      </a>
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav aria-label="Päävalikko" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? 'location' : undefined}
                  className={`whitespace-nowrap rounded-md px-2 py-2 text-[0.8rem] transition-colors 2xl:px-2.5 2xl:text-[0.84rem] ${
                    active === item.href ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#yhteys" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Keskustele AI-analytiikasta
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-controls="mobiilivalikko"
            aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobiilivalikko" aria-label="Mobiilivalikko" className="border-t border-white/10 bg-ink-950 xl:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[1.0625rem] text-slate-200 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a href="#yhteys" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Keskustele AI-analytiikasta
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
