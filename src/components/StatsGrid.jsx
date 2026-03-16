import React from 'react'
import { useXPStore } from '../store/xpStore'
import CategoryCard from './CategoryCard'

export default function StatsGrid() {
  const categories = useXPStore(s => s.categories)

  return (
    <section>
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
        Category Stats
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
