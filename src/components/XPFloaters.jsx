import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Floating "+XP" notifications that drift upward toward the header.
 */
export default function XPFloaters({ items }) {
  return (
    <div className="fixed top-24 right-5 z-50 pointer-events-none flex flex-col-reverse items-end gap-1">
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-lg font-black tracking-wide text-yellow-300 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
          >
            +{item.xp} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
