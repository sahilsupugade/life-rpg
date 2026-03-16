import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calcXP, calcLevel } from '../utils/xpCalculator'
import { DEFAULT_CATEGORIES, DEFAULT_TASKS } from '../constants/defaults'

const seedCategories = DEFAULT_CATEGORIES.map(c => ({
  ...c,
  currentXP: 0,
  level: 1,
}))

function generateId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** Compute current and best streak from effort logs. */
function computeStreaks(effortLogs) {
  if (effortLogs.length === 0) return { currentStreak: 0, bestStreak: 0 }

  const daySet = new Set(effortLogs.map(l => l.createdAt.slice(0, 10)))
  const sortedDays = [...daySet].sort()

  // Calculate best streak
  let bestStreak = 1
  let run = 1
  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1] + 'T00:00:00')
    const curr = new Date(sortedDays[i] + 'T00:00:00')
    const diffMs = curr - prev
    if (diffMs === 86400000) {
      run++
      if (run > bestStreak) bestStreak = run
    } else {
      run = 1
    }
  }

  // Calculate current streak (must include today or yesterday)
  const today = new Date()
  const todayKey = today.toISOString().slice(0, 10)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayKey = yesterday.toISOString().slice(0, 10)

  const lastDay = sortedDays[sortedDays.length - 1]
  if (lastDay !== todayKey && lastDay !== yesterdayKey) {
    return { currentStreak: 0, bestStreak }
  }

  let currentStreak = 1
  for (let i = sortedDays.length - 2; i >= 0; i--) {
    const curr = new Date(sortedDays[i + 1] + 'T00:00:00')
    const prev = new Date(sortedDays[i] + 'T00:00:00')
    if (curr - prev === 86400000) {
      currentStreak++
    } else {
      break
    }
  }

  return { currentStreak, bestStreak }
}

export const useXPStore = create(
  persist(
    (set, get) => ({
      categories: seedCategories,
      tasks: DEFAULT_TASKS,
      effortLogs: [],
      totalXP: 0,

      /** Compute streaks from effort logs. */
      getStreaks() {
        return computeStreaks(get().effortLogs)
      },

      /**
       * Log effort for a task.
       * Returns { xpEarned, prevLevel, newLevel } for UI feedback.
       */
      addLog(taskId, quantity) {
        const state = get()
        const task = state.tasks.find(t => t.id === taskId)
        if (!task) return null
        const category = state.categories.find(c => c.id === task.categoryId)
        if (!category) return null

        const xpEarned = calcXP(quantity, task.difficultyMultiplier, category.weight)
        const prevLevel = calcLevel(state.totalXP)
        const newTotalXP = state.totalXP + xpEarned

        const newCategories = state.categories.map(c => {
          if (c.id === task.categoryId) {
            const newCatXP = c.currentXP + xpEarned
            return { ...c, currentXP: newCatXP, level: calcLevel(newCatXP) }
          }
          return c
        })

        const log = {
          id: generateId(),
          taskId,
          categoryId: task.categoryId,
          quantity,
          xpEarned,
          createdAt: new Date().toISOString(),
        }

        set({
          totalXP: newTotalXP,
          categories: newCategories,
          effortLogs: [log, ...state.effortLogs],
        })

        return { xpEarned, prevLevel, newLevel: calcLevel(newTotalXP) }
      },

      addTask(task) {
        const id = `task-${Date.now()}`
        set(state => ({ tasks: [...state.tasks, { ...task, id }] }))
      },

      addCategory(category) {
        const id = `cat-${Date.now()}`
        set(state => ({
          categories: [
            ...state.categories,
            { ...category, id, currentXP: 0, level: 1 },
          ],
        }))
      },

      /** Remove a task and all its effort logs, recalculate XP. */
      deleteTask(taskId) {
        const state = get()
        const logsToRemove = state.effortLogs.filter(l => l.taskId === taskId)
        const remainingLogs = state.effortLogs.filter(l => l.taskId !== taskId)
        const remainingTasks = state.tasks.filter(t => t.id !== taskId)

        // Recalculate category XP and totalXP from remaining logs
        const categoryXPMap = {}
        remainingLogs.forEach(log => {
          categoryXPMap[log.categoryId] = (categoryXPMap[log.categoryId] || 0) + log.xpEarned
        })

        const newTotalXP = remainingLogs.reduce((sum, l) => sum + l.xpEarned, 0)
        const newCategories = state.categories.map(c => {
          const newXP = categoryXPMap[c.id] || 0
          return { ...c, currentXP: newXP, level: calcLevel(newXP) }
        })

        set({
          tasks: remainingTasks,
          effortLogs: remainingLogs,
          categories: newCategories,
          totalXP: newTotalXP,
        })
      },

      /** Remove a single effort log and subtract its XP. */
      deleteLog(logId) {
        const state = get()
        const log = state.effortLogs.find(l => l.id === logId)
        if (!log) return

        const remainingLogs = state.effortLogs.filter(l => l.id !== logId)
        const newTotalXP = Math.max(0, state.totalXP - log.xpEarned)

        const newCategories = state.categories.map(c => {
          if (c.id === log.categoryId) {
            const newCatXP = Math.max(0, c.currentXP - log.xpEarned)
            return { ...c, currentXP: newCatXP, level: calcLevel(newCatXP) }
          }
          return c
        })

        set({
          effortLogs: remainingLogs,
          categories: newCategories,
          totalXP: newTotalXP,
        })
      },

      /** Wipe all progress (dev/reset). */
      resetAll() {
        set({ categories: seedCategories, tasks: DEFAULT_TASKS, effortLogs: [], totalXP: 0 })
      },
    }),
    { name: 'life-rpg-store' }
  )
)
