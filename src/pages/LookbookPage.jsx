import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { LOOKBOOK_SPREADS } from '../data/lookbook';
import { useCurrency } from '../context/CurrencyContext';

export default function LookbookPage() {
  const { formatPrice } = useCurrency();
  const [activePin, setActivePin] = useState(null); // 'spreadIndex-pinIndex'

  return (
    <div className="min-h-screen bg-noir text-alabaster pb-24 animate-fade-in">
      {/* Header */}
      <div className="py-20 text-center max-w-3xl mx-auto px-4 border-b border-noir-border">
        <div className="inline-flex items-center gap-2 text-gold mb-3">
          <BookOpen className="w-4 h-4" />
          <span className="text-xs uppercase tracking-luxury font-medium">
            Editorial Gazette • Vol. IV
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-alabaster font-light mb-4">
          The Autumn Atelier Lookbook
        </h1>
        <p className="text-xs sm:text-sm text-alabaster/70 font-light leading-relaxed max-w-xl mx-auto">
          An intimate visual exploration into volume, drape, and materiality captured across the salons of Paris, Milan, and Florence. Click the interactive hotspots to discover each curated garment.
        </p>
      </div>

      {/* Magazine Spreads */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-28">
        {LOOKBOOK_SPREADS.map((spread, sIdx) => (
          <article key={spread.id} className="space-y-6">
            {/* Spread Header Meta */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-noir-border pb-3 gap-2">
              <span className="text-xs uppercase tracking-luxury text-gold font-mono">
                {spread.issue}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-alabaster">{spread.title}</h2>
              <span className="text-xs text-alabaster/50 uppercase tracking-wider">
                {spread.season}
              </span>
            </div>

            {/* Main Spread Image with Hotspots */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-noir-card border border-noir-border shadow-2xl">
              <img
                src={spread.coverImage}
                alt={spread.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Pins */}
              {spread.hotspots.map((spot, pIdx) => {
                const pinKey = `${sIdx}-${pIdx}`;
                const isOpen = activePin === pinKey;

                return (
                  <div
                    key={pIdx}
                    className="absolute z-20"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <button
                      onClick={() => setActivePin(isOpen ? null : pinKey)}
                      className="relative p-2 focus:outline-none"
                      aria-label={`Inspect ${spot.title}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
                      <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gold text-noir font-bold text-xs shadow-xl border border-alabaster">
                        +
                      </span>
                    </button>

                    {/* Popover */}
                    {isOpen && (
                      <div className="absolute -top-24 left-8 w-60 bg-alabaster-pure text-noir p-4 shadow-2xl border border-gold/40 z-30 animate-fade-in">
                        <span className="text-[9px] uppercase tracking-luxury text-gold font-medium block">
                          {spot.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-noir mt-0.5 line-clamp-1">
                          {spot.title}
                        </h4>
                        <p className="text-xs font-sans font-bold text-noir mt-1 mb-2">
                          {formatPrice(spot.price)}
                        </p>
                        <Link
                          to={`/product/${spot.productId}`}
                          className="block bg-noir text-alabaster text-[10px] uppercase tracking-luxury py-2 text-center hover:bg-gold hover:text-noir transition-colors font-medium"
                        >
                          View In Atelier
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Editorial Quote & Notes */}
            <div className="pt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-alabaster/60">
              <p className="font-serif italic text-base sm:text-lg text-gold max-w-xl">
                "{spread.quote}"
              </p>
              <span className="text-[10px] uppercase tracking-luxury text-alabaster/40 font-mono">
                Click '+' to unveil pieces
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-28 pt-12 border-t border-noir-border">
        <p className="text-xs uppercase tracking-luxury text-gold mb-2">
          Ready to experience the collection?
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-alabaster text-noir hover:bg-gold px-8 py-3.5 text-xs uppercase tracking-luxury font-medium transition-all"
        >
          <span>Shop The Entire Runway Edit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

