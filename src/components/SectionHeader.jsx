import { motion } from 'framer-motion'

export default function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${center ? 'text-center' : ''}`}
    >
      {tag && (
        <span className="tag bg-peach-light text-charcoal mb-3 inline-block font-mono text-xs uppercase tracking-widest">
          {tag}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal leading-tight">
        {title}
      </h2>
      {subtitle && (
  <p
    className={`font-sans text-warm-gray mt-3 text-base md:text-lg max-w-xl leading-relaxed ${
      center ? 'mx-auto' : ''
    }`}
  >
    {subtitle}
  </p>
)}
    </motion.div>
  )
}
