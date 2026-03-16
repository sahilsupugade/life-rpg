import React from 'react'
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useXPStore } from '../store/xpStore'

function getDailyXP(effortLogs) {
  const map = {}
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const label = d.toLocaleDateString('en', { weekday: 'short' })
    map[key] = { date: key, label, xp: 0 }
  }
  effortLogs.forEach(log => {
    const key = log.createdAt.slice(0, 10)
    if (map[key]) map[key].xp += log.xpEarned
  })
  return Object.values(map)
}

const CustomBar = (props) => {
  const { x, y, width, height } = props
  if (!height || height <= 0) return null
  return (
    <rect
      x={x} y={y} width={width} height={height}
      rx={6} ry={6}
      fill="url(#barGradient)"
      style={{ filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.6))' }}
    />
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 border border-violet-700/50 rounded-xl px-3 py-2 text-xs text-white shadow-lg">
      <span className="text-violet-300 font-bold">+{payload[0].value} XP</span>
    </div>
  )
}

export default function AnalyticsPanel() {
  const effortLogs = useXPStore(s => s.effortLogs)
  const categories = useXPStore(s => s.categories)
  const tasks = useXPStore(s => s.tasks)

  const dailyData = getDailyXP(effortLogs)
  const donutData = categories
    .filter(c => c.currentXP > 0)
    .map(c => ({ name: c.name, value: Math.floor(c.currentXP), color: c.color }))

  const recentLogs = effortLogs.slice(0, 8)

  return (
    <section className="space-y-6">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Analytics</h2>

      {/* Daily XP bar chart */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4">
        <p className="text-xs text-slate-400 mb-3">XP — Last 7 Days</p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={dailyData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.08)' }} />
            <Bar dataKey="xp" shape={<CustomBar />} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category donut chart */}
      {donutData.length > 0 && (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-3">XP by Category</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {donutData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    style={{ filter: `drop-shadow(0 0 6px ${entry.color}88)` }}
                  />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: '#94a3b8', fontSize: 11 }}>{value}</span>
                )}
              />
              <Tooltip
                formatter={(val) => [`${val} XP`, '']}
                contentStyle={{ background: '#1e1b4b', border: '1px solid #5b21b6', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ display: 'none' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent logs */}
      {recentLogs.length > 0 && (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-400 mb-3">Recent Activity</p>
          <div className="space-y-2">
            {recentLogs.map(log => {
              const cat = categories.find(c => c.id === log.categoryId)
              const task = tasks.find(t => t.id === log.taskId)
              const timeStr = new Date(log.createdAt).toLocaleString(undefined, {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
              })
              return (
                <div key={log.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: cat?.color ?? '#6366f1' }}
                    />
                    <span className="text-slate-300 font-medium">{task?.name ?? 'Task'}</span>
                    <span className="text-slate-500 text-xs">
                      {log.quantity} {task?.unitLabel ?? 'units'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-violet-400 font-bold text-xs">+{log.xpEarned} XP</span>
                    <span className="text-slate-600 text-xs hidden sm:inline">{timeStr}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
