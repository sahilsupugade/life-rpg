import { STATUS, XP_PER_COMPLETE } from '../constants/defaults'

/**
 * Calculate total XP from current task statuses.
 * Only GREEN tasks contribute XP. This prevents farming exploits.
 */
export function calcXPFromStatuses(statuses) {
  let xp = 0
  for (const status of Object.values(statuses)) {
    if (status === STATUS.COMPLETED) xp += XP_PER_COMPLETE
  }
  return xp
}

export function calcLevel(xp) {
  return Math.floor(xp / 100)
}

export function calcXPInCurrentLevel(xp) {
  return xp % 100
}
