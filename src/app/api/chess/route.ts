import { NextResponse } from 'next/server'

export const revalidate = 3600 // refresh every hour

const USERNAME = 'fauzysn'
const HEADERS = { 'User-Agent': 'portfolio-chess-widget/1.0' }

interface ChessGame {
  end_time: number
  white: { username: string; result: string }
  black: { username: string; result: string }
  time_class: string
}

interface MonthGames {
  games: ChessGame[]
}

function dateKey(ts: number) {
  const d = new Date(ts * 1000)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export async function GET() {
  try {
    // 1. Fetch player stats
    const statsRes = await fetch(
      `https://api.chess.com/pub/player/${USERNAME}/stats`,
      { headers: HEADERS, next: { revalidate: 3600 } }
    )
    const statsData = await statsRes.json()

    // 2. Fetch game archives list
    const archivesRes = await fetch(
      `https://api.chess.com/pub/player/${USERNAME}/games/archives`,
      { headers: HEADERS, next: { revalidate: 3600 } }
    )
    const archivesData = await archivesRes.json()
    const allArchives: string[] = archivesData.archives || []

    // 3. Fetch all archives in parallel (all-time)
    const heatmap: Record<string, number> = {}
    let totalWins = 0
    let totalLosses = 0
    let totalDraws = 0
    const yearsSet = new Set<number>()

    const results = await Promise.allSettled(
      allArchives.map((url) =>
        fetch(url, { headers: HEADERS, next: { revalidate: 3600 } }).then((r) => r.json())
      )
    )

    results.forEach((result) => {
      if (result.status !== 'fulfilled') return
      const data: MonthGames = result.value
      if (!data.games) return

      data.games.forEach((game: ChessGame) => {
        const key = dateKey(game.end_time)
        heatmap[key] = (heatmap[key] || 0) + 1

        const year = new Date(game.end_time * 1000).getFullYear()
        yearsSet.add(year)

        const isWhite = game.white.username.toLowerCase() === USERNAME
        const myResult = isWhite ? game.white.result : game.black.result

        if (myResult === 'win') totalWins++
        else if (['resigned', 'timeout', 'checkmated', 'abandoned', 'lose'].includes(myResult)) totalLosses++
        else totalDraws++
      })
    })

    const totalGames = totalWins + totalLosses + totalDraws
    const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0
    const years = Array.from(yearsSet).sort((a, b) => b - a)

    // Extract stats
    const rapid = statsData.chess_rapid || {}
    const blitz = statsData.chess_blitz || {}
    const bullet = statsData.chess_bullet || {}

    const currentRating =
      rapid?.last?.rating || blitz?.last?.rating || bullet?.last?.rating || 0
    const bestRating =
      Math.max(
        rapid?.best?.rating || 0,
        blitz?.best?.rating || 0,
        bullet?.best?.rating || 0
      )

    return NextResponse.json({
      heatmap,
      stats: {
        total: totalGames,
        wins: totalWins,
        losses: totalLosses,
        draws: totalDraws,
        winRate,
        currentRating,
        bestRating,
        username: USERNAME,
      },
      years,
    })
  } catch (err) {
    console.error('Chess API error:', err)
    return NextResponse.json(
      {
        heatmap: {},
        stats: { total: 0, wins: 0, losses: 0, draws: 0, winRate: 0, currentRating: 0, bestRating: 0, username: USERNAME },
        years: [],
      },
      { status: 200 }
    )
  }
}