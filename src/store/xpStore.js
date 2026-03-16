import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calcXP, calcLevel } from '../utils/xpCalculator'
import { DEFAULT_CATEGORIES, DEFAULT_TASKS } from '../constants/defaults'

const seedCategories = DEFAULT_CATEGORIES.map(c => ({
  ...c,
  currentXP: 0,
  level: 1,
}))

export const useXPStore = create(
  persist(
    (set, get) => ({
      categories: seedCategories,
      tasks: DEFAULT_TASKS,
      effortLogs: [],
      totalXP: 0,

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

        const id = typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`

        const log = {
          id,
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

      /** Wipe all progress (dev/reset). */
      resetAll() {
        set({ categories: seedCategories, tasks: DEFAULT_TASKS, effortLogs: [], totalXP: 0 })
      },
    }),
    { name: 'life-rpg-store' }
  )
)
