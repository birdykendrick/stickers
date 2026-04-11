import { motion } from 'framer-motion'

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  return (
    <div className="flex items-center gap-2 bg-parchment rounded-2xl p-1 w-fit">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-soft text-charcoal font-bold text-lg hover:bg-light-gray transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        −
      </motion.button>
      <span className="font-mono font-medium text-charcoal min-w-[2rem] text-center text-sm">
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-soft text-charcoal font-bold text-lg hover:bg-light-gray transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        +
      </motion.button>
    </div>
  )
}
