import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function RewardOverlay({ show, level, onClose }) {
  const fired = useRef(false)

  useEffect(() => {
    if (show && !fired.current) {
      fired.current = true
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#7c3aed', '#06b6d4', '#a855f7', '#f59e0b', '#22c55e'],
        disableForReducedMotion: true,
      })
    }
    if (!show) fired.current = false
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="reward-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={e => e.stopPropagation()}
            className="relative flex flex-col items-center gap-4 px-10 py-10 rounded-3xl
                       bg-gradient-to-br from-[#1a0a3a] to-[#0a1a2a]
                       border border-violet-500/50
                       shadow-[0_0_60px_rgba(139,92,246,0.5)]"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-violet-600/10 blur-xl" />

            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              className="text-6xl"
            >
              🏆
            </motion.div>

            <div className="text-center relative">
              <p className="text-xs font-semibold tracking-[0.3em] text-violet-400 uppercase mb-1">
                Level Up!
              </p>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-7xl font-black bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent"
              >
                {level}
              </motion.p>
            </div>

            <p className="text-sm text-slate-400 relative">Tap anywhere to continue</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
