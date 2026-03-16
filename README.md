# ⚔️ Life RPG — Gamified Habit Tracker

A mobile-first, gamified self-improvement web app that turns your daily habits into an RPG adventure. Built with React, Tailwind CSS, Recharts, and Framer Motion.

---

## 🎮 Features

### Core Mechanics
- **Effort-Based XP System** — Log effort for tasks (e.g. 30 minutes of running) and earn XP based on quantity, difficulty multiplier, and category weight.
- **Polynomial Leveling** — `Level = ⌊0.1 × √XP⌋ + 1`. Early levels unlock quickly for motivation; later levels require exponentially more XP for long-term challenge.
- **Per-Category Levels** — Each of the four categories (Learning, Fitness, Mindfulness, Creativity) tracks its own XP and level independently.
- **Streak Tracking** — Automatically tracks current and best streaks based on consecutive days with at least one effort log. The streak resets if a day is missed.

### Interaction
- **Log Effort Modal** — Tap the floating action button (bottom-right) to open a bottom-sheet modal. Select a task, enter the quantity, preview the XP you will earn, and tap "Claim Reward" to submit.
- **Custom Task Creation** — Add your own tasks via the "Add Custom Task" button. Each custom task has a name, category, difficulty, and unit label.
- **Custom Task Deletion** — Delete any custom task (and all its associated logs) from the task list.

### Visual Feedback
- **Level-Up Celebrations** — A full-screen overlay with confetti bursts and a trophy animation fires whenever you cross a level boundary.
- **XP Floaters** — Floating "+XP" notifications drift upward in the corner each time you log effort.

### Insights
- **Analytics Dashboard** — Three visualizations built with Recharts:
  - 7-day XP bar chart — shows daily effort trends
  - Category donut chart — shows XP distribution across categories
  - Recent activity log — last 8 effort entries with task, quantity, XP, and timestamp

### Achievements
- **12 Unlockable Achievements** — Automatically unlocked based on your progress. See the Achievements section below for the full list.

### Settings & Data
- **Settings Panel** — Access via the gear icon in the header. Includes a two-step "Reset All Progress" action to wipe all data and return to defaults.
- **Offline First** — All data is persisted to LocalStorage via Zustand's `persist` middleware. No backend or internet connection required.

### Design
- **Dark RPG Theme** — Deep navy/black background with neon violet, cyan, and fuchsia accents.
- **Smooth Animations** — Framer Motion throughout: staggered card entrances, spring-physics modals, animated XP bar, level-up effects.

---

## 🛠 Tech Stack

| Library | Purpose |
|---|---|
| React 19 + Vite | UI framework and dev/build tooling |
| Zustand | Global state management with LocalStorage persistence |
| Tailwind CSS | Utility-first styling |
| Recharts | Analytics charts (bar, pie/donut) |
| Framer Motion | Animations and transitions |
| Lucide React | Icon library |
| Canvas Confetti | Level-up confetti effect |

---

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

---

## ⚡ XP System

**Formula:** `XP = Effort Quantity × Difficulty Multiplier × Category Weight`

| Difficulty | Multiplier |
|------------|------------|
| Easy       | ×1.0       |
| Medium     | ×1.5       |
| Hard       | ×2.0       |

**Example:** 60 minutes of Running (Medium ×1.5) in Fitness (Weight ×1.0) = **90 XP**

**Leveling Formula:** `Level = ⌊0.1 × √XP⌋ + 1`

| Level | Approx. Total XP Required |
|-------|--------------------------|
| 1     | 0                        |
| 5     | ~2,500                   |
| 10    | ~10,000                  |
| 20    | ~40,000                  |

---

## 🗂 Default Categories & Tasks

### Categories

| Name | Weight | Color |
|---|---|---|
| Learning | ×1.2 | Indigo |
| Fitness | ×1.0 | Green |
| Mindfulness | ×1.1 | Purple |
| Creativity | ×1.0 | Amber |

### Default Tasks

