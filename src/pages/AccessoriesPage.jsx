import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Award } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

export default function AccessoriesPage() {
  const [activeSub, setActiveSub] = useState('All');
  const accessories = PRODUCTS.filter((p) => p.category === 'accessories');

  const subcategories = ['All', 'Handbags', 'Fine Jewelry', 'Eyewear', 'Footwear', 'Scarves & Belts'];

  const filtered = activeSub === 'All'
    ? accessories
    : accessories.filter((p) => p.subcategory === activeSub);

  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Editorial Accessories Hero */}
      <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden bg-noir border-b border-sand">
        <img
          src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=2000&q=90"
          alt="URAAYA Leather Goods & Fine Objects"
          className="w-full h-full object-cover object-center brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent flex flex-col justify-end p-8 sm:p-16 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-luxury text-gold font-medium">
              Florentine Leather & Haute Bijoux
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-alabaster mb-3 font-light">
            Bags & Fine Objects
          </h1>
          <p className="text-xs sm:text-sm text-alabaster/85 max-w-xl font-light leading-relaxed mb-6">
            Sculptural leather silhouettes molded from single hides of Tuscan calfskin, accompanied by 24-karat gold vermeil organic jewelry and Japanese bio-acetate optics.
          </p>
        </div>
      </div>

      {/* Craftsmanship Banner */}
      <div className="bg-sand-light/50 border-b border-sand py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <Award className="w-5 h-5 text-gold mx-auto mb-2" />
            <h4 className="text-xs uppercase tracking-luxury text-noir font-medium">
              Tuscan Vegetable Tannage
            </h4>
            <p className="text-xs text-noir/60 mt-1">
              Naturally cured with mimosa and chestnut barks for rich, living patinas.
            </p>
          </div>

          <div className="p-4">
            <Sparkles className="w-5 h-5 text-gold mx-auto mb-2" />
            <h4 className="text-xs uppercase tracking-luxury text-noir font-medium">
              24k Heavy Vermeil Plating
            </h4>
            <p className="text-xs text-noir/60 mt-1">
              Thick 2.5-micron pure gold layered over certified recycled 925 sterling silver.
            </p>
          </div>

          <div className="p-4">
            <ShieldCheck className="w-5 h-5 text-gold mx-auto mb-2" />
            <h4 className="text-xs uppercase tracking-luxury text-noir font-medium">
              Lifetime Atelier Guarantee
            </h4>
            <p className="text-xs text-noir/60 mt-1">
              Complimentary edge re-painting, hardware replating, and conditioning services.
            </p>
          </div>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 border-b border-sand">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`text-xs uppercase tracking-luxury px-5 py-2.5 transition-all ${
                activeSub === sub
                  ? 'bg-noir text-alabaster font-medium'
                  : 'bg-alabaster-pure border border-sand text-noir/70 hover:text-noir'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Leather Monogramming Service Callout */}
        <div className="mt-24 p-8 sm:p-14 bg-noir text-alabaster border border-gold/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] uppercase tracking-luxury text-gold font-medium">
              Complimentary Atelier Service
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-alabaster font-light">
              Bespoke Gold Foil Monogramming
            </h3>
            <p className="text-xs sm:text-sm text-alabaster/70 leading-relaxed font-light">
              Personalize any URAAYA handbag or small leather accessory with up to three custom initials embossed in 24k gold foil or blind debossed by our master leather guild in Florence.
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs uppercase tracking-luxury text-gold border border-gold/40 px-4 py-2">
                Available at checkout or in-boutique
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 aspect-[4/3] overflow-hidden bg-noir-card border border-noir-border">
            <img
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85"
              alt="Monogramming Craft"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

