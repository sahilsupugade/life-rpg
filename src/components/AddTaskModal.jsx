import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useXPStore } from '../store/xpStore'
import { DIFFICULTY_OPTIONS } from '../constants/defaults'

export default function AddTaskModal({ open, onClose }) {
  const categories = useXPStore(s => s.categories)
  const addTask = useXPStore(s => s.addTask)

  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [difficultyMultiplier, setDifficultyMultiplier] = useState(1.0)
  const [unitLabel, setUnitLabel] = useState('minutes')

  const canSubmit = name.trim() && categoryId

  const handleSubmit = () => {
    if (!canSubmit) return
    addTask({
      name: name.trim(),
      categoryId,
      difficultyMultiplier,
      unitLabel: unitLabel.trim() || 'minutes',
    })
    setName('')
    setCategoryId('')
    setDifficultyMultiplier(1.0)
    setUnitLabel('minutes')
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="addtask-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            key="addtask-sheet"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#11111f] border-t border-violet-900/50 rounded-t-3xl px-5 pt-5 pb-8 max-w-lg mx-auto"
          >
            <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto mb-5" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Add New Task</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Task Name */}
            <div className="mb-4">
              <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">
                Task Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Yoga, Study, etc."
                autoFocus
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white
                           focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white
                           focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 appearance-none"
              >
                <option value="" disabled>Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="mb-4">
              <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">
                Difficulty
              </label>
              <select
                value={difficultyMultiplier}
                onChange={e => setDifficultyMultiplier(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white
                           focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 appearance-none"
              >
                {DIFFICULTY_OPTIONS.map(d => (
                  <option key={d.value} value={d.value}>
                    {d.label} (×{d.value})
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Label */}
            <div className="mb-6">
              <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">
                Unit Label
              </label>
              <input
                type="text"
                value={unitLabel}
                onChange={e => setUnitLabel(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="minutes"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white
                           focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-medium
                           hover:border-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 py-3 rounded-xl font-bold text-white text-sm uppercase tracking-widest
                           bg-gradient-to-r from-violet-600 to-cyan-500
                           disabled:opacity-30 disabled:cursor-not-allowed
                           shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-opacity"
              >
                Add Task
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
