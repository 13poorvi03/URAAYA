import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

// Layout & Global Components
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import QuickCartDrawer from './components/layout/QuickCartDrawer';
import SearchModal from './components/ui/SearchModal';
import AuthModal from './components/ui/AuthModal';
import Toast from './components/ui/Toast';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import KidsPage from './pages/KidsPage';
import AccessoriesPage from './pages/AccessoriesPage';
import LookbookPage from './pages/LookbookPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Scroll to Top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-alabaster text-noir font-sans">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Dynamic Route Outlet */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:category" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback */}
          <Route path="*" element={<ShopPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <QuickCartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CurrencyProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </CurrencyProvider>
    </Router>
  );
}

