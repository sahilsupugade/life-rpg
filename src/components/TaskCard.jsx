import React from 'react'
import { motion } from 'framer-motion'
import { STATUS_COLORS } from '../constants/defaults'

const STATUS_BG = {
  0: 'bg-red-600/20 border-red-600/60 hover:border-red-400',
  1: 'bg-yellow-500/20 border-yellow-500/60 hover:border-yellow-400',
  2: 'bg-green-500/20 border-green-500/60 hover:border-green-400',
}

export default function TaskCard({ task, status, onCycle, onDelete }) {
  const info = STATUS_COLORS[status]

  return (
    <motion.div
      layout
      className={`relative rounded-2xl border-2 p-4 cursor-pointer select-none transition-all ${STATUS_BG[status]}`}
      style={{ minHeight: 72 }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      animate={{ borderColor: info.hex }}
      transition={{ duration: 0.3 }}
      onClick={() => onCycle(task.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.span
            key={status}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl"
          >
            {info.emoji}
          </motion.span>
          <div>
            <p className="font-semibold text-white text-base">{task.name}</p>
            <p className="text-xs mt-0.5" style={{ color: info.hex }}>{info.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 2 && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full font-medium"
            >
              +20 XP
            </motion.span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
            className="text-gray-600 hover:text-red-400 transition-colors text-xs px-1"
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
    </motion.div>
  )
}
