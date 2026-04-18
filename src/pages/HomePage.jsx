import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRODUCTS, getNewArrivals, SERIES } from '../data/products'
import ProductCard from '../components/ProductCard'
import CollectionCard from '../components/CollectionCard'
import SectionHeader from '../components/SectionHeader'
import duckImg from '../assets/duck.png'
import otterImg from '../assets/otter.png'
import dogImg from '../assets/dog.png'
import thinkingDuckImg from '../assets/thinkingduck.png'
import sleepingDuckImg from '../assets/sleepingduck.png'
import sleepyOtterImg from '../assets/sleepyotter.png'
import forheaderImg from '../assets/forheader.png'

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
function FloatingSticker({ src, duration = 4, className }) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 768 : false

  if (isMobile || prefersReducedMotion) {
    return (
      <img
        src={src}
        alt=""
        className={`absolute select-none pointer-events-none drop-shadow-lg object-contain ${className}`}
      />
    )
  }

  return (
    <motion.img
      src={src}
      alt=""
      animate={{ y: [0, -14, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute select-none pointer-events-none drop-shadow-lg object-contain ${className}`}
    />
  )
}

// ── Marquee styles injected directly so iOS Safari sees them ──
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    animation: marquee 25s linear infinite;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: max-content;
    will-change: transform;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
`

export default function HomePage() {
  const allProducts = PRODUCTS.filter(p => p.series !== 'custom')
  const featured = [...allProducts].sort(() => Math.random() - 0.5).slice(0, 4)
  const newArrivals = getNewArrivals().slice(0, 4)

  const seriesCount = 5
  const stickerCount = 30

  return (
    <div>
      {/* Inject marquee keyframes directly into the page */}
      <style>{marqueeStyles}</style>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-cream">
        <div className="absolute top-20 right-10 w-72 h-72 bg-peach/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-butter/30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush/10 rounded-full blur-3xl" />

        <FloatingSticker src={thinkingDuckImg} duration={3.8}
          className="w-[110px] top-[6%] right-[4%] sm:w-[120px] sm:top-[8%] sm:right-[6%] md:w-[155px] md:top-[10%] md:right-[17%] opacity-95 z-0"
        />
        <FloatingSticker src={duckImg} duration={4.6}
          className="w-[90px] top-[35%] right-[2%] sm:w-[110px] sm:top-[38%] sm:right-[3%] md:w-[150px] md:top-[42%] md:right-[5%] opacity-85 z-0"
        />
        <FloatingSticker src={sleepingDuckImg} duration={5.1}
          className="w-[95px] bottom-[7%] right-[6%] sm:w-[115px] sm:bottom-[10%] sm:right-[7%] md:w-[158px] md:bottom-[10%] md:right-[12%] opacity-90 z-0"
        />
        <FloatingSticker src={dogImg} duration={4.2}
          className="w-[85px] top-[2%] left-[8%] sm:w-[110px] sm:top-[8%] sm:left-[4%] md:w-[140px] md:top-[10%] md:left-[12.5%] opacity-85 z-0"
        />
        <FloatingSticker src={otterImg} duration={3.5}
          className="w-[0px] top-[38%] left-[2%] sm:w-[105px] sm:top-[40%] sm:left-[3%] md:w-[160px] md:top-[42%] md:left-[5%] opacity-80 z-0"
        />
        <FloatingSticker src={sleepyOtterImg} duration={4.9}
          className="w-[95px] bottom-[4.5%] left-[10%] sm:w-[115px] sm:bottom-[9%] sm:left-[5%] md:w-[170px] md:bottom-[10%] md:left-[15%] opacity-90 z-0"
        />

        <div className="container-max section-pad relative z-10">
          <div className="max-w-2xl">
            <FadeUp>
              <span className="tag bg-peach-light text-charcoal font-mono uppercase tracking-widest text-xs">
                ✦ home-based sticker shop
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-charcoal leading-[1.05] mt-5">
                Cute stickers,
                <br />
                <em className="italic text-warm-gray font-normal">inspired by everyday life.</em>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-sans text-warm-gray text-lg md:text-xl mt-6 leading-relaxed max-w-lg">
                Cute little chaos for the things you carry around. <br />
                Hand-drawn characters with way too many feelings.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/shop" className="btn-primary text-base px-7 py-3.5">
                  Shop All Stickers
                </Link>
                <Link to="/collections" className="btn-secondary text-base px-7 py-3.5">
                  Browse Themes
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="flex items-center gap-4 mt-10">
                <div className="flex -space-x-2">
                  {[duckImg, thinkingDuckImg, dogImg, otterImg, sleepingDuckImg, sleepyOtterImg].map((src, i) => (
                    <span key={i} className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center border-2 border-cream overflow-hidden">
                      <img src={src} alt="" className="w-6 h-6 object-contain" />
                    </span>
                  ))}
                </div>
                <p className="font-sans text-sm text-warm-gray">
                  <strong className="text-charcoal">{seriesCount} series</strong> · {stickerCount} stickers · loved by chaotic people
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── STORE ────────────────────────────────────────────── */}
      <section className="section-pad bg-parchment">
        <div className="container-max">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              tag="Personal Faves"
              title="Store"
              subtitle="The stickers I'm obsessed with right now."
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

      {/* ── SHOP BY SERIES ───────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="container-max">
          <SectionHeader
            tag="Collections"
            title="Shop by Series"
            subtitle="Every series is its own little universe of chaos and cuteness."
          />
        </div>

        {/* Marquee wrapper */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '32px', paddingBottom: '32px' }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '64px', background: 'linear-gradient(to right, #FAF8F4, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '64px', background: 'linear-gradient(to left, #FAF8F4, transparent)', zIndex: 10, pointerEvents: 'none' }} />

          {/* The animated track */}
          <div className="marquee-track">
            {[...SERIES, ...SERIES].map((series, i) => (
              <div key={`${series.id}-${i}`} style={{ width: '220px', flexShrink: 0, marginRight: '20px' }}>
                <CollectionCard series={series} delay={0} />
              </div>
            ))}
          </div>
        </div>

        <div className="container-max mt-2 flex justify-center">
          <Link to="/collections" className="btn-secondary text-sm">
            View all collections →
          </Link>
        </div>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────── */}
      <section id="how-to-order" className="section-pad bg-butter/20">
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
                bg: 'bg-butter/30',
                title: 'Add to Cart',
                desc: 'Browse the shop, pick your favourites, and add them to your cart.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                ),
              },
              {
                step: '02',
                bg: 'bg-peach-light/40',
                title: 'Fill in Your Details',
                desc: 'Enter your name, phone, email and delivery address at checkout.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                step: '03',
                bg: 'bg-sage-light/40',
                title: 'Pay via PayNow / PayLah',
                desc: "Scan the QR code and send proof of payment. We'll confirm and ship!",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <FadeUp key={step.step} delay={i * 0.1}>
                <div className={`${step.bg} rounded-3xl p-7 flex flex-col gap-4`}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-warm-gray">{step.step}</span>
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-md border border-charcoal/10 text-charcoal">
                      {step.icon}
                    </div>
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
        <img
          src={forheaderImg}
          alt=""
          className="absolute right-0 top-0 bottom-0 h-full w-auto object-contain opacity-20 select-none pointer-events-none"
        />
        <div className="container-max relative z-10">
          <div className="max-w-xl">
            <FadeUp>
              <span className="tag bg-cream/10 text-cream/70 font-mono text-xs uppercase tracking-widest mb-4 inline-block">
                My story
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
                Created with belief <br />
                <em className="italic font-normal text-peach">by StickKhoo </em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-sans text-cream/70 text-lg mt-5 leading-relaxed">
                StickKhoo started as notebook doodles and grew into expressive characters with stories. It turns small emotions and everyday moments into stickers, helping people express themselves in a simple, personal way.
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
    </div>
  )
}
