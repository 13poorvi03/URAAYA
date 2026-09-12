import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Feather, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

export default function KidsPage() {
  const kidsProducts = PRODUCTS.filter((p) => p.category === 'kids');

  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Editorial Kids Hero */}
      <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden bg-sand-dark/20 border-b border-sand">
        <img
          src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=2000&q=90"
          alt="Petit URAAYA Children Couture"
          className="w-full h-full object-cover object-center brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent flex flex-col justify-end p-8 sm:p-16 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-luxury text-gold font-medium">
              Youth Haute Capsule
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-alabaster mb-3 font-light">
            Petit URAAYA
          </h1>
          <p className="text-xs sm:text-sm text-alabaster/85 max-w-lg font-light leading-relaxed mb-6">
            Playful innocence meets timeless European craftsmanship. Heirloom cashmere cardigans, miniature peacoats, and gentle organic French linens designed to pass through generations.
          </p>
          <div>
            <a
              href="#collection"
              className="inline-flex items-center gap-2 bg-alabaster text-noir text-xs uppercase tracking-luxury px-6 py-3 hover:bg-gold transition-colors font-medium"
            >
              <span>Explore The Youth Edit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Gentle Luxury Pillars */}
      <div className="bg-sand-light/50 border-b border-sand py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Feather className="w-6 h-6 text-gold mb-3" />
              <h3 className="text-xs uppercase tracking-luxury font-medium text-noir mb-1">
                Cloud-Soft Cashmere & Cottons
              </h3>
              <p className="text-xs text-noir/60 max-w-xs leading-relaxed">
                Zero scratch fibers. Every seam is flat-stitched to ensure absolute comfort on delicate child skin.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-gold mb-3" />
              <h3 className="text-xs uppercase tracking-luxury font-medium text-noir mb-1">
                OEKO-TEX Non-Toxic Botanicals
              </h3>
              <p className="text-xs text-noir/60 max-w-xs leading-relaxed">
                Dyed solely with plant-derived, certified allergen-free natural pigments.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-gold mb-3" />
              <h3 className="text-xs uppercase tracking-luxury font-medium text-noir mb-1">
                Heirloom Longevity
              </h3>
              <p className="text-xs text-noir/60 max-w-xs leading-relaxed">
                Generous fold-over hems and internal waistband adjusters made to expand with their growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Grid */}
      <div id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-luxury text-gold font-medium mb-1">
            Petit Silhouettes (Ages 2Y – 12Y)
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-noir">
            The Autumn Youth Collection
          </h2>
          <div className="w-12 h-[1.5px] bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kidsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-20 p-8 sm:p-12 bg-alabaster-pure border border-sand grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-gold font-medium">
              Bespoke Children's Packaging
            </span>
            <h3 className="font-serif text-3xl text-noir mt-1 mb-3">
              Gifting The Next Generation
            </h3>
            <p className="text-xs text-noir/70 leading-relaxed font-light mb-6">
              All Petit URAAYA orders are wrapped in unbleached tissue, accompanied by an embroidered linen heirloom keepsake sachet scented with organic Provence lavender.
            </p>
            <Link
              to="/category/all"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-noir hover:text-gold border-b border-noir pb-1 transition-colors"
            >
              <span>Explore All Family Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-sand-light">
            <img
              src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1000&q=85"
              alt="Petit URAAYA Knitwear Detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

