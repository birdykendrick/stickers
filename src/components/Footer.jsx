import { Link } from 'react-router-dom'
import { SERIES } from '../data/products'

export default function Footer() {
  return (
    <footer className="bg-parchment border-t border-light-gray mt-auto">
      <div className="container-max section-pad">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-bold text-2xl text-charcoal">StickKhoo</span>
            </div>
            <p className="font-sans text-warm-gray text-sm leading-relaxed max-w-xs">
              Tiny stickers for big feelings. Hand-drawn with love, shipped with care, from Singapore to you.
            </p>
            <a
              href="https://www.instagram.com/stick.khoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 font-sans text-sm text-warm-gray hover:text-charcoal transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              @stick.khoo
            </a>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans font-semibold text-charcoal text-sm mb-4 uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2">
              {SERIES.map(s => (
                <li key={s.id}>
                  <Link
                    to={`/collections/${s.slug}`}
                    className="font-sans text-sm text-warm-gray hover:text-charcoal transition-colors flex items-center gap-2"
                  >
                    {s.coverImage ? (
                      <img src={s.coverImage} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
                    ) : (
                      <span>{s.emoji}</span>
                    )}
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-sans font-semibold text-charcoal text-sm mb-4 uppercase tracking-wider">Info</h4>
            <ul className="space-y-2">
              {[
                { label: 'How to Order', to: '/#how-to-order' },
                { label: 'About', to: '/about' },
                { label: 'FAQ', to: '/about#faq' },
                { label: 'Shop All', to: '/shop' },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-sans text-sm text-warm-gray hover:text-charcoal transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-light-gray flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-warm-gray">
            © 2026 StickKhoo · Made in Singapore
          </p>
          <p className="font-mono text-xs text-warm-gray">
            Payment via PayNow · PayLah!
          </p>
        </div>
      </div>
    </footer>
  )
}
