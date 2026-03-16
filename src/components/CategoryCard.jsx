import React from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { calcXPProgress } from '../utils/xpCalculator'

export default function CategoryCard({ category, index }) {
  const { level, progress } = calcXPProgress(category.currentXP)
  const pct = (progress * 100).toFixed(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="relative rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 overflow-hidden"
      style={{ boxShadow: `0 0 18px ${category.color}22` }}
    >
      {/* Color accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }}
      />

      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-bold text-white">{category.name}</span>
        <span
          className="text-xs font-black px-2 py-0.5 rounded-full"
          style={{ background: `${category.color}28`, color: category.color }}
        >
          Lv.{level}
        </span>
      </div>

      {/* XP bar */}
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: category.color, boxShadow: `0 0 6px ${category.color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center gap-1 text-xs text-slate-400">
        <Zap size={10} style={{ color: category.color }} />
        <span>{Math.floor(category.currentXP).toLocaleString()} XP</span>
      </div>
    </motion.div>
  )
}
