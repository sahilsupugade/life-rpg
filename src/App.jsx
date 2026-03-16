import React, { useState, useCallback } from 'react'
import CharacterHeader from './components/CharacterHeader'
import StreakBanner from './components/StreakBanner'
import StatsGrid from './components/StatsGrid'
import AnalyticsPanel from './components/AnalyticsPanel'
import AchievementsPanel from './components/AchievementsPanel'
import LogEffortModal from './components/LogEffortModal'
import AddTaskModal from './components/AddTaskModal'
import SettingsPanel from './components/SettingsPanel'
import RewardOverlay from './components/RewardOverlay'
import XPFloaters from './components/XPFloaters'
import TaskList from './components/TaskList'
import { ListPlus } from 'lucide-react'

export default function App() {
  const [floaters, setFloaters] = useState([])
  const [levelUp, setLevelUp] = useState({ show: false, level: 1 })
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [addTaskOpen, setAddTaskOpen] = useState(false)

  const handleLogged = useCallback(({ xpEarned, prevLevel, newLevel }) => {
    const id = `${Date.now()}-${Math.random()}`
    setFloaters(prev => [...prev, { id, xp: xpEarned }])
    setTimeout(() => setFloaters(prev => prev.filter(f => f.id !== id)), 1400)

    if (newLevel > prevLevel) {
      setLevelUp({ show: true, level: newLevel })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#08080f] text-white pb-24">
      <CharacterHeader onOpenSettings={() => setSettingsOpen(true)} />

      <main className="max-w-lg mx-auto px-4 mt-6 space-y-8">
        <StreakBanner />
        <StatsGrid />

        {/* Add Task button */}
        <button
          onClick={() => setAddTaskOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 text-slate-400 hover:border-violet-500/60 hover:text-violet-300 transition-colors"
        >
          <ListPlus size={18} />
          <span className="text-sm font-semibold">Add Custom Task</span>
        </button>

        <TaskList />

        <AnalyticsPanel />
        <AchievementsPanel />
      </main>

      <LogEffortModal onLogged={handleLogged} />
      <AddTaskModal open={addTaskOpen} onClose={() => setAddTaskOpen(false)} />
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <XPFloaters items={floaters} />

      <RewardOverlay
        show={levelUp.show}
        level={levelUp.level}
        onClose={() => setLevelUp(s => ({ ...s, show: false }))}
      />
    </div>
  )
}

