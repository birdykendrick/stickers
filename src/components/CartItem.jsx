import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import QuantitySelector from './QuantitySelector'
import StickerImage from './StickerImage'

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4 py-4 border-b border-light-gray last:border-0"
    >
      {/* Sticker preview */}
      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
        <StickerImage product={item.product} size="sm" className="w-full h-full" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold text-charcoal text-sm leading-tight truncate">
          {item.product.name}
        </p>
        <p className="font-mono text-xs text-warm-gray mt-0.5">{item.size}</p>
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(q) => updateQuantity(item.key, q)}
          />
          <span className="font-mono font-medium text-charcoal text-sm">
            ${(item.product.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.key)}
        className="text-warm-gray hover:text-charcoal transition-colors text-lg flex-shrink-0"
        aria-label="Remove item"
      >
        ×
      </button>
    </motion.div>
  )
}
