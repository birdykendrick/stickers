# 🌸 smolstuck — Indie Sticker Shop

A beautiful, modern sticker shop website built with **Vite + React + Tailwind CSS + Framer Motion + React Router**.

Designed for Singapore customers, with manual **PayNow / PayLah!** payment flow.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
npm run preview  # preview the production build
```

---

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CollectionCard.jsx
│   ├── SectionHeader.jsx
│   ├── QuantitySelector.jsx
│   ├── CartItem.jsx
│   ├── CartDrawer.jsx
│   ├── SearchFilterBar.jsx
│   ├── EmptyState.jsx
│   └── StickerImage.jsx
├── pages/              # Route-level pages
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── CollectionsPage.jsx
│   ├── CollectionDetailPage.jsx
│   ├── ProductPage.jsx
│   ├── CheckoutPage.jsx
│   └── AboutPage.jsx
├── layouts/
│   └── MainLayout.jsx  # Navbar + Footer + CartDrawer wrapper
├── store/
│   └── cartStore.js    # Zustand cart state (persisted to localStorage)
├── data/
│   └── products.js     # All product + series data
├── App.jsx             # Route definitions
├── main.jsx            # Entry point
└── index.css           # Tailwind base + custom utilities
```

---

## 🎨 Customisation

### Adding / editing stickers

Edit `src/data/products.js`. Each product has:

```js
{
  id: 'duck-001',
  name: 'Sleepy Duck',
  slug: 'sleepy-duck',          // used in URL
  price: 2.50,
  series: 'duck',               // must match a series id
  seriesName: 'Duck Series',
  emoji: '🦆',                  // main sticker emoji
  emojiOverlay: '💤',           // secondary emoji shown below
  description: 'Some cute text...',
  featured: true,               // shows in Best Sellers
  newArrival: false,            // shows in New Arrivals
  popular: true,                // affects sort order
  sizes: ['Small (5cm)', 'Medium (7cm)'],
  tags: ['sleepy', 'relatable'],
  color: '#FEF9E7',             // background colour for sticker card
}
```

### Replacing emoji placeholders with real images

In `src/components/StickerImage.jsx`, replace the emoji rendering with:

```jsx
<img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
```

Then add `imageUrl: '/src/assets/stickers/sleepy-duck.png'` to each product.

### Updating PayNow details

In `src/pages/CheckoutPage.jsx`, update the UEN / phone number in the `QRPlaceholder` section and replace the QR code placeholder with a real QR image.

### Brand name / colours

- Brand name: search `smolstuck` and replace globally
- Colours: edit `tailwind.config.js` under `theme.extend.colors`

---

## 🛍️ Features

- ✅ Home page with hero, featured products, collections, how-to-order
- ✅ Shop page with search, filter by series, sort
- ✅ Collections overview + individual series pages
- ✅ Product detail page with size selector, quantity, add to cart
- ✅ Slide-out cart drawer (Framer Motion)
- ✅ Manual checkout (PayNow / PayLah) with order confirmation
- ✅ About page with FAQ
- ✅ Zustand cart state, persisted to localStorage
- ✅ Fully responsive (mobile-first)
- ✅ Framer Motion animations throughout
- ✅ Google Fonts: Playfair Display + DM Sans

---

## 📦 Tech Stack

| Library | Version | Purpose |
|---|---|---|
| Vite | 5.x | Build tool |
| React | 18.x | UI framework |
| React Router | 6.x | Client-side routing |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | 11.x | Animations |
| Zustand | 4.x | Cart state management |

---

## 🇸🇬 Payment

This shop uses a **manual payment flow**:
1. Customer fills in details
2. Customer scans PayNow / PayLah QR
3. Customer sends screenshot via Instagram / Telegram
4. You confirm manually and ship

No payment gateway required. Perfect for indie shops.

---

Made with 🌸 in Singapore
