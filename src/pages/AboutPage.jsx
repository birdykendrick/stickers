import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad bg-parchment relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-peach/20 rounded-full blur-3xl" />
        <div className="container-max max-w-3xl">
          <FadeUp>
            <span className="tag bg-peach-light text-charcoal font-mono text-xs uppercase tracking-widest mb-4 inline-block">
              Our Story
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-charcoal leading-tight">
              Made with love,
              <br />
              <em className="italic font-normal text-warm-gray">shipped with care.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-sans text-warm-gray text-xl mt-6 leading-relaxed">
              smolstuck is a small Singapore sticker shop born from notebook doodles and the firm belief that the right sticker can say what words can't.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="container-max max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <FadeUp>
              <div className="rounded-4xl bg-butter/30 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl block">🌸</span>
                  <span className="text-6xl block mt-2">✏️</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="space-y-4 font-sans text-warm-gray leading-relaxed">
                <p>
                  Hi! I'm the person behind smolstuck. I've always loved doodling — little animals with too many feelings, food with emotional baggage, characters that just <em>get it</em>.
                </p>
                <p>
                  What started as sketches in the margins of my notes became stickers I wanted to stick everywhere. My friends kept asking where to buy them. So I made a shop.
                </p>
                <p>
                  Every sticker is drawn by hand, designed with care, and printed on premium waterproof vinyl. They're made to outlast rainstorms, dishwashers, and bad days alike.
                </p>
                <p className="text-charcoal font-medium">
                  Smolstuck is for everyone who's ever felt too much and needed something cute to show for it. 🌿
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-parchment">
        <div className="container-max max-w-3xl">
          <FadeUp>
            <h2 className="font-display font-bold text-3xl text-charcoal mb-8">What we're about</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { emoji: '✏️', title: 'Original art', desc: 'Every sticker is hand-drawn. No stock art, no AI, no shortcuts.' },
              { emoji: '🌿', title: 'Small batch', desc: 'We print in small runs to keep things special and avoid waste.' },
              { emoji: '🇸🇬', title: 'Made in SG', desc: 'Designed, packed, and shipped from Singapore with love.' },
            ].map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-6 shadow-card">
                  <span className="text-4xl block mb-3">{v.emoji}</span>
                  <h3 className="font-sans font-semibold text-charcoal">{v.title}</h3>
                  <p className="font-sans text-sm text-warm-gray mt-1 leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad">
        <div className="container-max max-w-2xl">
          <FadeUp>
            <h2 className="font-display font-bold text-3xl text-charcoal mb-8">FAQ</h2>
          </FadeUp>
          <div className="space-y-4">
            {[
              {
                q: 'What are the stickers made of?',
                a: 'Premium waterproof vinyl with a glossy or matte finish. They\'re dishwasher safe, weather resistant, and built to last.',
              },
              {
                q: 'How do I pay?',
                a: 'We accept PayNow and DBS PayLah!. After checkout, scan our QR code and send us proof of payment via Instagram or Telegram.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Orders ship within 3–5 working days after payment confirmation. We ship via SingPost.',
              },
              {
                q: 'Do you ship internationally?',
                a: 'Currently Singapore only. International shipping is in the works — follow us for updates!',
              },
              {
                q: 'Can I order custom stickers?',
                a: 'We don\'t do custom orders right now, but DM us on Instagram — we love hearing ideas for new designs!',
              },
            ].map((faq, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="bg-parchment rounded-2xl p-5">
                  <h4 className="font-sans font-semibold text-charcoal text-sm">{faq.q}</h4>
                  <p className="font-sans text-warm-gray text-sm mt-2 leading-relaxed">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-charcoal text-cream">
        <div className="container-max max-w-xl text-center">
          <FadeUp>
            <span className="text-5xl block mb-4">🌸</span>
            <h2 className="font-display font-bold text-4xl">Ready to stick around?</h2>
            <p className="font-sans text-cream/70 mt-3 leading-relaxed">
              Browse the shop and find the stickers that speak your language.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <Link to="/shop" className="btn-peach">
                Shop All Stickers →
              </Link>
              <Link to="/collections" className="btn-secondary border-cream/20 text-cream hover:border-cream/40">
                Browse Series
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
