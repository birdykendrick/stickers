import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRODUCTS } from '../data/products'

export default function CollectionCard({ series, delay = 0 }) {
  const count = PRODUCTS.filter(p => p.series === series.id).length

  return (
    <Link to={`/collections/${series.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
        style={{ backgroundColor: series.bgColor }}
      >
        <div className="p-5 flex flex-col items-center text-center gap-3">
          {/* Cover image or emoji fallback */}
          <div className="w-14 h-14 flex items-center justify-center">
            {series.coverImage ? (
              <img
                src={series.coverImage}
                alt={series.name}
                className="w-full h-full object-contain drop-shadow-md select-none"
                draggable={false}
              />
            ) : (
              <span className="text-5xl">{series.emoji}</span>
            )}
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-charcoal">{series.name}</h3>
            <p className="font-mono text-xs text-warm-gray mt-1">{count} stickers</p>
          </div>
          <p className="font-sans text-xs text-warm-gray leading-relaxed">{series.tagline}</p>
          <span className="btn-primary text-xs px-4 py-2 mt-1 group-hover:bg-charcoal">
            Explore →
          </span>
        </div>
      </motion.div>
    </Link>
  )
}
