import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getSeriesBySlug, getProductsBySeries } from '../data/products'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

export default function CollectionDetailPage() {
  const { slug } = useParams()
  const series = getSeriesBySlug(slug)
  const products = getProductsBySeries(slug)

  if (!series) {
    return (
      <div className="section-pad">
        <div className="container-max">
          <EmptyState
            emoji="🌿"
            title="Collection not found"
            subtitle="This series doesn't exist yet… or maybe it's a secret."
            action={<Link to="/collections" className="btn-primary">Back to collections</Link>}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Banner */}
      <div
        className="py-20 md:py-28 px-4 text-center relative overflow-hidden"
        style={{ backgroundColor: series.bgColor }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-5 text-[16rem] font-display flex items-center justify-center pointer-events-none select-none"
        >
          {series.emoji}
        </div>

        <div className="relative z-10">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-7xl block mb-5"
          >
            {series.emoji}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="tag bg-white/60 text-charcoal font-mono text-xs uppercase tracking-widest mb-4 inline-block">
              Series
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal">
              {series.name}
            </h1>
            <p className="font-sans text-warm-gray text-lg mt-4 max-w-md mx-auto leading-relaxed">
              {series.description}
            </p>
            <p className="font-mono text-sm text-warm-gray mt-3">
              {products.length} sticker{products.length !== 1 ? 's' : ''} in this series
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products */}
      <div className="section-pad">
        <div className="container-max">
          {products.length === 0 ? (
            <EmptyState
              emoji="🌿"
              title="Nothing here yet"
              subtitle="This series is still being drawn. Check back soon!"
              action={<Link to="/shop" className="btn-primary">Browse all stickers</Link>}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} delay={i * 0.07} />
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link to="/collections" className="btn-secondary text-sm">
              ← All Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
