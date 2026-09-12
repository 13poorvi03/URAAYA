import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import { LOOKBOOK_SPREADS } from '../../data/lookbook';
import { useCurrency } from '../../context/CurrencyContext';

export default function EditorialLookbookTeaser() {
  const spread = LOOKBOOK_SPREADS[0];
  const [activePin, setActivePin] = useState(null);
  const { formatPrice } = useCurrency();

  return (
    <section className="py-24 bg-noir text-alabaster relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold mb-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-xs uppercase tracking-luxury font-medium">
                Interactive Editorial Campaign
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-alabaster">
              {spread.title}
            </h2>
            <p className="text-sm font-serif italic text-alabaster/70 mt-2 max-w-xl">
              "{spread.quote}"
            </p>
          </div>

          <Link
            to="/lookbook"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-gold hover:text-gold-light border-b border-gold pb-1 transition-colors"
          >
            <span>Explore Complete Lookbook Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Hotspot Interactive Image Container */}
        <div className="relative aspect-[16/9] max-h-[700px] w-full overflow-hidden bg-noir-card border border-noir-border shadow-2xl">
          <img
            src={spread.coverImage}
            alt={spread.title}
            className="w-full h-full object-cover object-center brightness-[0.88]"
          />

          {/* Interactive Pins */}
          {spread.hotspots.map((spot, idx) => (
            <div
              key={idx}
              className="absolute z-20"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              {/* Pulsing Pin Button */}
              <button
                onClick={() => setActivePin(activePin === idx ? null : idx)}
                className="relative group p-2 focus:outline-none"
                aria-label={`View ${spot.title}`}
              >
                <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gold text-noir font-bold text-[10px] shadow-lg border border-alabaster">
                  +
                </span>
              </button>

              {/* Garment Popover Card */}
              {activePin === idx && (
                <div className="absolute -top-24 left-8 w-60 bg-alabaster-pure text-noir p-3.5 shadow-2xl border border-sand-dark z-30 animate-fade-in">
                  <span className="text-[9px] uppercase tracking-luxury text-gold font-medium block">
                    {spot.category}
                  </span>
                  <h4 className="font-serif text-sm font-medium text-noir mt-0.5 line-clamp-1">
                    {spot.title}
                  </h4>
                  <p className="text-xs font-sans font-semibold text-noir mt-1 mb-2">
                    {formatPrice(spot.price)}
                  </p>
                  <Link
                    to={`/product/${spot.productId}`}
                    className="block bg-noir text-alabaster text-[10px] uppercase tracking-luxury py-1.5 text-center hover:bg-gold hover:text-noir transition-colors"
                  >
                    Examine Piece
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* Bottom badge */}
          <div className="absolute bottom-6 left-6 z-10 hidden sm:block bg-noir/80 backdrop-blur-md px-4 py-2 border border-gold/30">
            <p className="text-[10px] uppercase tracking-luxury text-gold">
              Interactive Runway Hotspots
            </p>
            <p className="text-xs text-alabaster">Click '+' markers on the models to inspect individual couture pieces</p>
          </div>
        </div>
      </div>
    </section>
  );
}

