'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { chessConfig } from '@/lib/data'
import { fadeUp, viewportOnce } from '@/lib/motion'

type ChessStats = {
  total: number
  wins: number
  losses: number
  draws: number
  winRate: number
  currentRating: number
  bestRating: number
  username: string
}

type ApiResponse = {
  heatmap: Record<string, number>
  stats: ChessStats
  years: number[]
}

function getCellColor(count: number, isInactive: boolean): string {
  if (isInactive) return 'opacity-0 pointer-events-none'
  if (count === 0) return 'bg-ghost/40'
  if (count <= 2) return 'bg-amber-200'
  if (count <= 4) return 'bg-amber-400'
  return 'bg-amber-600'
}

export default function ChessHeatmap() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  useEffect(() => {
    fetch('/api/chess')
      .then((res) => res.json())
      .then((json: ApiResponse) => {
        setData(json)
        if (json.years?.length > 0) {
          setSelectedYear(json.years[0])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const { cells, months } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Awal kalender: Hari Minggu pertama pada/sebelum 1 Jan tahun terpilih
    const start = new Date(selectedYear, 0, 1)
    start.setDate(start.getDate() - start.getDay())

    // Akhir kalender: Hari Sabtu terakhir pada/setelah 31 Des tahun terpilih
    const end = new Date(selectedYear, 11, 31)
    end.setDate(end.getDate() + (6 - end.getDay()))

    const totalDays = Math.round((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1
    const cellsArr: { dateStr: string; count: number; isInactive: boolean }[] = []
    const monthsArr: { label: string; col: number }[] = []
    let lastMonth = -1

    const curr = new Date(start)
    for (let i = 0; i < totalDays; i++) {
      const col = Math.floor(i / 7)
      const row = i % 7
      const cellYear = curr.getFullYear()

      if (row === 0 && cellYear === selectedYear) {
        const m = curr.getMonth()
        if (m !== lastMonth) {
          monthsArr.push({
            label: curr.toLocaleDateString('en-US', { month: 'short' }),
            col,
          })
          lastMonth = m
        }
      }

      const y = curr.getFullYear()
      const m = String(curr.getMonth() + 1).padStart(2, '0')
      const d = String(curr.getDate()).padStart(2, '0')
      const dateStr = `${y}-${m}-${d}`

      const isOutOfYear = cellYear !== selectedYear
      const isFuture = curr > today
      const isInactive = isOutOfYear || isFuture
      const count = isInactive ? 0 : (data?.heatmap?.[dateStr] || 0)

      cellsArr.push({ dateStr, count, isInactive })
      curr.setDate(curr.getDate() + 1)
    }

    return { cells: cellsArr, months: monthsArr, totalCols: Math.ceil(totalDays / 7) }
  }, [data, selectedYear])

  const statItems = [
    { label: chessConfig.statsLabels.totalGames, value: data?.stats?.total ?? '—' },
    { label: chessConfig.statsLabels.winRate, value: data?.stats?.winRate ? `${data.stats.winRate}%` : '—' },
    { label: chessConfig.statsLabels.currentRating, value: data?.stats?.currentRating || '—' },
    { label: chessConfig.statsLabels.bestRating, value: data?.stats?.bestRating || '—' },
  ]

  return (
    <motion.div
      className="border border-ghost bg-paper/50 p-6 md:p-8"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={t({ duration: 0.8 })}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ghost pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">
            {chessConfig.sectionTitle}
          </span>
          <span className="text-[10px] text-ink/30">/</span>
          <a
            href={chessConfig.chessComUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-ink/60 underline underline-offset-2 transition-colors hover:text-red"
          >
            {chessConfig.subtitle}
          </a>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-ink/50">
          <span>{chessConfig.intensityLabels.less}</span>
          <span className="h-2.5 w-2.5 rounded-[1px] bg-ghost/40" />
          <span className="h-2.5 w-2.5 rounded-[1px] bg-amber-200" />
          <span className="h-2.5 w-2.5 rounded-[1px] bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-[1px] bg-amber-600" />
          <span>{chessConfig.intensityLabels.more}</span>
        </div>
      </div>

      {/* 4 Stats Grid (All-Time) */}
      <div className="my-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statItems.map((st) => (
          <div key={st.label}>
            <div className="font-serif text-[32px] font-black leading-none tracking-[-0.03em] text-ink">
              {loading ? '…' : st.value}
            </div>
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.15em] opacity-50">
              {st.label}
            </div>
          </div>
        ))}
      </div>

      {/* Year Selector Tabs */}
      {data?.years && data.years.length > 0 && (
        <div className="mb-3 flex items-center gap-3 border-b border-ghost/40 pb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40">Year:</span>
          <div className="flex items-center gap-2">
            {data.years.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`text-[11px] font-mono tracking-wider transition-colors pb-0.5 ${
                  selectedYear === yr
                    ? 'border-b-2 border-red font-bold text-red'
                    : 'text-ink/40 hover:text-ink/80'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Heatmap Grid with Horizontal Scroll */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[650px]">
          {/* Month labels */}
          <div className="relative mb-2 h-3.5 text-[9px] uppercase tracking-wider text-ink/40">
            {months.map((m) => (
              <span
                key={`${m.label}-${m.col}`}
                className="absolute transform"
                style={{ left: `${(m.col / 53) * 100}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* 7 rows CSS grid */}
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {cells.map((cell) => (
              <div
                key={cell.dateStr}
                title={cell.isInactive ? '' : `${cell.dateStr}: ${cell.count} games`}
                className={`h-[10px] w-[10px] rounded-[1px] transition-colors duration-150 ${getCellColor(
                  cell.count,
                  cell.isInactive
                )} ${loading ? 'animate-pulse' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}