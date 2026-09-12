import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CraftStory() {
  return (
    <section className="py-24 bg-sand-light/40 border-b border-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden bg-sand shadow-2xl border border-sand-dark">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
                alt="Atelier Tailoring Craftsmanship"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Overlapping Floating Inset */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 w-52 aspect-[3/4] overflow-hidden bg-noir shadow-2xl border-2 border-alabaster-pure">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85"
                alt="Leather Crafting Detail"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-luxury font-medium">
                Atelier Philosophy & Provenance
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-noir font-light leading-tight">
              Quiet Elegance Spun From Earth’s Rarest Fibers
            </h2>

            <p className="text-sm text-noir/75 leading-relaxed font-light">
              At URAAYA, we reject transient seasonal trends in pursuit of immortal silhouette architecture. Our textiles originate in the high-altitude plateaus of Mongolia for pure cashmere, the heritage mills of Biella for double-faced virgin wool, and Florence for hand-burnished vegetable-tanned leather.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-sand-dark/60">
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-noir">100%</span>
                <span className="text-[10px] uppercase tracking-luxury text-gold">
                  Traceable Fibers
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-noir">48h</span>
                <span className="text-[10px] uppercase tracking-luxury text-gold">
                  Hand Tailoring per Coat
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-noir">0%</span>
                <span className="text-[10px] uppercase tracking-luxury text-gold">
                  Synthetic Microfibers
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-noir text-alabaster text-xs uppercase tracking-luxury px-8 py-3.5 hover:bg-gold hover:text-noir transition-colors"
              >
                <span>Read The Atelier Manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

