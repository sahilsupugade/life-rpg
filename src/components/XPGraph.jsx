import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getPast30Days, formatShortDate } from '../utils/dateUtils'
import { STATUS } from '../constants/defaults'

export default function XPGraph({ history, tasks }) {
  const days = getPast30Days()

  const data = days.map(day => {
    const dayStatuses = history[day] || {}
    const xp = Object.values(dayStatuses).filter(s => s === STATUS.COMPLETED).length * 20
    return {
      date: formatShortDate(day),
      xp,
    }
  })

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a2e] border border-purple-800 rounded-lg px-3 py-2 text-sm">
          <p className="text-gray-400">{label}</p>
          <p className="text-purple-300 font-bold">{payload[0].value} XP</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-4 border border-purple-900/50">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d2d4d" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickLine={false}
            interval={6}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="xp"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#a855f7' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
