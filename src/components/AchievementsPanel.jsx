import React from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useXPStore } from '../store/xpStore'
import { ACHIEVEMENTS } from '../constants/achievements'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1 },
}

export default function AchievementsPanel() {
  const state = useXPStore()

  const results = ACHIEVEMENTS.map(a => ({
    ...a,
    unlocked: a.check(state),
  }))

  const unlockedCount = results.filter(r => r.unlocked).length

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Achievements
        </h2>
        <span className="text-xs text-violet-400 font-bold">
          {unlockedCount}/{results.length} Unlocked
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-3"
      >
        {results.map(a => (
          <motion.div
            key={a.id}
            variants={item}
            className={`relative flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
              a.unlocked
                ? 'border-violet-500/60 bg-violet-950/50 shadow-[0_0_16px_rgba(139,92,246,0.35)]'
                : 'border-slate-700/40 bg-slate-900/40 opacity-50'
            }`}
          >
            {a.unlocked ? (
              <span className="text-2xl mb-1">{a.icon}</span>
            ) : (
              <Lock size={20} className="text-slate-600 mb-1" />
            )}
            <p className={`text-xs font-bold leading-tight ${a.unlocked ? 'text-white' : 'text-slate-500'}`}>
              {a.title}
            </p>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              {a.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
