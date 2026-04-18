import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import StickerImage from './StickerImage'
import { showToast } from './Toast'

export default function ProductCard({ product, delay = 0 }) {
  const { addItem, updateQuantity, items } = useCartStore()

  const cartKey = `${product.id}-${product.sizeOptions?.[0]?.label || 'Small'}`
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
    addItem(product, product.sizeOptions?.[0]?.label || 'Small', 1)
    showToast(`${product.name} added!`, '🛒')
  }

  // ── CUSTOM ENQUIRY CARD ───────────────────────────────────
  if (product.id === 'custom-enquiry') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      >
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-peach/20 rounded-2xl overflow-hidden border-2 border-dashed border-peach/60 hover:border-peach hover:shadow-card transition-all duration-300 h-full"
        >
          {/* Text panel instead of image */}
          <div className="aspect-square flex flex-col items-center justify-center text-center px-4 gap-3">
            <div className="w-12 h-12 rounded-full bg-peach/40 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <p className="font-display font-bold text-charcoal text-base leading-tight">
              Want a custom sticker?
            </p>
            <p className="font-sans text-warm-gray text-xs leading-relaxed">
              Your pet, your character, your idea? We will draw it just for you! DM us after checkout!
            </p>
          </div>

          {/* Info + stepper */}
          <div className="px-3 py-3">
            <p className="font-sans font-medium text-charcoal text-sm leading-snug">
              Custom Order Enquiry
            </p>
            <p className="font-mono text-xs text-warm-gray mt-0.5">
              Free to enquire ✦
            </p>
            <div
              className="flex items-center justify-between mt-3 bg-white rounded-xl overflow-hidden border border-peach/30"
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
      </motion.div>
    )
  }

  // ── REGULAR PRODUCT CARD ──────────────────────────────────
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
