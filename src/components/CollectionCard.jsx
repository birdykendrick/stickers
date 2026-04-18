import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRODUCTS } from '../data/products'

export default function CollectionCard({ series, delay = 0 }) {
  const count = PRODUCTS.filter(p => p.series === series.id).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="h-full"
    >
      <Link to={`/collections/${series.slug}`} className="block group h-full">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full"
          style={{ backgroundColor: series.bgColor }}
        >
          <div className="p-5 flex flex-col items-center text-center gap-3 h-full justify-center">
            {/* Cover image or emoji fallback */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-16 h-16 flex items-center justify-center"
            >
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
            </motion.div>

            <div>
              <h3 className="font-display font-bold text-xl text-charcoal">{series.name}</h3>
              <p className="font-mono text-xs text-warm-gray mt-1">{count} stickers</p>
            </div>
            <p className="font-sans text-sm text-warm-gray leading-relaxed">{series.tagline}</p>
            <span className="btn-primary text-sm px-5 py-2.5 mt-1 group-hover:bg-charcoal">
              Explore →
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
