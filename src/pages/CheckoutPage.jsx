import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import StickerImage from '../components/StickerImage'
import paynowImg from '../assets/paynow.png'
import paylahImg from '../assets/paylah.png'

function generateRef() {
  return 'SMO-' + Date.now().toString(36).toUpperCase().slice(-6)
}

const WHATSAPP_NUMBER = '6598871258'

function buildWhatsAppMessage(form, items, orderRef, payMethod, subtotal, shipping, total) {
  const itemList = items.map(i =>
    `• ${i.product.name} (${i.size}) x${i.quantity} — $${(i.product.price * i.quantity).toFixed(2)}`
  ).join('\n')
  return encodeURIComponent(
    `Hi StickKhoo! I'd like to place an order!\n\n` +
    `Order Ref: ${orderRef}\n` +
    `Name: ${form.name}\n` +
    `Phone: ${form.phone}\n` +
    `Email: ${form.email}\n` +
    `Address: ${form.address}\n` +
    (form.notes ? `Notes: ${form.notes}\n` : '') +
    `\nItems:\n${itemList}\n\n` +
    `Subtotal: $${subtotal.toFixed(2)}\n` +
    `Shipping: ${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}\n` +
    `Total: $${total.toFixed(2)}\n` +
    `Payment: ${payMethod === 'paynow' ? 'PayNow' : 'PayLah!'}`
  )
}

