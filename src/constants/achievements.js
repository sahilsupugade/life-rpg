import { calcLevel } from '../utils/xpCalculator'

/** Compute current streak from effort logs (used for achievement checks). */
function getStreakFromLogs(effortLogs) {
  if (effortLogs.length === 0) return 0

  const daySet = new Set(effortLogs.map(l => l.createdAt.slice(0, 10)))
  const sortedDays = [...daySet].sort()

  let bestStreak = 1
  let run = 1
  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1] + 'T00:00:00')
    const curr = new Date(sortedDays[i] + 'T00:00:00')
    if (curr - prev === 86400000) {
      run++
      if (run > bestStreak) bestStreak = run
    } else {
      run = 1
    }
  }
  return bestStreak
}

export const ACHIEVEMENTS = [
  {
    id: 'first-log',
    title: 'First Step',
    description: 'Log your first effort',
    icon: '👣',
    check: (state) => state.effortLogs.length >= 1,
  },
  {
    id: 'ten-logs',
    title: 'Getting Started',
    description: 'Log 10 efforts',
    icon: '📝',
    check: (state) => state.effortLogs.length >= 10,
  },
  {
    id: 'fifty-logs',
    title: 'Dedicated',
    description: 'Log 50 efforts',
    icon: '💪',
    check: (state) => state.effortLogs.length >= 50,
  },
  {
    id: 'hundred-logs',
    title: 'Centurion',
    description: 'Log 100 efforts',
    icon: '🏛️',
    check: (state) => state.effortLogs.length >= 100,
  },
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    check: (state) => calcLevel(state.totalXP) >= 5,
  },
  {
    id: 'level-10',
    title: 'Veteran',
    description: 'Reach level 10',
    icon: '🎖️',
    check: (state) => calcLevel(state.totalXP) >= 10,
  },
  {
    id: 'level-20',
    title: 'Legend',
    description: 'Reach level 20',
    icon: '👑',
    check: (state) => calcLevel(state.totalXP) >= 20,
  },
  {
    id: 'streak-3',
    title: 'On Fire',
    description: 'Achieve a 3-day streak',
    icon: '🔥',
    check: (state) => getStreakFromLogs(state.effortLogs) >= 3,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Achieve a 7-day streak',
    icon: '⚔️',
    check: (state) => getStreakFromLogs(state.effortLogs) >= 7,
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: 'Achieve a 30-day streak',
    icon: '🏆',
    check: (state) => getStreakFromLogs(state.effortLogs) >= 30,
  },
  {
    id: 'all-categories',
    title: 'Well Rounded',
    description: 'Have XP in all categories',
    icon: '🌈',
    check: (state) => state.categories.length > 0 && state.categories.every(c => c.currentXP > 0),
  },
  {
    id: 'thousand-xp',
    title: 'XP Hoarder',
    description: 'Earn 1,000 total XP',
    icon: '💰',
    check: (state) => state.totalXP >= 1000,
  },
]
