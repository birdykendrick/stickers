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
    >
      <Link to={`/collections/${series.slug}`} className="block group">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
          style={{ backgroundColor: series.bgColor }}
        >
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <motion.span
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="text-6xl"
            >
              {series.emoji}
            </motion.span>
            <div>
              <h3 className="font-display font-bold text-2xl text-charcoal">{series.name}</h3>
              <p className="font-mono text-xs text-warm-gray mt-1">{count} stickers</p>
            </div>
            <p className="font-sans text-sm text-warm-gray leading-relaxed">{series.tagline}</p>
            <span className="btn-primary text-sm px-5 py-2.5 mt-2 group-hover:bg-charcoal">
              Explore →
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
