import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import StickerImage from '../components/StickerImage'

// Generate a simple order reference
function generateRef() {
  return 'SMO-' + Date.now().toString(36).toUpperCase().slice(-6)
}

// Simple QR code placeholder
function QRPlaceholder({ label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-32 h-32 bg-white rounded-2xl border-2 border-dashed border-light-gray flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl">📱</span>
          <p className="font-mono text-[9px] text-warm-gray mt-1">QR Code</p>
        </div>
      </div>
      <p className="font-mono text-xs text-charcoal font-medium">{label}</p>
    </div>
  )
}

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const shipping = subtotal >= 15 ? 0 : 3
  const total = subtotal + shipping

  const [step, setStep] = useState('form') // 'form' | 'payment' | 'confirm'
  const [payMethod, setPayMethod] = useState('paynow')
  const [orderRef] = useState(generateRef)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (!form.address.trim()) e.address = 'Delivery address is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmitDetails = () => {
    if (validate()) setStep('payment')
  }

  const handlePlaceOrder = () => {
    setStep('confirm')
    clearCart()
  }

  const Field = ({ label, name, type = 'text', placeholder, textarea }) => (
    <div>
      <label className="font-sans font-medium text-charcoal text-sm block mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="input-field resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className={`input-field ${errors[name] ? 'border-red-300' : ''}`}
        />
      )}
      {errors[name] && (
        <p className="font-mono text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  )

  // ── CONFIRMATION SCREEN ────────────────────────────────────
  if (step === 'confirm') {
    return (
      <div className="section-pad">
        <div className="container-max max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <span className="text-7xl block mb-6">🎉</span>
            <h1 className="font-display font-bold text-4xl text-charcoal">Order placed!</h1>
            <p className="font-sans text-warm-gray mt-3 leading-relaxed">
              We've received your order. Please complete your payment to confirm it.
            </p>

            <div className="bg-parchment rounded-3xl p-6 mt-8 text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm text-warm-gray">Order reference</span>
                <span className="font-mono font-bold text-charcoal">{orderRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm text-warm-gray">Total</span>
                <span className="font-mono font-bold text-charcoal">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm text-warm-gray">Payment</span>
                <span className="font-mono text-sm text-charcoal capitalize">{payMethod}</span>
              </div>
            </div>

            <div className="bg-butter/30 rounded-3xl p-6 mt-5 text-left">
              <h3 className="font-sans font-semibold text-charcoal mb-3">Next steps</h3>
              <ol className="space-y-2">
                {[
                  `Send $${total.toFixed(2)} via ${payMethod === 'paynow' ? 'PayNow' : 'PayLah!'}`,
                  `Screenshot your payment receipt`,
                  `DM us on Instagram or Telegram with your receipt + order ref: ${orderRef}`,
                  `We'll confirm and ship within 3–5 working days 🚀`,
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-warm-gray">
                    <span className="font-mono text-xs bg-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-charcoal">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/shop" className="btn-primary flex-1 justify-center">
                Shop more stickers
              </Link>
              <Link to="/" className="btn-secondary flex-1 justify-center">
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-pad">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
          {/* Left: Form / Payment */}
          <div>
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-8">
              {['Details', 'Payment'].map((s, i) => {
                const current = step === 'form' ? 0 : 1
                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 ${i <= current ? 'text-charcoal' : 'text-warm-gray'}`}>
                      <span className={`w-7 h-7 rounded-full font-mono text-xs flex items-center justify-center font-bold ${
                        i < current ? 'bg-sage text-white' : i === current ? 'bg-charcoal text-cream' : 'bg-light-gray text-warm-gray'
                      }`}>
                        {i < current ? '✓' : i + 1}
                      </span>
                      <span className="font-sans font-medium text-sm">{s}</span>
                    </div>
                    {i < 1 && <div className={`h-px w-8 ${current > i ? 'bg-charcoal' : 'bg-light-gray'}`} />}
                  </div>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <h2 className="font-display font-bold text-2xl text-charcoal">Your Details</h2>

                  <Field label="Full Name" name="name" placeholder="Jane Tan" />
                  <Field label="Phone Number" name="phone" type="tel" placeholder="+65 9123 4567" />
                  <Field label="Email Address" name="email" type="email" placeholder="jane@email.com" />
                  <Field
                    label="Delivery Address"
                    name="address"
                    textarea
                    placeholder="Blk 123 Yishun Ave 1, #05-678, Singapore 760123"
                  />
                  <Field
                    label="Notes / Special Requests (Optional)"
                    name="notes"
                    textarea
                    placeholder="Any special instructions? Let us know!"
                  />

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitDetails}
                    className="btn-primary w-full justify-center text-base py-4"
                  >
                    Continue to Payment →
                  </motion.button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setStep('form')}
                      className="text-warm-gray hover:text-charcoal transition-colors"
                    >
                      ← Back
                    </button>
                    <h2 className="font-display font-bold text-2xl text-charcoal">Payment</h2>
                  </div>

                  {/* Payment method selector */}
                  <div>
                    <p className="font-sans font-medium text-charcoal text-sm mb-3">Choose payment method</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'paynow', label: 'PayNow', emoji: '🏦', desc: 'Transfer via PayNow UEN' },
                        { id: 'paylah', label: 'PayLah!', emoji: '📲', desc: 'DBS PayLah! app' },
                      ].map(m => (
                        <button
                          key={m.id}
                          onClick={() => setPayMethod(m.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            payMethod === m.id
                              ? 'border-charcoal bg-charcoal/5'
                              : 'border-light-gray bg-white hover:border-charcoal/20'
                          }`}
                        >
                          <span className="text-2xl block mb-2">{m.emoji}</span>
                          <p className="font-sans font-semibold text-charcoal text-sm">{m.label}</p>
                          <p className="font-mono text-xs text-warm-gray mt-0.5">{m.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QR code area */}
                  <div className="bg-parchment rounded-3xl p-6">
                    <p className="font-sans font-semibold text-charcoal text-sm mb-4">
                      Scan to pay ${total.toFixed(2)}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <QRPlaceholder label={payMethod === 'paynow' ? 'PayNow QR' : 'PayLah! QR'} />
                      <div className="space-y-3 text-sm text-warm-gray font-sans flex-1">
                        <p>
                          <strong className="text-charcoal">UEN / Number:</strong><br />
                          {payMethod === 'paynow' ? '12345678A (smolstuck)' : '91234567 (Jane S.)'}
                        </p>
                        <p>
                          <strong className="text-charcoal">Amount:</strong><br />
                          ${total.toFixed(2)} SGD
                        </p>
                        <p>
                          <strong className="text-charcoal">Reference:</strong><br />
                          <span className="font-mono text-charcoal">{orderRef}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 bg-butter/40 rounded-2xl p-4 font-sans text-sm text-charcoal">
                      <strong>After paying:</strong> Screenshot your receipt and DM us on{' '}
                      <strong>Instagram</strong> or <strong>Telegram</strong> with your order reference{' '}
                      <span className="font-mono">{orderRef}</span>.
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    className="btn-primary w-full justify-center text-base py-4"
                  >
                    ✓ I've sent payment — Place Order
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order summary */}
          <div>
            <div className="bg-parchment rounded-3xl p-6 sticky top-24">
              <h3 className="font-display font-bold text-xl text-charcoal mb-5">Order Summary</h3>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl">🛍️</span>
                  <p className="font-sans text-warm-gray text-sm mt-2">Your cart is empty</p>
                  <Link to="/shop" className="btn-primary text-sm mt-4 inline-flex">
                    Shop now
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-5">
                    {items.map(item => (
                      <div key={item.key} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <StickerImage product={item.product} size="sm" className="w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans font-medium text-charcoal text-sm truncate">
                            {item.product.name}
                          </p>
                          <p className="font-mono text-xs text-warm-gray">
                            {item.size} · ×{item.quantity}
                          </p>
                        </div>
                        <span className="font-mono text-sm text-charcoal">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-light-gray pt-4 space-y-2">
                    <div className="flex justify-between font-sans text-sm text-warm-gray">
                      <span>Subtotal</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm text-warm-gray">
                      <span>Shipping</span>
                      <span className="font-mono">
                        {shipping === 0 ? (
                          <span className="text-sage font-medium">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="font-mono text-[10px] text-warm-gray">
                        Free shipping on orders over $15
                      </p>
                    )}
                    <div className="flex justify-between font-sans font-bold text-charcoal text-base pt-2 border-t border-light-gray">
                      <span>Total</span>
                      <span className="font-mono">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 bg-white rounded-2xl p-3 flex items-center gap-2">
                    <span className="text-xl">📦</span>
                    <p className="font-mono text-xs text-warm-gray">
                      Estimated delivery: 3–5 working days
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
