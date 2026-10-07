// Kevyet viivaikonit (24 × 24). Ei ulkoista ikonikirjastoa.
import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function make(children: ReactNode) {
  return function Icon({ size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...rest}
      >
        {children}
      </svg>
    )
  }
}

export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6" />)
export const ArrowDown = make(<path d="M12 5v14M6 13l6 6 6-6" />)
export const ArrowUpRight = make(<path d="M7 17 17 7M8 7h9v9" />)
export const Menu = make(<path d="M4 7h16M4 12h16M4 17h16" />)
export const Close = make(<path d="M6 6l12 12M18 6 6 18" />)
export const Check = make(<path d="m5 12.5 4.5 4.5L19 7.5" />)
export const ChevronDown = make(<path d="m6 9 6 6 6-6" />)
export const XCircle = make(<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>)
export const CheckCircle = make(<><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></>)
export const TrendingUp = make(<path d="M3 17l6-6 4 4 8-8M15 7h6v6" />)
export const Megaphone = make(<><path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1Z" /><path d="M17 8.5a5 5 0 0 1 0 7" /><path d="M8 15l1 5" /></>)
export const Users = make(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.4A6.5 6.5 0 0 1 21.5 20" /></>)
export const Wallet = make(<><path d="M4 7.5V18a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-3" /><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17v2.5" /><path d="M4 7.5h15a1 1 0 0 1 1 1V12h-4a2 2 0 0 0 0 4h4" /></>)
export const Factory = make(<><path d="M3 20V10l5 3V10l5 3V10l5 3V4h3v16Z" /><path d="M7 17h2M12 17h2M17 17h1" /></>)
export const Truck = make(<><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>)
export const CalendarClock = make(<><path d="M20 11V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6" /><path d="M8 3v4M16 3v4M4 10h16" /><circle cx="17.5" cy="17.5" r="3.5" /><path d="M17.5 16v1.6l1 .9" /></>)
export const Cart = make(<><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 8H6" /><circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></>)
export const Target = make(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>)
export const Radar = make(<><path d="M12 12 19 5" /><path d="M20.5 9.5A9 9 0 1 1 14.5 3.4" /><path d="M16.6 10.5A5 5 0 1 1 13.5 7.2" /></>)
export const Gauge = make(<><path d="M4 18a9 9 0 1 1 16 0" /><path d="m12 14 4-5" /><circle cx="12" cy="14" r="1.2" /></>)
export const Coins = make(<><ellipse cx="9" cy="7" rx="6" ry="2.5" /><path d="M3 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7" /><path d="M9 16.5c-3.3 0-6-1.1-6-2.5v-3M15 11.6c3.2.1 6 1.1 6 2.4v4c0 1.4-2.7 2.5-6 2.5-2 0-3.8-.4-4.9-1" /></>)
export const Eye = make(<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>)
export const Award = make(<><circle cx="12" cy="9" r="5.5" /><path d="m8.5 13.3-1.5 7.2 5-2.5 5 2.5-1.5-7.2" /></>)
export const Lock = make(<><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>)
export const Shield = make(<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6Z" />)
export const ShieldCheck = make(<><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>)
export const Key = make(<><circle cx="8" cy="15" r="4" /><path d="m10.8 12.2 8.7-8.7M16 7l2.5 2.5M18.5 4.5l2 2" /></>)
export const Funnel = make(<path d="M3.5 5h17l-6.5 8v6l-4-2v-4Z" />)
export const FileSearch = make(<><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h5" /><path d="M14 3v5h5M14 3l5 5v3" /><circle cx="16.5" cy="16.5" r="3" /><path d="m18.7 18.7 2.3 2.3" /></>)
export const Activity = make(<path d="M3 12h4l3-8 4 16 3-8h4" />)
export const UserCheck = make(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 11-4.7" /><path d="m15.5 17.5 2 2 4-4.5" /></>)
export const Scale = make(<><path d="M12 3v18M7 21h10M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0Zm14 0-2.5 6a3 3 0 0 0 5 0Z" /></>)
export const Database = make(<><ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" /><path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" /><path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" /></>)
export const Layers = make(<><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5" /></>)
export const Network = make(<><circle cx="12" cy="5" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><circle cx="12" cy="13" r="2" /><path d="M12 7v4M10.4 14.2 6.6 16.8M13.6 14.2l3.8 2.6" /></>)
export const LineChart = make(<><path d="M3 3v18h18" /><path d="m7 15 4-5 3 3 5-7" /></>)
export const Lightbulb = make(<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3Z" /></>)
export const Alert = make(<><path d="M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" /><path d="M12 9.5v4M12 17h.01" /></>)
export const Wrench = make(<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8a2.8 2.8 0 0 1-4-4l8-8ZM14.7 6.3 13 4.6a4 4 0 0 0-5.4 5.4l1.7 1.7" />)
export const Message = make(<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />)
export const Search = make(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.3-4.3" /></>)
export const Info = make(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.5h.01" /></>)
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>)
export const Table = make(<><rect x="3.5" y="4" width="17" height="16" rx="1.5" /><path d="M3.5 9.5h17M3.5 15h17M9.5 4v16" /></>)
export const Globe = make(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" /></>)
export const Headset = make(<><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v5H5a1 1 0 0 1-1-1ZM20 14h-3v5h2a1 1 0 0 0 1-1Z" /><path d="M20 18c0 2-2 3-5 3h-2" /></>)
export const Cpu = make(<><rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" /></>)
export const Building = make(<><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M2.5 21h19" /><path d="M8 8h3M8 12h3M8 16h3" /></>)
export const Puzzle = make(<path d="M9 4.5a2 2 0 0 1 4 0V6h4a1 1 0 0 1 1 1v4h-1.5a2 2 0 0 0 0 4H18v4a1 1 0 0 1-1 1h-4v-1.5a2 2 0 0 0-4 0V20H5a1 1 0 0 1-1-1v-4h1.5a2 2 0 0 0 0-4H4V7a1 1 0 0 1 1-1h4Z" />)
export const Sigma = make(<path d="M18 7V4H6l6 8-6 8h12v-3" />)
