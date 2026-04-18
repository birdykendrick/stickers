import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { useCartStore } from '../store/cartStore'
import StickerImage from '../components/StickerImage'
import QuantitySelector from '../components/QuantitySelector'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import { showToast } from '../components/Toast'

const SERIES_COLORS = {
  duck: 'bg-butter/60 text-amber-700',
  penguin: 'bg-blue-light/80 text-blue-800',
  cat: 'bg-blush/60 text-rose-700',
  'food-mood': 'bg-sage-light/60 text-green-800',
}

const DEFAULT_SIZES = [
  { label: 'Small (3.5 × 3.5 cm)', price: 1.50 },
  { label: 'Medium (4.5 × 4.5 cm)', price: 2.00 },
]

const NOTES = [
  {
    text: 'Premium waterproof vinyl',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    text: 'Pre-cut, easy to peel',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
        <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
        <line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    text: 'Ships within 2–4 working days via SingPost',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    text: 'Free shipping for orders above $10!',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
]

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)
  const { addItem } = useCartStore()

  const sizes = product?.sizeOptions?.length > 0 ? product.sizeOptions : DEFAULT_SIZES

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="section-pad">
        <div className="container-max">
          <EmptyState
            emoji="🌿"
            title="Sticker not found"
            subtitle="Maybe it sold out? Or maybe it never existed…"
            action={<Link to="/shop" className="btn-primary">Back to shop</Link>}
          />
        </div>
      </div>
    )
  }

  const related = getRelatedProducts(product)

  const handleAddToCart = () => {
    addItem({ ...product, price: selectedSize.price }, selectedSize.label, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    showToast(`${product.name} added to cart!`, '🛒')
  }

  return (
    <div className="section-pad">
      <div className="container-max">

        {/* Back button */}
<button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 mb-6 font-sans text-sm font-medium text-warm-gray hover:text-charcoal transition-colors group"
>
  <span className="w-8 h-8 rounded-full bg-white border border-light-gray flex items-center justify-center group-hover:border-charcoal/30 group-hover:shadow-sm transition-all">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </span>
  Back
</button>

        {/* Mobile: stacked. Desktop: side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-2/3 sm:w-1/2 lg:w-full mx-auto lg:mx-0 mb-6 lg:mb-0"
          >
            <div className="rounded-3xl overflow-hidden aspect-square shadow-card">
              <StickerImage product={product} size="xl" className="w-full h-full" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <span className={`tag ${SERIES_COLORS[product.series] || 'bg-light-gray text-warm-gray'}`}>
                {product.seriesName}
              </span>
              {product.newArrival && <span className="tag bg-charcoal text-cream">✦ New</span>}
              {product.popular && <span className="tag bg-peach text-charcoal">Popular</span>}
            </div>

            {/* Title & price */}
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-charcoal">{product.name}</h1>
              <p className="font-mono font-bold text-2xl text-charcoal mt-1">
                ${selectedSize.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-warm-gray text-sm leading-relaxed">{product.description}</p>

            {/* Size selector */}
            <div>
              <p className="font-sans font-semibold text-charcoal text-sm mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(size => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full font-mono text-xs border-2 transition-all ${
                      selectedSize.label === size.label
                        ? 'bg-charcoal text-cream border-charcoal'
                        : 'bg-white text-warm-gray border-light-gray hover:border-charcoal/30'
                    }`}
                  >
                    {size.display} — ${size.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-sans font-semibold text-charcoal text-sm mb-2">Quantity</p>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            {/* Add to cart */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`btn-primary justify-center text-base py-4 transition-all ${
                added ? 'bg-sage text-white' : ''
              }`}
            >
              {added ? (
                '✓ Added to Cart!'
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  Add to Cart
                </>
              )}
            </motion.button>

            {/* Notes */}
            <div className="bg-parchment rounded-2xl p-4 space-y-3">
              {NOTES.map(n => (
                <div key={n.text} className="flex items-center gap-3 text-warm-gray">
                  <span className="flex-shrink-0">{n.icon}</span>
                  <span className="font-sans text-sm">{n.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-2xl text-charcoal mb-6">
              More from {product.seriesName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 0.07} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}