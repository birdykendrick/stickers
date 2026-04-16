import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import sunglassDuckImg from '../assets/sunglassduck.png'
import aboutMePhoto from '../assets/aboutmephoto.png'

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
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="container-max max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <FadeUp>
              <div className="rounded-4xl overflow-hidden">
                <img src={aboutMePhoto} alt="About me" className="w-full h-auto object-contain" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="space-y-4 font-sans text-warm-gray leading-relaxed">
                <p>
                  Hi! I’m the person behind StickKhoo. I’ve always loved drawing cute little characters, especially animals with their own tiny emotions and personalities.
                </p>
                <p>
                  StickKhoo started as notebook doodles and slowly grew into expressive little characters with stories of their own. What began as small sketches became stickers that capture everyday feelings in a fun, simple, and personal way.
                </p>
                <p>
                  I wanted to create designs that feel soft, playful, and easy to connect with little stickers that can brighten someone’s day or say something words sometimes can’t.
                </p>
                <p className="text-charcoal font-medium">
                  Every sticker is made with love, imagination, and a lot of heart. ♡
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-parchment">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {[
            {
              title: 'Original art',
              desc: 'Every sticker is hand-drawn. No stock art, no AI, no shortcuts.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              ),
            },
            {
              title: 'Small batch',
              desc: 'We print in small runs to keep things special and avoid waste.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              ),
            },
            {
              title: 'Made in SG',
              desc: 'Designed, packed, and shipped from Singapore with love.',
              icon: <span className="text-2xl">🇸🇬</span>,
            },
          ].map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.1}>
              <div className="bg-white rounded-3xl p-6 shadow-card h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-parchment flex items-center justify-center text-charcoal flex-shrink-0">
                    {v.icon}
                  </div>
                  <h3 className="font-sans font-semibold text-charcoal">{v.title}</h3>
                </div>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
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
                a: 'We accept PayNow and DBS PayLah!. After checkout, scan our QR code and send us proof of payment via WhatsApp.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Orders ship within 3–5 working days after payment confirmation. We ship via SingPost.',
              },
              {
                q: 'Do you ship internationally?',
                a: 'Currently Singapore only. International shipping is in the works.',
              },
              {
                q: 'Can I order custom stickers?',
                a: 'Yes! We do custom sticker orders. Pricing depends on the design, size, quantity, and other details. DM us on WhatsApp and we’ll work something out with you.',
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
            <img src={sunglassDuckImg} alt="" className="w-20 h-20 object-contain mx-auto mb-4" />
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
