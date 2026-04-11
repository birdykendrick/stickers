import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import StickerImage from './StickerImage'

const SERIES_COLORS = {
  duck: 'bg-butter/60 text-amber-700',
  penguin: 'bg-blue-light/80 text-blue-800',
  cat: 'bg-blush/60 text-rose-700',
  'food-mood': 'bg-sage-light/60 text-green-800',
}

export default function ProductCard({ product, delay = 0 }) {
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    openCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      <Link to={`/product/${product.slug}`} className="block group">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
        >
          {/* Image area */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <StickerImage
              product={product}
              size="md"
              className="w-full aspect-square"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.newArrival && (
                <span className="tag bg-charcoal text-cream">✦ New</span>
              )}
              {product.popular && (
                <span className="tag bg-peach text-charcoal">Popular</span>
              )}
            </div>

            {/* Quick add overlay */}
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-300" />
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-charcoal text-cream text-xs font-medium px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-soft hover:bg-charcoal/80"
            >
              + Add to Cart
            </motion.button>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span className={`tag ${SERIES_COLORS[product.series] || 'bg-light-gray text-warm-gray'} mb-2`}>
                  {product.seriesName}
                </span>
                <h3 className="font-sans font-semibold text-charcoal text-sm leading-snug truncate">
                  {product.name}
                </h3>
              </div>
              <span className="font-mono font-medium text-charcoal text-sm whitespace-nowrap">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
