import React from 'react'
import { motion } from 'framer-motion'

export default function LevelUpAnimation({ level }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: 3, duration: 0.4 }}
        className="text-center bg-[#1a1a2e]/95 rounded-3xl border-2 border-yellow-400/60 px-10 py-8 shadow-2xl"
        style={{ boxShadow: '0 0 60px rgba(234, 179, 8, 0.4)' }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl mb-3"
        >
          🏆
        </motion.div>
        <p className="text-yellow-400 font-black text-3xl">LEVEL UP!</p>
        <p className="text-yellow-300 text-5xl font-black mt-1">{level}</p>
        <p className="text-gray-400 text-sm mt-2">Keep up the momentum!</p>
      </motion.div>
    </motion.div>
  )
}
