import React from 'react'
import { motion } from 'framer-motion'
import { getPast7Days, formatShortDate } from '../utils/dateUtils'
import { STATUS_COLORS } from '../constants/defaults'
import { getTodayKey } from '../utils/dateUtils'

export default function HistorySection({ history, tasks }) {
  const days = getPast7Days()
  const todayKey = getTodayKey()

  return (
    <div className="bg-[#1a1a2e] rounded-2xl border border-purple-900/50 overflow-hidden">
      {days.map((day, i) => {
        const dayStatuses = history[day] || {}
        const isToday = day === todayKey

        return (
          <motion.div
            key={day}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-3 px-4 py-3 ${i < days.length - 1 ? 'border-b border-purple-900/30' : ''}`}
          >
            <div className="min-w-[80px]">
              <p className="text-xs font-medium text-gray-400">
                {isToday ? 'Today' : formatShortDate(day)}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {tasks.map(task => {
                const status = dayStatuses[task.id] ?? 0
                const info = STATUS_COLORS[status]
                return (
                  <span key={task.id} className="text-xs text-gray-300 flex items-center gap-1">
                    <span>{info.emoji}</span>
                    <span className="text-gray-400">{task.name}</span>
                  </span>
                )
              })}
              {tasks.length === 0 && (
                <span className="text-xs text-gray-600 italic">No quests yet</span>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
