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
        {/* SVG search icon */}
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
            {s.name}
          </motion.button>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort dropdown — custom styled */}
        <div className="relative">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="appearance-none bg-white border-2 border-light-gray rounded-full pl-4 pr-9 py-2 font-sans text-sm text-charcoal cursor-pointer focus:outline-none focus:border-charcoal/30 transition-colors"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {/* Custom chevron */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-warm-gray">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
