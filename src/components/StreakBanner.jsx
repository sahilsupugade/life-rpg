import React from 'react'
import { motion } from 'framer-motion'
import { useXPStore } from '../store/xpStore'

export default function StreakBanner() {
  const getStreaks = useXPStore(s => s.getStreaks)
  const { currentStreak, bestStreak } = getStreaks()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 flex items-center justify-around"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <div>
          <p className="text-xs text-slate-400 leading-none">Current Streak</p>
          <p className="text-lg font-black text-white leading-tight">
            {currentStreak} <span className="text-xs font-normal text-slate-500">days</span>
          </p>
        </div>
      </div>

      <div className="w-px h-8 bg-slate-700/60" />

      <div className="flex items-center gap-2">
        <span className="text-xl">⭐</span>
        <div>
          <p className="text-xs text-slate-400 leading-none">Best Streak</p>
          <p className="text-lg font-black text-white leading-tight">
            {bestStreak} <span className="text-xs font-normal text-slate-500">days</span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
