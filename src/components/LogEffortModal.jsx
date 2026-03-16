import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Zap } from 'lucide-react'
import { useXPStore } from '../store/xpStore'
import { calcXP } from '../utils/xpCalculator'
import { DIFFICULTY_OPTIONS } from '../constants/defaults'

export default function LogEffortModal({ onLogged }) {
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [quantity, setQuantity] = useState('')

  const tasks = useXPStore(s => s.tasks)
  const categories = useXPStore(s => s.categories)
  const addLog = useXPStore(s => s.addLog)

  const tasksByCategory = categories.map(cat => ({
    ...cat,
    tasks: tasks.filter(t => t.categoryId === cat.id),
  })).filter(c => c.tasks.length > 0)

  const currentTask = tasks.find(t => t.id === selectedTask)
  const currentCategory = currentTask
    ? categories.find(c => c.id === currentTask.categoryId)
    : null

  const previewXP = currentTask && quantity && Number(quantity) > 0
    ? calcXP(Number(quantity), currentTask.difficultyMultiplier, currentCategory?.weight ?? 1)
    : 0

  const diffLabel = currentTask
    ? DIFFICULTY_OPTIONS.find(d => d.value === currentTask.difficultyMultiplier)?.label ?? ''
    : ''

  const handleSubmit = useCallback(() => {
    if (!selectedTask || !quantity || Number(quantity) <= 0) return
    const result = addLog(selectedTask, Number(quantity))
    setOpen(false)
    setSelectedTask(null)
    setQuantity('')
    if (result) onLogged?.(result)
  }, [selectedTask, quantity, addLog, onLogged])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        aria-label="Log effort"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center
                   bg-gradient-to-br from-violet-600 to-cyan-500
                   shadow-[0_0_24px_rgba(139,92,246,0.7)] text-white"
      >
        <Plus size={26} strokeWidth={2.5} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#11111f] border-t border-violet-900/50 rounded-t-3xl px-5 pt-5 pb-8 max-w-lg mx-auto"
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto mb-5" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Log Effort</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Task selector */}
              <div className="mb-4">
                <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">
                  Select Task
                </label>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {tasksByCategory.map(cat => (
                    <div key={cat.id}>
                      <p
                        className="text-xs font-semibold mb-1.5 flex items-center gap-1.5"
                        style={{ color: cat.color }}
                      >
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ background: cat.color }}
                        />
                        {cat.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.tasks.map(task => (
                          <button
                            key={task.id}
                            onClick={() => setSelectedTask(task.id)}
                            className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                              selectedTask === task.id
                                ? 'border-violet-400 bg-violet-900/50 text-white shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                                : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {task.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity input */}
              {currentTask && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">
                    How many {currentTask.unitLabel}?
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={quantity}
                      onChange={e => {
                        const val = e.target.value
                        // Allow only positive integers
                        if (val === '' || /^\d+$/.test(val)) setQuantity(val)
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder={`e.g. ${currentTask.unitLabel === 'pages' ? '20' : '30'}`}
                      autoFocus
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-lg font-bold
                                 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
                    />
                    <span className="text-sm text-slate-400 whitespace-nowrap">{currentTask.unitLabel}</span>
                  </div>

                  {/* Difficulty badge */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <span>Difficulty:</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                        diffLabel === 'Hard' ? 'bg-red-900/50 text-red-400' :
                        diffLabel === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-green-900/50 text-green-400'
                      }`}
                    >
                      {diffLabel} ×{currentTask.difficultyMultiplier}
                    </span>
                    <span>Weight: ×{currentCategory?.weight}</span>
                  </div>
                </motion.div>
              )}

              {/* XP Preview */}
              <AnimatePresence>
                {previewXP > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-center justify-center gap-2 py-3 rounded-xl
                               bg-violet-950/60 border border-violet-700/40"
                  >
                    <Zap size={16} className="text-yellow-400" />
                    <span className="text-xl font-black text-white">+{previewXP} XP</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!selectedTask || !quantity || Number(quantity) <= 0}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-widest
                           bg-gradient-to-r from-violet-600 to-cyan-500
                           disabled:opacity-30 disabled:cursor-not-allowed
                           shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-opacity"
              >
                Claim Reward
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
