import { motion } from 'framer-motion'
import { SERIES } from '../data/products'

export default function SearchFilterBar({ search, setSearch, activeSeries, setActiveSeries }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
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

      {/* Series filter */}
      <div className="flex flex-wrap items-center gap-2">
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
            {s.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}