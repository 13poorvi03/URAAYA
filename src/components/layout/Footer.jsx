import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Welcome to the URAAYA Atelier Private Salon');
      setEmail('');
    }
  };

  return (
    <footer className="bg-noir text-alabaster border-t border-noir-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-14 border-b border-noir-border/80 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <h4 className="text-xs uppercase tracking-luxury font-medium text-alabaster">
              Bespoke Craftsmanship
            </h4>
            <p className="text-xs text-alabaster/60 leading-relaxed">
              Every garment is hand-finished in Italian & French heritage ateliers with uncompromised precision.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <h4 className="text-xs uppercase tracking-luxury font-medium text-alabaster">
              Complimentary Global Delivery
            </h4>
            <p className="text-xs text-alabaster/60 leading-relaxed">
              White-glove climate-conscious courier delivery on all orders over $300 with signature packaging.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <Award className="w-5 h-5 text-gold" />
            <h4 className="text-xs uppercase tracking-luxury font-medium text-alabaster">
              Private Concierge 24/7
            </h4>
            <p className="text-xs text-alabaster/60 leading-relaxed">
              Direct access to dedicated personal stylists and boutique appointments across the globe.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <h4 className="text-xs uppercase tracking-luxury font-medium text-alabaster">
              Effortless Returns
            </h4>
            <p className="text-xs text-alabaster/60 leading-relaxed">
              30-day complimentary collection directly from your home or suite worldwide.
            </p>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-alabaster">URAAYA</span>
              <span className="block text-[8px] uppercase tracking-[0.45em] text-gold mt-1">
                Haute Couture Atelier
              </span>
            </Link>
            <p className="text-xs text-alabaster/65 leading-relaxed max-w-sm">
              Sculptural tailoring and fluid silhouettes inspired by timeless European aesthetics. Defining modern luxury through quiet distinction and uncompromising material purity.
            </p>
            <div className="pt-2 text-xs text-alabaster/50 space-y-1">
              <p>Place Vendôme • Milan • Madison Avenue • Mayfair • Ginza</p>
              <p>Private Salon: concierge@haute-uraaya.com</p>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-luxury text-gold font-medium mb-4">
              The Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-alabaster/70">
              <li>
                <Link to="/category/women" className="hover:text-gold transition-colors">
                  Women Haute Couture
                </Link>
              </li>
              <li>
                <Link to="/category/men" className="hover:text-gold transition-colors">
                  Men Tailoring & Suits
                </Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-gold transition-colors">
                  Petit URAAYA (Kids)
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-gold transition-colors">
                  Bags & Fine Leather
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="hover:text-gold transition-colors">
                  Seasonal Lookbook
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors">
                  All New In
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-luxury text-gold font-medium mb-4">
              Client Privilège
            </h4>
            <ul className="space-y-2.5 text-xs text-alabaster/70">
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Styling Appointments
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  Atelier Heritage & Craft
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-gold transition-colors">
                  Black Card VIP Status
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Flagship Boutique Locator
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gold transition-colors">
                  Bag & Gift Packaging
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-luxury text-gold font-medium">
              The Atelier Salon Gazette
            </h4>
            <p className="text-xs text-alabaster/70 leading-relaxed">
              Receive private invitations to seasonal salons, runway livestreams, and rare archival releases.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-noir-card border border-gold/40 text-gold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>You have been registered for URAAYA Salon notices.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your confidential email..."
                    className="flex-1 bg-noir-card border border-noir-border px-4 py-2.5 text-xs text-alabaster placeholder-alabaster/30 focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-light text-noir px-5 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-alabaster/40">
                  By joining, you agree to our confidential Atelier Privacy Charter.
                </p>
              </form>
            )}

            {/* Social Media links */}
            <div className="pt-2 flex items-center gap-6 text-xs text-alabaster/60 uppercase tracking-luxury">
              <a href="#instagram" className="hover:text-gold transition-colors">
                Instagram
              </a>
              <a href="#vogue" className="hover:text-gold transition-colors">
                Vogue Runways
              </a>
              <a href="#pinterest" className="hover:text-gold transition-colors">
                Pinterest
              </a>
              <a href="#spotify" className="hover:text-gold transition-colors">
                Atelier Radio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="border-t border-noir-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-alabaster/40">
          <p>© {new Date().getFullYear()} URAAYA ATELIER & CO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>PARIS</span>
            <span>•</span>
            <span>MILANO</span>
            <span>•</span>
            <span>NEW YORK</span>
            <span>•</span>
            <span>LONDON</span>
            <span>•</span>
            <span>TOKYO</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider text-gold/80">
              SECURE ATELIER GATEWAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

