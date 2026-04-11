import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainLayout from './layouts/MainLayout'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CollectionsPage from './pages/CollectionsPage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  )
}
