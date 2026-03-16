import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Settings } from 'lucide-react'
import { useXPStore } from '../store/xpStore'
import { calcXPProgress } from '../utils/xpCalculator'

export default function CharacterHeader({ onOpenSettings }) {
  const totalXP = useXPStore(s => s.totalXP)
  const { level, xpCurrentLevel, xpNextLevel, progress } = calcXPProgress(totalXP)

  const xpInLevel = Math.floor(totalXP - xpCurrentLevel)
  const xpNeeded = Math.floor(xpNextLevel - xpCurrentLevel)

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a14]/90 backdrop-blur-md border-b border-violet-900/40">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          {/* Title */}
          <div>
            <h1 className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-violet-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
              LIFE RPG
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Effort Quantification Engine</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Settings button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>

            {/* Level badge */}
            <motion.div
              key={level}
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-violet-500 bg-violet-950/60 shadow-[0_0_16px_rgba(139,92,246,0.5)]"
            >
              <span className="text-xs text-violet-300 font-semibold leading-none">LVL</span>
              <span className="text-2xl font-black text-white leading-none">{level}</span>
            </motion.div>
          </div>
        </div>

        {/* XP bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Zap size={11} className="text-yellow-400" />
              <span>{xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP</span>
            </span>
            <span className="text-slate-500">{totalXP.toLocaleString()} total</span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${(progress * 100).toFixed(1)}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
