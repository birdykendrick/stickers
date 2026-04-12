import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import StickerImage from './StickerImage'
import { showToast } from './Toast'

export default function ProductCard({ product, delay = 0 }) {
  const { addItem, updateQuantity, items } = useCartStore()

  // Derive quantity directly from cart store so it stays in sync
  const cartKey = `${product.id}-${product.sizes?.[0] || 'Standard'}`
  const cartItem = items.find(i => i.key === cartKey)
  const qty = cartItem?.quantity ?? 0

  const handleDecrement = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (qty > 0) updateQuantity(cartKey, qty - 1)
  }

  const handleIncrement = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, product.sizes?.[0] || 'Standard', 1)
    showToast(`${product.name} added!`, '🛒')
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
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl overflow-hidden border border-light-gray hover:border-charcoal/15 hover:shadow-card transition-all duration-300"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <StickerImage
              product={product}
              size="md"
              className="w-full aspect-square"
            />
            {(product.newArrival || product.popular) && (
              <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                {product.newArrival && (
                  <span className="text-[10px] font-mono font-semibold bg-charcoal text-cream px-2 py-0.5 rounded-full">New</span>
                )}
                {product.popular && (
                  <span className="text-[10px] font-mono font-semibold bg-peach text-charcoal px-2 py-0.5 rounded-full">Popular</span>
                )}
              </div>
            )}
          </div>

          {/* Info + stepper */}
          <div className="px-3 py-3">
            <p className="font-sans font-medium text-charcoal text-sm leading-snug truncate">
              {product.name}
            </p>
            <p className="font-mono text-xs text-warm-gray mt-0.5">
              ${product.price.toFixed(2)}
            </p>

            {/* Quantity stepper — reads from cart store, always in sync */}
            <div
              className="flex items-center justify-between mt-3 bg-parchment rounded-xl overflow-hidden border border-light-gray"
              onClick={e => e.preventDefault()}
            >
              <button
                onClick={handleDecrement}
                disabled={qty === 0}
                className="w-9 h-9 flex items-center justify-center text-warm-gray hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium text-base"
              >
                −
              </button>
              <span className="font-mono text-sm text-charcoal font-medium min-w-[1.5rem] text-center">
                {qty}
              </span>
              <button
                onClick={handleIncrement}
                className="w-9 h-9 flex items-center justify-center text-warm-gray hover:text-charcoal transition-colors font-medium text-base"
              >
                +
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
