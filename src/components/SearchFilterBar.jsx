import { motion } from 'framer-motion'
import { SERIES } from '../data/products'

export default function SearchFilterBar({ search, setSearch, activeSeries, setActiveSeries, sort, setSort }) {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Popular' },
    { value: 'price-asc', label: 'Price ↑' },
    { value: 'price-desc', label: 'Price ↓' },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search stickers…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-10"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal text-lg"
          >
            ×
          </button>
        )}
      </div>

      {/* Series filter + Sort */}
      <div className="flex flex-wrap items-center gap-2">
        {/* All button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveSeries(null)}
          className={`tag px-3 py-1.5 transition-all ${
            !activeSeries
              ? 'bg-charcoal text-cream'
              : 'bg-white border border-light-gray text-warm-gray hover:border-charcoal/30 hover:text-charcoal'
          }`}
        >
          All
        </motion.button>

        {SERIES.map(s => (
          <motion.button
            key={s.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveSeries(activeSeries === s.id ? null : s.id)}
            className={`tag px-3 py-1.5 transition-all ${
              activeSeries === s.id
                ? 'bg-charcoal text-cream'
                : 'bg-white border border-light-gray text-warm-gray hover:border-charcoal/30 hover:text-charcoal'
            }`}
          >
            {s.emoji} {s.name}
          </motion.button>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="input-field w-auto text-sm py-2 px-3 cursor-pointer"
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
