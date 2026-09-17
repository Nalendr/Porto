'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ClockState {
  karawang: string
  london: string
  londonTz: string
  visitor: string
  visitorLabel: string
}

function getCountryNameFromCode(code: string): string {
  if (!code) return ''
  const upper = code.toUpperCase()
  if (upper === 'US') return 'USA'
  if (upper === 'GB' || upper === 'UK') return 'UK'
  if (upper === 'AE') return 'UAE'
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return displayNames.of(upper) || upper
  } catch {
    return upper
  }
}

function getCountryFromTimezone(tz: string): string {
  if (
    tz.startsWith('Asia/Jakarta') ||
    tz.startsWith('Asia/Pontianak') ||
    tz.startsWith('Asia/Makassar') ||
    tz.startsWith('Asia/Jayapura')
  ) {
    return 'Indonesia'
  }
  if (
    tz.startsWith('America/New_York') ||
    tz.startsWith('America/Chicago') ||
    tz.startsWith('America/Denver') ||
    tz.startsWith('America/Los_Angeles') ||
    tz.startsWith('America/Anchorage') ||
    tz.startsWith('America/Phoenix') ||
    tz.startsWith('America/Detroit') ||
    tz.startsWith('America/Indiana') ||
    tz.startsWith('America/Boise') ||
    tz.startsWith('Pacific/Honolulu')
  ) {
    return 'USA'
  }
  if (tz === 'Europe/Amsterdam') return 'Netherlands'
  if (tz === 'Europe/London') return 'UK'
  if (tz === 'Asia/Tokyo') return 'Japan'
  if (tz === 'Asia/Singapore') return 'Singapore'
  if (tz.startsWith('Australia/')) return 'Australia'
  if (tz.startsWith('Europe/Berlin')) return 'Germany'
  if (tz.startsWith('Europe/Paris')) return 'France'
  if (tz.startsWith('Europe/Rome')) return 'Italy'
  if (tz.startsWith('Europe/Madrid')) return 'Spain'
  if (tz.startsWith('Asia/Seoul')) return 'South Korea'
  if (
    tz.startsWith('America/Toronto') ||
    tz.startsWith('America/Vancouver') ||
    tz.startsWith('America/Montreal')
  ) {
    return 'Canada'
  }
  if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'India'
  if (tz.startsWith('Asia/Bangkok')) return 'Thailand'
  if (tz.startsWith('Asia/Kuala_Lumpur')) return 'Malaysia'
  if (tz.startsWith('Europe/Moscow')) return 'Russia'
  if (tz.startsWith('America/Sao_Paulo')) return 'Brazil'
  if (tz.startsWith('Asia/Dubai')) return 'UAE'
  if (tz.startsWith('Europe/Zurich')) return 'Switzerland'
  if (tz.startsWith('Europe/Stockholm')) return 'Sweden'
  if (tz.startsWith('Europe/Oslo')) return 'Norway'
  if (tz.startsWith('Europe/Helsinki')) return 'Finland'
  if (tz.startsWith('Europe/Copenhagen')) return 'Denmark'
  if (tz.startsWith('Europe/Dublin')) return 'Ireland'

  const city = tz.split('/').pop()?.replace(/_/g, ' ')
  return city || 'Visitor'
}

