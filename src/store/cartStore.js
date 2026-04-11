import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Open/close cart drawer
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      // Add item to cart
      addItem: (product, size = null, quantity = 1) => {
        const items = get().items
        const key = `${product.id}-${size}`
        const existing = items.find(i => i.key === key)

        if (existing) {
          set({
            items: items.map(i =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                key,
                product,
                size: size || product.sizes?.[0] || 'Standard',
                quantity,
              },
            ],
          })
        }
      },

      // Remove item
      removeItem: (key) =>
        set((s) => ({ items: s.items.filter(i => i.key !== key) })),

      // Update quantity
      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          get().removeItem(key)
          return
        }
        set((s) => ({
          items: s.items.map(i => (i.key === key ? { ...i, quantity } : i)),
        }))
      },

      // Clear cart
      clearCart: () => set({ items: [], isOpen: false }),

      // Computed
      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
      get subtotal() {
        return get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        )
      },
    }),
    {
      name: 'smolstuck-cart',
    }
  )
)
