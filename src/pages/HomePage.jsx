import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getFeaturedProducts, getNewArrivals, SERIES } from '../data/products'
import ProductCard from '../components/ProductCard'
import CollectionCard from '../components/CollectionCard'
import SectionHeader from '../components/SectionHeader'

// ── Fade-up wrapper ──────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Floating sticker decoration ──────────────────────────────
function FloatingSticker({ emoji, className }) {
  return (
    <motion.span
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute text-4xl select-none pointer-events-none ${className}`}
    >
      {emoji}
    </motion.span>
  )
}

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4)
  const newArrivals = getNewArrivals().slice(0, 4)

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-cream">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-peach/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-butter/30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush/10 rounded-full blur-3xl" />

        {/* Floating stickers */}
        <FloatingSticker emoji="🦆" className="top-28 right-[8%] opacity-80" />
        <FloatingSticker emoji="🐧" className="top-40 right-[20%] opacity-60 text-3xl" />
        <FloatingSticker emoji="🍜" className="bottom-32 right-[12%] opacity-70 text-3xl" />
        <FloatingSticker emoji="🐱" className="bottom-40 left-[8%] opacity-60" />
        <FloatingSticker emoji="🧋" className="top-32 left-[18%] opacity-50 text-2xl" />
        <FloatingSticker emoji="🌸" className="bottom-28 left-[25%] opacity-40 text-2xl" />

        <div className="container-max section-pad relative z-10">
          <div className="max-w-2xl">
            {/* Label */}
            <FadeUp>
              <span className="tag bg-peach-light text-charcoal font-mono uppercase tracking-widest text-xs">
                ✦ Singapore indie sticker shop
              </span>
            </FadeUp>

            {/* Headline */}
            <FadeUp delay={0.1}>
              <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-charcoal leading-[1.05] mt-5">
                Tiny stickers,
                <br />
                <em className="italic text-warm-gray font-normal">big feelings.</em>
              </h1>
            </FadeUp>

            {/* Subheading */}
            <FadeUp delay={0.2}>
              <p className="font-sans text-warm-gray text-lg md:text-xl mt-6 leading-relaxed max-w-lg">
                Cute little chaos for your laptop, journal, and water bottle. Hand-drawn characters with way too many feelings.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/shop" className="btn-primary text-base px-7 py-3.5">
                  Shop All Stickers
                </Link>
                <Link to="/collections" className="btn-secondary text-base px-7 py-3.5">
                  Browse Series
                </Link>
              </div>
            </FadeUp>

            {/* Social proof */}
            <FadeUp delay={0.4}>
              <div className="flex items-center gap-4 mt-10">
                <div className="flex -space-x-2">
                  {['🦆', '🐧', '🐱', '🍜'].map((e, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-base border-2 border-cream"
                    >
                      {e}
                    </span>
                  ))}
                </div>
                <p className="font-sans text-sm text-warm-gray">
                  <strong className="text-charcoal">4 series</strong> · 16 stickers · loved by chaotic people
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ─────────────────────────────── */}
      <section className="section-pad bg-parchment">
        <div className="container-max">
          <SectionHeader
            tag="Collections"
            title="Shop by Series"
            subtitle="Every series is its own little universe of chaos and cuteness."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERIES.map((series, i) => (
              <CollectionCard key={series.id} series={series} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-max">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              tag="Fan Favourites"
              title="Best Sellers"
              subtitle="The stickers everyone's obsessed with right now."
            />
            <Link to="/shop" className="btn-secondary text-sm hidden md:inline-flex">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.08} />
            ))}
          </div>
          <div className="mt-6 md:hidden flex justify-center">
            <Link to="/shop" className="btn-secondary text-sm">View all →</Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────── */}
      <section className="section-pad bg-parchment">
        <div className="container-max">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              tag="Just Dropped"
              title="New Arrivals"
            />
            <Link to="/shop?filter=new" className="btn-secondary text-sm hidden md:inline-flex">
              See all new →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────── */}
      <section id="how-to-order" className="section-pad">
        <div className="container-max">
          <SectionHeader
            tag="How it works"
            title="Ordering is easy"
            subtitle="No accounts needed. No complicated checkout. Just cute stickers, straight to you."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                step: '01',
                emoji: '🛍️',
                title: 'Add to Cart',
                desc: 'Browse the shop, pick your favourites, and add them to your cart.',
                bg: 'bg-butter/30',
              },
              {
                step: '02',
                emoji: '📝',
                title: 'Fill in Your Details',
                desc: 'Enter your name, phone, email and delivery address at checkout.',
                bg: 'bg-peach-light/40',
              },
              {
                step: '03',
                emoji: '📱',
                title: 'Pay via PayNow / PayLah',
                desc: 'Scan the QR code and send proof of payment. We\'ll confirm and ship!',
                bg: 'bg-sage-light/40',
              },
            ].map((step, i) => (
              <FadeUp key={step.step} delay={i * 0.1}>
                <div className={`${step.bg} rounded-3xl p-7 flex flex-col gap-4`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-warm-gray">{step.step}</span>
                    <span className="text-3xl">{step.emoji}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-charcoal">{step.title}</h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────────── */}
      <section className="section-pad bg-charcoal text-cream overflow-hidden relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 text-[20rem] font-display leading-none select-none pointer-events-none flex items-center justify-end pr-8">
          🌸
        </div>
        <div className="container-max relative z-10">
          <div className="max-w-xl">
            <FadeUp>
              <span className="tag bg-cream/10 text-cream/70 font-mono text-xs uppercase tracking-widest mb-4 inline-block">
                Our story
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
                Made by someone <br />
                <em className="italic font-normal text-peach">who gets it.</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-sans text-cream/70 text-lg mt-5 leading-relaxed">
                smolstuck was born from doodles in notebook margins and the firm belief that stickers can say what words can't. Every character has feelings. Lots of them.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link to="/about" className="btn-peach mt-7 inline-flex">
                Read the story →
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER / FOLLOW ──────────────────────────────── */}
      <section className="section-pad">
        <div className="container-max">
          <FadeUp>
            <div className="bg-parchment rounded-4xl p-10 md:p-14 text-center max-w-2xl mx-auto">
              <span className="text-5xl">💌</span>
              <h2 className="font-display font-bold text-3xl text-charcoal mt-4">
                Stay in the loop
              </h2>
              <p className="font-sans text-warm-gray mt-3 leading-relaxed">
                New drops, restocks, and exclusive sneak peeks — straight to your inbox. No spam, only stickers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-7 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-field flex-1"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe ✦
                </button>
              </div>
              <p className="font-mono text-xs text-warm-gray mt-4">
                Or follow us on Instagram · TikTok · Telegram
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
