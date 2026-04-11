import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addItem } = useCartStore()

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard')
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
    addItem(product, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    showToast(`${product.name} added to cart!`, '🛍️')
  }

  return (
    <div className="section-pad">
      <div className="container-max">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-xs text-warm-gray mb-8">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/collections/${product.series}`} className="hover:text-charcoal transition-colors">
            {product.seriesName}
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-4xl overflow-hidden aspect-square shadow-card">
              <StickerImage product={product} size="xl" className="w-full h-full" />
            </div>

            {/* Thumbnail row — same image for now, replace with alternates */}
            <div className="flex gap-3 mt-4">
              {[0, 1].map(i => (
                <div
                  key={i}
                  className={`w-16 h-16 rounded-2xl overflow-hidden shadow-soft cursor-pointer border-2 transition-colors ${
                    i === 0 ? 'border-charcoal' : 'border-transparent hover:border-charcoal/20'
                  }`}
                >
                  <StickerImage product={product} size="sm" className="w-full h-full" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
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
              <h1 className="font-display font-bold text-4xl text-charcoal">{product.name}</h1>
              <p className="font-mono font-bold text-2xl text-charcoal mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-warm-gray leading-relaxed">{product.description}</p>

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="font-sans font-semibold text-charcoal text-sm mb-2">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full font-mono text-xs border-2 transition-all ${
                        selectedSize === size
                          ? 'bg-charcoal text-cream border-charcoal'
                          : 'bg-white text-warm-gray border-light-gray hover:border-charcoal/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="font-sans font-semibold text-charcoal text-sm mb-2">Quantity</p>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            {/* Add to cart */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`btn-primary flex-1 justify-center text-base py-4 transition-all ${
                  added ? 'bg-sage text-white' : ''
                }`}
              >
                {added ? '✓ Added to Cart!' : '🛍️ Add to Cart'}
              </motion.button>
              <Link to="/checkout" className="btn-secondary flex-1 justify-center text-base py-4 text-center">
                Buy Now
              </Link>
            </div>

            {/* Notes */}
            <div className="bg-parchment rounded-2xl p-5 space-y-2">
              {[
                { emoji: '🌟', text: 'Premium waterproof vinyl' },
                { emoji: '✂️', text: 'Pre-cut, easy to peel' },
                { emoji: '🚿', text: 'Dishwasher & weather safe' },
                { emoji: '📦', text: 'Ships within 3–5 working days' },
              ].map(n => (
                <div key={n.text} className="flex items-center gap-3">
                  <span className="text-base">{n.emoji}</span>
                  <span className="font-sans text-sm text-warm-gray">{n.text}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="tag bg-light-gray text-warm-gray">#{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
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
