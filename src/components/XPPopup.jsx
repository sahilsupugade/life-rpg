import React from 'react'
import { motion } from 'framer-motion'

export default function XPPopup({ delta }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      className={`text-lg font-bold pointer-events-none ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}
    >
      {delta > 0 ? `+${delta} XP` : `${delta} XP`}
    </motion.div>
  )
}
