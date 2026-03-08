import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SUGGESTIONS = ['Reading', 'Meditation', 'Gym', 'Learning Coding', 'Journaling', 'Hydration', 'Sleep 8hrs']

export default function AddTaskModal({ onAdd, onClose }) {
  const [name, setName] = useState('')

  const handleAdd = () => {
    const trimmed = name.trim()
    if (trimmed) onAdd(trimmed)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md bg-[#1a1a2e] rounded-2xl p-6 border border-purple-800/60 shadow-2xl"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-white mb-4">Add New Quest</h3>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Quest name..."
          className="w-full bg-[#0f0f1a] border border-purple-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => setName(s)}
              className="text-xs bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full hover:bg-purple-700/50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!name.trim()}
            className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-colors"
          >
            Add Quest
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
