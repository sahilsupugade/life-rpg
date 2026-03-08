import { useMemo } from 'react'
import { STATUS } from '../constants/defaults'
import { calcLevel, calcXPInCurrentLevel } from '../utils/xpCalculator'

export function useXP(history) {
  const totalXP = useMemo(() => {
    let xp = 0
    for (const dayStatuses of Object.values(history)) {
      for (const status of Object.values(dayStatuses)) {
        if (status === STATUS.COMPLETED) xp += 20
      }
    }
    return Math.max(0, xp)
  }, [history])

  return {
    totalXP,
    level: calcLevel(totalXP),
    xpInLevel: calcXPInCurrentLevel(totalXP),
  }
}
