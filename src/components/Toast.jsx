import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Simple global toast system
let toastListeners = []
export function showToast(message, emoji = '✓') {
  toastListeners.forEach(fn => fn({ message, emoji, id: Date.now() }))
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (toast) => {
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      }, 2500)
    }
    toastListeners.push(handler)
    return () => {
      toastListeners = toastListeners.filter(fn => fn !== handler)
    }
  }, [])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="bg-charcoal text-cream px-5 py-3 rounded-full shadow-card flex items-center gap-2 font-sans text-sm font-medium whitespace-nowrap"
          >
            <span>{toast.emoji}</span>
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
