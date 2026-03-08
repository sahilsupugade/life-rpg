import React from 'react'
import { motion } from 'framer-motion'
import { calcXPInCurrentLevel } from '../utils/xpCalculator'

export default function Header({ totalXP, level }) {
  const xpInLevel = calcXPInCurrentLevel(totalXP)
  const progressPct = xpInLevel

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-[#0f0f1a]/90 backdrop-blur border-b border-purple-900/50 px-4 py-3"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ⚔️ Life RPG
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Gamified Habit Tracker</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-xs text-gray-400">LVL</span>
            <span className="text-2xl font-black text-yellow-400">{level}</span>
          </div>
          <p className="text-xs text-purple-300">{totalXP} XP total</p>
          {/* Level progress bar */}
          <div className="mt-1 w-28 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">{xpInLevel}/100 XP to next level</p>
        </div>
      </div>
    </motion.header>
  )
}
