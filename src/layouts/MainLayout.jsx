import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
