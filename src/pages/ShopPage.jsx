import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'
import SearchFilterBar from '../components/SearchFilterBar'
import SectionHeader from '../components/SectionHeader'
import EmptyState from '../components/EmptyState'
import { Link } from 'react-router-dom'

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [activeSeries, setActiveSeries] = useState(null)

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.seriesName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (activeSeries) {
      list = list.filter(p => p.series === activeSeries)
    }

    return list
  }, [search, activeSeries])

  return (
    <div className="section-pad">
      <div className="container-max">
        {/* Header */}
        <SectionHeader
          tag="All stickers"
          title="The Full Collection"
          subtitle={`${PRODUCTS.length} stickers and counting. Every one of them has feelings.`}
        />

        {/* Filters */}
        <div className="mb-8">
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            activeSeries={activeSeries}
            setActiveSeries={setActiveSeries}
          />
        </div>

        {/* Results count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="font-mono text-sm text-warm-gray">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {(search || activeSeries) ? ' found' : ''}
          </p>
          {(search || activeSeries) && (
            <button
              onClick={() => { setSearch(''); setActiveSeries(null) }}
              className="font-mono text-xs text-warm-gray hover:text-charcoal underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid or Empty */}
        {filtered.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="Nothing found"
            subtitle={`No stickers match "${search}". Try a different search or clear the filters.`}
            action={
              <button
                onClick={() => { setSearch(''); setActiveSeries(null) }}
                className="btn-primary"
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 0.04} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
