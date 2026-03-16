/**
 * XP Calculation: XP = Eq × Dm × Cw
 * @param {number} quantity     - Effort Quantity (Eq), e.g. 60 minutes
 * @param {number} difficulty   - Difficulty Multiplier (Dm): Easy=1.0, Med=1.5, Hard=2.0
 * @param {number} weight       - Category Weight (Cw), default 1.0
 * @returns {number} XP earned (rounded to nearest integer)
 */
export function calcXP(quantity, difficulty, weight) {
  return Math.round(quantity * difficulty * weight)
}

/**
 * Polynomial leveling: Level = floor(0.1 × sqrt(XP)) + 1
 */
export function calcLevel(totalXP) {
  return Math.floor(0.1 * Math.sqrt(Math.max(0, totalXP))) + 1
}

/**
 * XP required to reach a specific level: XP = ((Level - 1) / 0.1)^2
 */
export function calcXPForLevel(level) {
  return Math.pow((level - 1) / 0.1, 2)
}

/**
 * Returns level, xp thresholds and 0–1 progress within the current level.
 */
export function calcXPProgress(totalXP) {
  const level = calcLevel(totalXP)
  const xpCurrentLevel = calcXPForLevel(level)
  const xpNextLevel = calcXPForLevel(level + 1)
  const range = xpNextLevel - xpCurrentLevel
  const progress = range > 0 ? (totalXP - xpCurrentLevel) / range : 0
  return { level, xpCurrentLevel, xpNextLevel, progress: Math.min(1, Math.max(0, progress)) }
}
