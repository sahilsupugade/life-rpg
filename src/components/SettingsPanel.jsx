import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'
import { useXPStore } from '../store/xpStore'

export default function SettingsPanel({ open, onClose }) {
  const resetAll = useXPStore(s => s.resetAll)
  const [confirmReset, setConfirmReset] = useState(false)

  const handleReset = () => {
    resetAll()
    setConfirmReset(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            key="settings-sheet"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#11111f] border-t border-violet-900/50 rounded-t-3xl px-5 pt-5 pb-8 max-w-lg mx-auto"
          >
            <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto mb-5" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Settings</h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Reset Progress */}
              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-950/50 transition-colors"
                >
                  <AlertTriangle size={18} />
                  <span className="font-semibold text-sm">Reset All Progress</span>
                </button>
              ) : (
                <div className="rounded-xl border border-red-700/60 bg-red-950/40 p-4 space-y-3">
                  <p className="text-sm text-red-300 font-semibold">
                    Are you sure? This will permanently delete all your progress.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-medium hover:border-slate-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-colors"
                    >
                      Yes, Reset
                    </button>
                  </div>
                </div>
              )}

              {/* Version */}
              <div className="text-center pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-600">Life RPG v1.0.0</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
