# ⚔️ Life RPG — Gamified Habit Tracker

A mobile-first, gamified self-improvement web app that turns your daily habits into an RPG adventure. Built with React, Tailwind CSS, Recharts, and Framer Motion.

## 🎮 Features

- **Habit Tracking** — Tap to cycle tasks through Missed 🔴 → Partial 🟡 → Completed 🟢
- **XP System** — Earn +20 XP for completing tasks; deducted if you revert
- **Level System** — Level up every 100 XP with celebratory animations
- **Monthly XP Graph** — Live Recharts line chart showing daily XP over 30 days
- **7-Day History** — Recent habit history for reflection
- **Add/Delete Tasks** — Dynamically manage your quest list
- **Dark RPG Theme** — Deep navy/black with neon accents
- **Animations** — Framer Motion throughout: task transitions, XP popups, level-up bursts
- **Offline First** — All data stored in LocalStorage, no backend needed

## 🛠 Tech Stack

- **React 19** + Vite
- **Tailwind CSS** for styling
- **Recharts** for the XP progress graph
- **Framer Motion** for all animations
- **LocalStorage** for persistence

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## ⚡ XP System

| Action | XP Change |
|--------|-----------|
| Task → Green (Completed) | +20 XP |
| Green → Red/Yellow | −20 XP |
| XP minimum | 0 (never negative) |

Level = `Math.floor(totalXP / 100)`

## 🧩 Adding Custom Habits

Click **"+ Add New Quest"** and type your habit name, or pick from suggestions like Reading, Meditation, Gym, etc.

## 🗂 Data Storage Format

```json
{
  "2026-03-01": {
    "exercise": 2,
    "study": 1,
    "mindfulness": 0
  }
}
```

Where: `0` = Missed, `1` = Partial, `2` = Completed

## 🔮 Future Roadmap

- Streaks and streak bonuses
- Achievement badges
- Multiple character classes
- Cloud sync / export
- Push notification reminders
- Weekly/monthly reports
- Social leaderboards
