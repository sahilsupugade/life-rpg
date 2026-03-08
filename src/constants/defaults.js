export const DEFAULT_TASKS = [
  { id: 'exercise', name: 'Exercise' },
  { id: 'study', name: 'Study / Skill' },
  { id: 'mindfulness', name: 'Mindfulness' },
]

export const STATUS = {
  MISSED: 0,    // Red
  PARTIAL: 1,   // Yellow
  COMPLETED: 2, // Green
}

export const STATUS_COLORS = {
  0: { bg: 'bg-red-600', hex: '#ef4444', label: 'Missed', emoji: '🔴' },
  1: { bg: 'bg-yellow-500', hex: '#eab308', label: 'Partial', emoji: '🟡' },
  2: { bg: 'bg-green-500', hex: '#22c55e', label: 'Completed', emoji: '🟢' },
}

export const XP_PER_COMPLETE = 20
