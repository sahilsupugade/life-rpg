export const DEFAULT_CATEGORIES = [
  { id: 'learning',     name: 'Learning',     weight: 1.2, color: '#6366f1' },
  { id: 'fitness',      name: 'Fitness',      weight: 1.0, color: '#22c55e' },
  { id: 'mindfulness',  name: 'Mindfulness',  weight: 1.1, color: '#a855f7' },
  { id: 'creativity',   name: 'Creativity',   weight: 1.0, color: '#f59e0b' },
]

export const DIFFICULTY_OPTIONS = [
  { label: 'Easy',   value: 1.0 },
  { label: 'Medium', value: 1.5 },
  { label: 'Hard',   value: 2.0 },
]

export const DEFAULT_TASKS = [
  { id: 'reading',    name: 'Reading',    categoryId: 'learning',    difficultyMultiplier: 1.0, unitLabel: 'pages'   },
  { id: 'coding',     name: 'Coding',     categoryId: 'learning',    difficultyMultiplier: 1.5, unitLabel: 'minutes' },
  { id: 'running',    name: 'Running',    categoryId: 'fitness',     difficultyMultiplier: 1.5, unitLabel: 'minutes' },
  { id: 'gym',        name: 'Gym',        categoryId: 'fitness',     difficultyMultiplier: 2.0, unitLabel: 'minutes' },
  { id: 'meditation', name: 'Meditation', categoryId: 'mindfulness', difficultyMultiplier: 1.0, unitLabel: 'minutes' },
  { id: 'journaling', name: 'Journaling', categoryId: 'mindfulness', difficultyMultiplier: 1.0, unitLabel: 'minutes' },
  { id: 'drawing',    name: 'Drawing',    categoryId: 'creativity',  difficultyMultiplier: 1.0, unitLabel: 'minutes' },
]