export default function HeroJapaneseAccent() {
  const reduced = useReducedMotion()
  const [clocks, setClocks] = useState<ClockState>({
    karawang: '',
    london: '',
    londonTz: 'GMT',
    visitor: '',
    visitorLabel: 'Local',
  })

  const visitorCountryRef = useRef<string>('Visitor')

  useEffect(() => {
    let visitorTz: string
    try {
      visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    } catch {
      visitorTz = 'UTC'
    }

    // 1. Initial instant country estimation based on client timezone
    visitorCountryRef.current = getCountryFromTimezone(visitorTz)

    // 2. Asynchronous Geo-IP verification for accurate physical country
    fetch('https://api.country.is')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country) {
          const resolved = getCountryNameFromCode(data.country)
          if (resolved) {
            visitorCountryRef.current = resolved
          }
        }
      })
      .catch(() => {
        // Fallback to timezone estimation silently if offline or blocked
      })

    const formatTime = (date: Date, tz?: string) => {
      try {
        const dtf = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short',
        })
        const parts = dtf.formatToParts(date)
        const timeStr = parts
          .filter((p) => ['hour', 'minute', 'second'].includes(p.type))
          .map((p) => p.value)
          .join(':')
        let tzName = parts.find((p) => p.type === 'timeZoneName')?.value || ''

        // Convert standard generic GMT offsets for known friendly zones
        if (tz === 'Asia/Jakarta' && (tzName === 'WIB' || !tzName)) tzName = 'GMT+7'
        if (tz === 'Asia/Makassar' && tzName === 'GMT+8') tzName = 'WITA'
        if (tz === 'Asia/Jayapura' && tzName === 'GMT+9') tzName = 'WIT'
        if (tz === 'Europe/Amsterdam' && tzName === 'GMT+2') tzName = 'CEST'
        if (tz === 'Europe/Amsterdam' && tzName === 'GMT+1') tzName = 'CET'

        return { time: timeStr, tzName }
      } catch {
        return { time: date.toTimeString().slice(0, 8), tzName: '' }
      }
    }

    const updateClocks = () => {
      const now = new Date()
      const krw = formatTime(now, 'Asia/Jakarta')
      const ldn = formatTime(now, 'Europe/London')
      const vis = formatTime(now, visitorTz)

      const country = visitorCountryRef.current
      const visLabel = vis.tzName ? `${country} ${vis.tzName}` : country

      setClocks({
        karawang: krw.time,
        london: ldn.time,
        londonTz: ldn.tzName || 'GMT',
        visitor: vis.time,
        visitorLabel: visLabel,
      })
    }

    updateClocks()
    const timer = setInterval(updateClocks, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute top-20 right-4 sm:top-24 sm:right-8 md:top-28 md:right-8 lg:right-16 flex items-start gap-3 sm:gap-5 md:gap-7 z-10 pointer-events-auto select-none">
      {/* Background Watermark Kanji */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 sm:-right-4 md:-right-6 -top-4 sm:-top-8 md:-top-10 font-serif text-[24vw] sm:text-[18vw] md:text-[11vw] font-black leading-none text-ghost/25 md:text-ghost/35 select-none -z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        構
      </motion.span>

      {/* Main Tate-cho Column: Philosophy */}
      <motion.div
        className="flex flex-col items-center [writing-mode:vertical-rl]"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <span className="font-serif text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-bold tracking-[0.18em] sm:tracking-[0.22em] text-ink leading-tight uppercase">
          SYSTEM &amp; INTEGRATION
        </span>
        <span className="mt-2 sm:mt-3 font-sans text-[8px] sm:text-[9px] tracking-[0.16em] sm:tracking-[0.22em] text-ink/50 uppercase">
          PRECISE ARCHITECTURE · DATA-DRIVEN
        </span>
      </motion.div>

      {/* Vertical Hairline Divider */}
      <motion.div
        className="w-px h-36 sm:h-44 md:h-56 bg-ghost/80 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
      />

      {/* Secondary Tate-cho Column: Origin & Coordinates */}
      <motion.div
        className="flex flex-col items-center [writing-mode:vertical-rl]"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      >
        <span className="font-sans text-[8.5px] sm:text-[9.5px] md:text-[10px] font-semibold tracking-[0.18em] sm:tracking-[0.25em] text-ink/70 uppercase">
          KARAWANG · INDONESIA
        </span>
        <span className="mt-1.5 sm:mt-2 font-sans text-[7.5px] sm:text-[8.5px] md:text-[9px] tracking-[0.14em] sm:tracking-[0.2em] text-ink/40">
          6°20&apos;23.7&quot;S 107°18&apos;28.1&quot;E
        </span>
      </motion.div>

      {/* Metadata & Multi-Zone Live Clock Block */}
      <motion.div
        className="flex flex-col items-start gap-2.5 sm:gap-3 md:gap-3.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      >
        {/* 1. Karawang Live Clock (Base) */}
        <div className="flex flex-col border-l sm:border-l-2 border-red pl-2 sm:pl-2.5">
          <span className="text-[7px] sm:text-[7.5px] md:text-[8px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-ink/40 uppercase flex items-center gap-1 sm:gap-1.5">
            <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-red animate-pulse" />
            Karawang GMT+7
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] md:text-[12px] tracking-wider text-ink font-medium tabular-nums">
            {clocks.karawang || '12:00:00'}
          </span>
        </div>

        {/* 2. London Live Clock (Global) */}
        <div className="flex flex-col border-l border-ink/20 pl-2 sm:pl-2.5">
          <span className="text-[7px] sm:text-[7.5px] md:text-[8px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-ink/40 uppercase">
            London {clocks.londonTz}
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] md:text-[12px] tracking-wider text-ink/70 font-medium tabular-nums">
            {clocks.london || '12:00:00'}
          </span>
        </div>

        {/* 3. Visitor Dynamic Country Clock */}
        <div className="flex flex-col border-l border-ink/20 pl-2 sm:pl-2.5">
          <span className="text-[7px] sm:text-[7.5px] md:text-[8px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-ink/40 uppercase max-w-[110px] sm:max-w-[160px] truncate">
            {clocks.visitorLabel}
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] md:text-[12px] tracking-wider text-ink/70 font-medium tabular-nums">
            {clocks.visitor || '12:00:00'}
          </span>
        </div>

        {/* Issue Stamp */}
        <div className="flex flex-col border-l border-ink/20 pl-2 sm:pl-2.5 pt-0.5">
          <span className="text-[7px] sm:text-[7.5px] md:text-[8px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-ink/40 uppercase">
            Issue
          </span>
          <span className="font-sans text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.15em] text-ink/70">
            VOL. 26 / 01
          </span>
        </div>

        {/* Hanko (朱肉印 / Vermillion Seal) */}
        <motion.div
          className="mt-0.5 flex flex-col items-center justify-center border border-red/80 bg-red/[0.04] px-1 py-1.5 sm:px-1.5 sm:py-2 shadow-[0_0_0_1px_rgba(193,52,26,0.15)] [writing-mode:vertical-rl]"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
        >
          <span className="font-serif text-[9px] sm:text-[10px] md:text-[11px] font-extrabold tracking-[0.2em] text-red leading-none">
            蓮印
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
