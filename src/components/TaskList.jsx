import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from './TaskCard'

export default function TaskList({ tasks, getStatus, onCycle, onDelete }) {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <TaskCard
              task={task}
              status={getStatus(task.id)}
              onCycle={onCycle}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
