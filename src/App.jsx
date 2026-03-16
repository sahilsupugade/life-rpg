import React, { useState, useCallback } from 'react'
import CharacterHeader from './components/CharacterHeader'
import StatsGrid from './components/StatsGrid'
import AnalyticsPanel from './components/AnalyticsPanel'
import LogEffortModal from './components/LogEffortModal'
import RewardOverlay from './components/RewardOverlay'
import XPFloaters from './components/XPFloaters'

export default function App() {
  const [floaters, setFloaters] = useState([])
  const [levelUp, setLevelUp] = useState({ show: false, level: 1 })

  const handleLogged = useCallback(({ xpEarned, prevLevel, newLevel }) => {
    // Floating XP notification
    const id = `${Date.now()}-${Math.random()}`
    setFloaters(prev => [...prev, { id, xp: xpEarned }])
    setTimeout(() => setFloaters(prev => prev.filter(f => f.id !== id)), 1400)

    // Level-up overlay
    if (newLevel > prevLevel) {
      setLevelUp({ show: true, level: newLevel })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#08080f] text-white pb-24">
      <CharacterHeader />

      <main className="max-w-lg mx-auto px-4 mt-6 space-y-8">
        <StatsGrid />
        <AnalyticsPanel />
      </main>

      <LogEffortModal onLogged={handleLogged} />

      <XPFloaters items={floaters} />

      <RewardOverlay
        show={levelUp.show}
        level={levelUp.level}
        onClose={() => setLevelUp(s => ({ ...s, show: false }))}
      />
    </div>
  )
}

