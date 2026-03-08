import React, { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_TASKS, STATUS } from './constants/defaults'
import { calcLevel } from './utils/xpCalculator'
import { useXP } from './hooks/useXP'
import { getTodayKey } from './utils/dateUtils'
import Header from './components/Header'
import TaskList from './components/TaskList'
import XPGraph from './components/XPGraph'
import HistorySection from './components/HistorySection'
import AddTaskModal from './components/AddTaskModal'
import LevelUpAnimation from './components/LevelUpAnimation'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('rpg-tasks', DEFAULT_TASKS)
  const [history, setHistory] = useLocalStorage('rpg-history', {})
  const [showAddModal, setShowAddModal] = useState(false)
  const [levelUpTriggered, setLevelUpTriggered] = useState(false)
  const [xpPopups, setXpPopups] = useState([])

  const todayKey = getTodayKey()

  // Today's statuses (default all tasks to MISSED=0)
  const todayStatuses = history[todayKey] || {}
  const getTaskStatus = (taskId) => todayStatuses[taskId] ?? STATUS.MISSED

  // Calculate XP and level from all history using the shared hook
  const { totalXP } = useXP(history)
  const currentLevel = calcLevel(totalXP)
  const prevLevelRef = React.useRef(currentLevel)

  useEffect(() => {
    if (currentLevel > prevLevelRef.current) {
      setLevelUpTriggered(true)
      setTimeout(() => setLevelUpTriggered(false), 3000)
    }
    prevLevelRef.current = currentLevel
  }, [currentLevel])

  const cycleStatus = useCallback((taskId) => {
    const current = todayStatuses[taskId] ?? STATUS.MISSED
    const next = (current + 1) % 3

    // XP popup
    let xpDelta = 0
    if (next === STATUS.COMPLETED) xpDelta = +20
    if (current === STATUS.COMPLETED && next !== STATUS.COMPLETED) xpDelta = -20

    if (xpDelta !== 0) {
      const id = Date.now()
      setXpPopups(prev => [...prev, { id, delta: xpDelta }])
      setTimeout(() => setXpPopups(prev => prev.filter(p => p.id !== id)), 1500)
    }

    setHistory(prev => {
      const today = prev[todayKey] || {}
      return {
        ...prev,
        [todayKey]: {
          ...today,
          [taskId]: next,
        }
      }
    })
  }, [todayKey, todayStatuses, setHistory])

  const addTask = useCallback((name) => {
    const id = 'task-' + Date.now()
    setTasks(prev => [...prev, { id, name }])
    setShowAddModal(false)
  }, [setTasks])

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
    // Remove from all history days
    setHistory(prev => {
      const updated = { ...prev }
      for (const day of Object.keys(updated)) {
        const { [taskId]: _, ...rest } = updated[day]
        updated[day] = rest
      }
      return updated
    })
  }, [setTasks, setHistory])

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white pb-10">
      <Header totalXP={totalXP} level={currentLevel} />

      <main className="max-w-2xl mx-auto px-4 mt-6 space-y-8">
        {/* XP Popups */}
        <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
          <AnimatePresence>
            {xpPopups.map(popup => (
              <motion.div
                key={popup.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -40 }}
                exit={{ opacity: 0 }}
                className={`text-lg font-bold ${popup.delta > 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {popup.delta > 0 ? `+${popup.delta} XP` : `${popup.delta} XP`}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Level Up */}
        <AnimatePresence>
          {levelUpTriggered && <LevelUpAnimation level={currentLevel} />}
        </AnimatePresence>

        {/* Today's Quests */}
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-3 tracking-wide uppercase">
            ⚔️ Today's Quests
          </h2>
          <TaskList
            tasks={tasks}
            getStatus={getTaskStatus}
            onCycle={cycleStatus}
            onDelete={deleteTask}
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-purple-700 text-purple-400 hover:border-purple-400 hover:text-purple-200 transition-colors text-sm font-medium"
          >
            + Add New Quest
          </button>
        </section>

        {/* XP Graph */}
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-3 tracking-wide uppercase">
            📈 Monthly XP Progress
          </h2>
          <XPGraph history={history} tasks={tasks} />
        </section>

        {/* History */}
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-3 tracking-wide uppercase">
            📜 Past 7 Days
          </h2>
          <HistorySection history={history} tasks={tasks} />
        </section>
      </main>

      <AnimatePresence>
        {showAddModal && (
          <AddTaskModal
            onAdd={addTask}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