function Field({ label, name, type = 'text', placeholder, textarea, value, onChange, error }) {
  return (
    <div>
      <label className="font-sans font-medium text-charcoal text-sm block mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-field resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input-field ${error ? 'border-red-300' : ''}`}
        />
      )}
      {error && (
        <p className="font-mono text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const shipping = subtotal >= 10 ? 0 : 1
  const total = subtotal + shipping

  const [step, setStep] = useState('form')
  const [payMethod, setPayMethod] = useState('paynow')
  const [orderRef] = useState(generateRef)

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', notes: '',
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

  const handleChange = (name) => (e) => setForm(f => ({ ...f, [name]: e.target.value }))

  const handleFinalise = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(form, items, orderRef, payMethod, subtotal, shipping, total)}`
    clearCart()
    window.open(url, '_blank')
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
                      <span className={`w-7 h-7 rounded-full font-mono text-xs flex items-center justify-center font-bold ${i < current ? 'bg-sage text-white' : i === current ? 'bg-charcoal text-cream' : 'bg-light-gray text-warm-gray'
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
              {/* ── STEP 1: DETAILS ── */}
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
                  <Field label="Full Name" name="name" placeholder="Chris" value={form.name} onChange={handleChange('name')} error={errors.name} />
                  <Field label="Phone Number" name="phone" type="tel" placeholder="9123 4567" value={form.phone} onChange={handleChange('phone')} error={errors.phone} />
                  <Field label="Email Address" name="email" type="email" placeholder="chris@email.com" value={form.email} onChange={handleChange('email')} error={errors.email} />
                  <Field label="Delivery Address" name="address" textarea placeholder="Blk 123 Yishun Ave 1, #05-678, Singapore 760123" value={form.address} onChange={handleChange('address')} error={errors.address} />
                  <Field label="Notes / Special Requests (Optional)" name="notes" textarea placeholder="Any special instructions? Let us know!" value={form.notes} onChange={handleChange('notes')} />
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitDetails}
                    className="btn-primary w-full justify-center text-base py-4"
                  >
                    Continue to Payment →
                  </motion.button>
                </motion.div>
              )}

              {/* ── STEP 2: PAYMENT ── */}
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
                    <button onClick={() => setStep('form')} className="text-warm-gray hover:text-charcoal transition-colors">
                      ← Back
                    </button>
                    <h2 className="font-display font-bold text-2xl text-charcoal">Payment</h2>
                  </div>

                  {/* Payment method selector */}
                  <div>
                    <p className="font-sans font-medium text-charcoal text-sm mb-3">Choose payment method</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'paynow', label: 'PayNow', desc: 'Transfer via PayNow QR Code', img: paynowImg },
                        { id: 'paylah', label: 'PayLah!', desc: 'DBS PayLah! app', img: paylahImg },
                      ].map(m => (
                        <button
                          key={m.id}
                          onClick={() => setPayMethod(m.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${payMethod === m.id ? 'border-charcoal bg-charcoal/5' : 'border-light-gray bg-white hover:border-charcoal/20'
                            }`}
                        >
                          <img src={m.img} alt={m.label} className="h-7 w-auto object-contain mb-2" />
                          <p className="font-sans font-semibold text-charcoal text-sm">{m.label}</p>
                          <p className="font-mono text-xs text-warm-gray mt-0.5">{m.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className="bg-parchment rounded-3xl p-4 space-y-3">
                    <p className="font-sans font-semibold text-charcoal text-sm">Order Summary</p>
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.key} className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                            <StickerImage product={item.product} size="sm" className="w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans font-medium text-charcoal text-xs truncate">{item.product.name}</p>
                            <p className="font-mono text-[10px] text-warm-gray">{item.size} · ×{item.quantity}</p>
                          </div>
                          <span className="font-mono text-xs text-charcoal">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-light-gray pt-2 flex justify-between font-sans font-bold text-charcoal text-sm">
                      <span>Total</span><span className="font-mono">${total.toFixed(2)}</span>
                    </div>

                    {/* Delivery details recap */}
                    <div className="border-t border-light-gray pt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                      <p className="font-sans text-xs text-warm-gray"><strong className="text-charcoal">Name:</strong> {form.name}</p>
                      <p className="font-sans text-xs text-warm-gray"><strong className="text-charcoal">Number:</strong> {form.phone}</p>
                      <p className="font-sans text-xs text-warm-gray"><strong className="text-charcoal">Email:</strong> {form.email}</p>
                      <p className="font-sans text-xs text-warm-gray"><strong className="text-charcoal">Address:</strong> {form.address}</p>
                      {form.notes && <p className="font-sans text-xs text-warm-gray col-span-2 italic">"{form.notes}"</p>}
                    </div>
                  </div>

                  {/* Finalise button */}
                  <div className="bg-parchment rounded-3xl p-4 text-center space-y-2">
                    <p className="font-sans text-xs text-warm-gray leading-relaxed">
                      Ready? Tap below and we'll receive your order details via WhatsApp. We'll confirm and get it shipped!
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFinalise}
                      className="btn-primary w-full justify-center text-base py-3"
                    >
                      I've finalised my order →
                    </motion.button>
                  </div>
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
                  <svg className="mx-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="font-sans text-warm-gray text-sm mt-2">Your cart is empty</p>
                  <Link to="/shop" className="btn-primary text-sm mt-4 inline-flex">Shop now</Link>
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
                          <p className="font-sans font-medium text-charcoal text-sm truncate">{item.product.name}</p>
                          <p className="font-mono text-xs text-warm-gray">{item.size} · ×{item.quantity}</p>
                        </div>
                        <span className="font-mono text-sm text-charcoal">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-light-gray pt-4 space-y-2">
                    <div className="flex justify-between font-sans text-sm text-warm-gray">
                      <span>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm text-warm-gray">
                      <span>Shipping</span>
                      <span className="font-mono">{shipping === 0 ? <span className="text-sage font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && <p className="font-mono text-[10px] text-warm-gray">Free shipping on orders above $10</p>}
                    <div className="flex justify-between font-sans font-bold text-charcoal text-base pt-2 border-t border-light-gray">
                      <span>Total</span><span className="font-mono">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-2xl p-3 flex items-center gap-2.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-warm-gray flex-shrink-0">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <p className="font-mono text-xs text-warm-gray">Estimated delivery: 2–4 working days</p>
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
