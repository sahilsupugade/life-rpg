import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { useXPStore } from '../store/xpStore'
import { DEFAULT_TASKS } from '../constants/defaults'

const defaultTaskIds = new Set(DEFAULT_TASKS.map(t => t.id))

export default function TaskList() {
  const tasks = useXPStore(s => s.tasks)
  const categories = useXPStore(s => s.categories)
  const deleteTask = useXPStore(s => s.deleteTask)

  const customTasks = tasks.filter(t => !defaultTaskIds.has(t.id))

  if (customTasks.length === 0) return null

  return (
    <section>
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
        Custom Tasks
      </h2>
      <div className="space-y-2">
        <AnimatePresence>
          {customTasks.map(task => {
            const cat = categories.find(c => c.id === task.categoryId)
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: cat?.color ?? '#6366f1' }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{task.name}</p>
                    <p className="text-xs text-slate-500">
                      {cat?.name ?? 'Unknown'} · ×{task.difficultyMultiplier} · {task.unitLabel}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1"
                  aria-label={`Delete ${task.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
