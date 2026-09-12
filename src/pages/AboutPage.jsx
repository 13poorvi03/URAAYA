import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Feather, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Brand Hero */}
      <div className="relative h-[70vh] min-h-[550px] w-full overflow-hidden bg-noir border-b border-sand">
        <img
          src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=2000&q=90"
          alt="URAAYA Atelier Master Cutter"
          className="w-full h-full object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent flex flex-col justify-end p-8 sm:p-20 max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-mono mb-2">
            The Atelier Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-alabaster font-light max-w-2xl leading-tight mb-4">
            The Immortality of Modern Sculptural Tailoring
          </h1>
          <p className="text-xs sm:text-sm text-alabaster/80 max-w-xl font-light leading-relaxed">
            Founded with an uncompromising devotion to materiality, URAAYA exists at the intersection of classical European haute couture and contemporary architectural minimalism.
          </p>
        </div>
      </div>

      {/* Manifesto Statement */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="w-12 h-[1px] bg-gold inline-block mb-6" />
        <p className="font-serif italic text-2xl sm:text-4xl text-noir font-light leading-relaxed">
          "We do not design for the season; we construct for eternity. True luxury does not shout—it is felt in the density of Grade-A cashmere, the roll of a soft lapel, and the quiet dignity of a silhouette that outlasts decades."
        </p>
        <span className="block text-xs uppercase tracking-luxury text-gold font-medium mt-6">
          — Atelier Director & Master Tailor
        </span>
      </div>

      {/* Sourcing & Provenance Grid */}
      <div className="bg-alabaster-pure border-y border-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-luxury text-gold font-medium">
              Geographic Provenance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-noir mt-1">
              Where Our Masterpieces Are Born
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-sand-light/40 border border-sand space-y-4">
              <span className="font-serif text-2xl text-gold font-light">01. Biella, Italy</span>
              <h3 className="font-serif text-xl text-noir">Double-Faced Virgin Wool</h3>
              <p className="text-xs text-noir/70 leading-relaxed font-light">
                Woven in family-owned mills utilizing pure glacial alpine water to wash raw fibers without synthetic silicones, preserving the natural moisture and resilient spring of the wool.
              </p>
            </div>

            <div className="p-8 bg-sand-light/40 border border-sand space-y-4">
              <span className="font-serif text-2xl text-gold font-light">02. Alashan, Mongolia</span>
              <h3 className="font-serif text-xl text-noir">Grade-A Fine Cashmere</h3>
              <p className="text-xs text-noir/70 leading-relaxed font-light">
                Hand-combed each spring during natural molting. Only white fibers under 15 microns in diameter and 38mm in staple length are selected for URAAYA outerwear.
              </p>
            </div>

            <div className="p-8 bg-sand-light/40 border border-sand space-y-4">
              <span className="font-serif text-2xl text-gold font-light">03. Santa Croce, Tuscany</span>
              <h3 className="font-serif text-xl text-noir">Full-Grain Saddle Leather</h3>
              <p className="text-xs text-noir/70 leading-relaxed font-light">
                Vegetable-tanned with mimosa bark extracts for 60 days in wooden drums. Cut and edge-burnished by multi-generational Florentine leather masters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Story Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-luxury font-medium">
                The Architecture of Drape
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-noir leading-tight font-light">
              48 Hours of Manual Precision in Every Overcoat
            </h2>
            <p className="text-xs sm:text-sm text-noir/75 leading-relaxed font-light">
              From hand-padded chest canvases crafted from natural horsehair to hand-sewn Milanese buttonholes that take two hours apiece, our garments respect the heritage of Savile Row and Neapolitan tailoring while embracing contemporary feminine and masculine ease.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-noir text-alabaster px-8 py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors"
              >
                <span>Discover The Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[4/5] overflow-hidden bg-sand shadow-2xl border border-sand-dark">
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85"
              alt="Tailoring Heritage"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