| Task       | Category    | Difficulty | Unit    |
|------------|-------------|------------|---------|
| Reading    | Learning    | Easy       | pages   |
| Coding     | Learning    | Medium     | minutes |
| Running    | Fitness     | Medium     | minutes |
| Gym        | Fitness     | Hard       | minutes |
| Meditation | Mindfulness | Easy       | minutes |
| Journaling | Mindfulness | Easy       | minutes |
| Drawing    | Creativity  | Easy       | minutes |

You can add your own tasks at any time via the **Add Custom Task** button.

---

## 🔥 Streak System

- A **streak** is the number of consecutive calendar days on which you logged at least one effort.
- The **current streak** is live and counts only if your most recent log was today or yesterday. Missing a day resets it to 0.
- The **best streak** is your all-time personal record and never decreases.
- Both metrics are shown in the streak banner at the top of the page.

---

## 🏆 Achievements

12 achievements unlock automatically as you hit milestones. Locked achievements appear greyed-out; unlocked ones glow.

| Achievement | Description | Unlock Condition |
|---|---|---|
| 👣 First Step | Log your first effort | ≥ 1 effort log |
| 📝 Getting Started | Log 10 efforts | ≥ 10 effort logs |
| 💪 Dedicated | Log 50 efforts | ≥ 50 effort logs |
| 🏛️ Centurion | Log 100 efforts | ≥ 100 effort logs |
| ⭐ Rising Star | Reach level 5 | Total level ≥ 5 |
| 🎖️ Veteran | Reach level 10 | Total level ≥ 10 |
| 👑 Legend | Reach level 20 | Total level ≥ 20 |
| 🔥 On Fire | Achieve a 3-day streak | Best streak ≥ 3 days |
| ⚔️ Week Warrior | Achieve a 7-day streak | Best streak ≥ 7 days |
| 🏆 Monthly Master | Achieve a 30-day streak | Best streak ≥ 30 days |
| 🌈 Well Rounded | Earn XP in all categories | All 4 categories have > 0 XP |
| 💰 XP Hoarder | Earn 1,000 total XP | Total XP ≥ 1,000 |

---

## 📊 Analytics Dashboard

The analytics section (always visible below your task list) contains:

1. **7-Day XP Bar Chart** — A bar per day showing total XP earned. Hover a bar for the exact value. Helps you spot active days vs. skipped days.
2. **Category Donut Chart** — Shows how your total XP is distributed across the four categories. Only visible once you have XP in at least one category.
3. **Recent Activity Log** — The 8 most recent effort entries, each showing the task name, quantity logged, XP earned, and timestamp.

---

## 🗂 Data Storage

All state is persisted to LocalStorage under the key `life-rpg-store` via Zustand's `persist` middleware. Stored data includes:

- Category XP and levels
- All tasks (defaults + custom)
- All effort logs
- Total accumulated XP

No account or internet connection is needed. Clearing browser storage or using **Reset All Progress** in Settings will wipe all data.

---

## 📐 UI Layout

```
┌────────────────────────────────┐
│  LIFE RPG   [Lv.X ████░░] ⚙️  │  ← Sticky header (level + XP bar + settings)
├────────────────────────────────┤
│  🔥 3-day streak  ⭐ Best: 7   │  ← Streak banner
│                                │
│  [Learning] [Fitness]          │  ← Category stat cards (XP + level per category)
│  [Mindfulness] [Creativity]    │
│                                │
│  [+ Add Custom Task]           │
│  • Custom task 1  [🗑]         │  ← Custom task list (empty until tasks added)
│                                │
│  ── Analytics ──               │
│  [7-day bar chart]             │
│  [Category donut chart]        │
│  [Recent activity log]         │
│                                │
│  ── Achievements ──            │
│  [🏅][🏅][🔒][🔒] ...         │
│                                │
└────────────────────────────────┘
                        [ + ]     ← FAB: opens Log Effort modal
```

---

## 🔮 Future Roadmap

- Multiple character classes with unique stat bonuses
- Cloud sync and data export
- Push notification reminders
- Weekly and monthly summary reports
- Social leaderboards
