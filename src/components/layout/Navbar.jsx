import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, currencies } = useCurrency();
  const { isAuthenticated, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Women', path: '/category/women' },
    { name: 'Men', path: '/category/men' },
    { name: 'Kids', path: '/kids' },
    { name: 'Bags & Accessories', path: '/accessories' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'The Atelier', path: '/about' },
    { name: 'Concierge', path: '/contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-alabaster-pure/95 backdrop-blur-md shadow-sm border-b border-sand'
          : 'bg-alabaster border-b border-sand/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-noir hover:text-gold transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.slice(0, 4).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-luxury transition-all relative py-1 ${
                    isActive
                      ? 'text-noir font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-gold'
                      : 'text-noir/70 hover:text-noir'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Center: Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-light text-noir group-hover:text-gold transition-colors duration-300">
                URAAYA
              </span>
              <span className="block text-[8px] uppercase tracking-[0.45em] text-gold/90 font-sans mt-0.5">
                Haute Couture Atelier
              </span>
            </Link>
          </div>

          {/* Right: Secondary Links & Utilities */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Editorial / Lookbook desktop link */}
            <div className="hidden xl:flex items-center gap-6">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs uppercase tracking-luxury text-noir/70 hover:text-noir transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Currency Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-xs uppercase tracking-wider text-noir/70 hover:text-noir transition-colors py-1"
                aria-label="Select currency"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-alabaster-pure border border-sand-dark shadow-xl py-1 z-50 animate-fade-in">
                  {Object.keys(currencies).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors ${
                        currency === code
                          ? 'bg-sand-light text-noir font-semibold'
                          : 'text-noir/70 hover:bg-sand-light/60'
                      }`}
                    >
                      {currencies[code].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-noir/80 hover:text-noir transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/account?tab=wishlist"
              className="p-1.5 text-noir/80 hover:text-noir relative transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-noir text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Link or Modal Trigger */}
            {isAuthenticated ? (
              <Link
                to="/account"
                className="p-1.5 text-noir/80 hover:text-noir transition-colors"
                aria-label="Atelier Account"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={openAuthModal}
                className="p-1.5 text-noir/80 hover:text-noir transition-colors"
                aria-label="Sign In"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              className="p-1.5 text-noir/80 hover:text-noir relative transition-colors group"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-noir text-alabaster text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-noir transition-colors">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-noir/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-alabaster-pure shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-r border-sand">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-sand">
                <span className="font-serif text-2xl tracking-[0.2em] text-noir">URAAYA</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-noir/60 hover:text-noir"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-sm uppercase tracking-luxury text-noir hover:text-gold transition-colors py-1.5 border-b border-sand/40"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Utilities */}
            <div className="pt-6 border-t border-sand space-y-4">
              <div className="flex items-center justify-between text-xs text-noir/70">
                <span>Select Currency</span>
                <div className="flex gap-2">
                  {Object.keys(currencies).map((code) => (
                    <button
                      key={code}
                      onClick={() => setCurrency(code)}
                      className={`px-2 py-1 text-xs border ${
                        currency === code
                          ? 'border-noir bg-noir text-alabaster'
                          : 'border-sand text-noir/60'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] uppercase tracking-luxury text-gold">
                  Concierge Salon Assistance
                </p>
                <p className="text-xs text-noir/60 mt-0.5">+33 1 42 68 80 00</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

