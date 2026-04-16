import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import CartItem from './CartItem'
import thinkingDuck from '../assets/teleduck/thinking.png'

export default function CartDrawer() {
  const { items, isOpen, closeCart } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-light-gray">
              <div>
                <h2 className="font-display font-bold text-xl text-charcoal flex items-center gap-2">
                  {/* Shopping bag icon — same as navbar cart button */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  Your Cart
                </h2>
                <p className="font-mono text-xs text-warm-gray mt-0.5">
                  {items.length === 0 ? 'Empty for now' : `${items.reduce((s,i)=>s+i.quantity,0)} item(s)`}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-light-gray flex items-center justify-center text-warm-gray hover:text-charcoal hover:bg-parchment transition-colors text-xl"
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <img src={thinkingDuck} alt="" className="w-24 h-24 object-contain" />
                  <div>
                    <p className="font-display font-semibold text-charcoal text-lg">Nothing here yet</p>
                    <p className="font-sans text-warm-gray text-sm mt-1">Add some cute stickers to get started!</p>
                  </div>
                  <button onClick={closeCart} className="btn-primary text-sm">
                    Browse Shop →
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-light-gray">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans font-medium text-warm-gray">Subtotal</span>
                  <span className="font-mono font-bold text-charcoal text-lg">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="font-mono text-xs text-warm-gray mb-4">
                  ✦ Shipping calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  Checkout via PayNow →
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
