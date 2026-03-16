# ⚔️ Life RPG — Gamified Habit Tracker

A mobile-first, gamified self-improvement web app that turns your daily habits into an RPG adventure. Built with React, Tailwind CSS, Recharts, and Framer Motion.

## 🎮 Features

- **Effort-Based XP System** — Log effort for tasks (e.g. 30 minutes of running) and earn XP based on quantity, difficulty, and category weight
- **Polynomial Leveling** — Level = ⌊0.1 × √XP⌋ + 1; early levels come fast, later levels require exponentially more XP
- **Category Stats** — Four categories (Learning, Fitness, Mindfulness, Creativity) each with their own XP and level
- **Analytics Dashboard** — 7-day XP bar chart, category donut chart, and recent activity log (powered by Recharts)
- **Log Effort Modal** — Tap the floating action button to select a task, enter quantity, preview XP, and claim your reward
- **Level-Up Celebrations** — Confetti bursts and animated overlay when you level up
- **XP Floaters** — Floating "+XP" notifications that drift upward after logging effort
- **Dark RPG Theme** — Deep navy/black with neon violet, cyan, and fuchsia accents
- **Smooth Animations** — Framer Motion throughout: XP bar transitions, card entrances, modal sheets, level-up effects
- **Offline First** — All data persisted to LocalStorage via Zustand; no backend needed

## 🛠 Tech Stack

- **React 19** + Vite
- **Zustand** for state management (with LocalStorage persistence)
- **Tailwind CSS** for styling
- **Recharts** for analytics charts
- **Framer Motion** for all animations
- **Lucide React** for icons
- **Canvas Confetti** for level-up celebration effects

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Other Commands

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## ⚡ XP System

**Formula:** `XP = Effort Quantity × Difficulty Multiplier × Category Weight`

| Difficulty | Multiplier |
|------------|------------|
| Easy       | ×1.0       |
| Medium     | ×1.5       |
| Hard       | ×2.0       |

**Example:** 60 minutes of Running (Medium ×1.5) in Fitness (Weight ×1.0) = **90 XP**

**Leveling:** Level = ⌊0.1 × √XP⌋ + 1

## 🧩 Default Tasks

| Task       | Category    | Difficulty | Unit    |
|------------|-------------|------------|---------|
| Reading    | Learning    | Easy       | pages   |
| Coding     | Learning    | Medium     | minutes |
| Running    | Fitness     | Medium     | minutes |
| Gym        | Fitness     | Hard       | minutes |
| Meditation | Mindfulness | Easy       | minutes |
| Journaling | Mindfulness | Easy       | minutes |
| Drawing    | Creativity  | Easy       | minutes |

## 🗂 Data Storage

All state is persisted to LocalStorage under the key `life-rpg-store` via Zustand's `persist` middleware. Data includes categories, tasks, effort logs, and total XP.

## 🔮 Future Roadmap

- Habit tracking with daily check-ins (Missed / Partial / Completed)
- Streaks and streak bonuses
- Achievement badges
- Add / delete custom tasks and categories from the UI
- Multiple character classes
- Cloud sync / export
- Push notification reminders
- Weekly/monthly reports
- Social leaderboards
