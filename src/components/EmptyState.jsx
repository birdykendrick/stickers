import { motion } from 'framer-motion'

export default function EmptyState({ emoji = '🌿', title, subtitle, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <span className="text-6xl mb-5">{emoji}</span>
      <h3 className="font-display font-bold text-2xl text-charcoal">{title}</h3>
      {subtitle && (
        <p className="font-sans text-warm-gray text-sm mt-2 max-w-xs leading-relaxed">{subtitle}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}
