import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { items, openCart } = useCartStore()
  const location = useLocation()

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/collections', label: 'Collections' },
    { to: '/about', label: 'About' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-soft border-b border-light-gray'
            : 'bg-transparent'
        }`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl animate-float">🌸</span>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-xl text-charcoal tracking-tight">
                  smolstuck
                </span>
                <span className="text-[10px] font-mono text-warm-gray uppercase tracking-widest hidden sm:block">
                  cute sticker shop
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-sans font-medium text-sm transition-colors duration-200 relative group ${
                      isActive ? 'text-charcoal' : 'text-warm-gray hover:text-charcoal'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-peach rounded-full transition-all duration-200 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={openCart}
                className="relative flex items-center gap-1.5 bg-charcoal text-cream rounded-full px-4 py-2 font-sans text-sm font-medium shadow-soft hover:bg-charcoal/80 transition-colors"
              >
                <span>🛍️</span>
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-peach text-charcoal text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="md:hidden flex flex-col gap-1.5 p-1"
                aria-label="Toggle menu"
              >
                <span className={`w-5 h-0.5 bg-charcoal rounded-full transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-5 h-0.5 bg-charcoal rounded-full transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`w-5 h-0.5 bg-charcoal rounded-full transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-cream/95 backdrop-blur-md border-b border-light-gray overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `font-sans font-medium text-base py-1 ${
                        isActive ? 'text-charcoal' : 'text-warm-gray'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
