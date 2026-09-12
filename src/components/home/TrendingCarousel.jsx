import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import { Link } from 'react-router-dom';

export default function TrendingCarousel() {
  const scrollRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Atelier Pieces' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'accessories', label: 'Bags & Accessories' }
  ];

  const trendingProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === 'all') return p.isTrending;
    return p.isTrending && p.category === selectedFilter;
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-alabaster-pure border-b border-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-luxury text-gold font-medium block mb-2">
              Most Coveted Silhouettes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-noir">
              Trending This Season
            </h2>
          </div>

          {/* Filter Pills & Scroll Buttons */}
          <div className="flex items-center justify-between md:justify-end gap-6 flex-wrap">
            <div className="flex items-center gap-2 border border-sand p-1">
              {filterOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFilter(opt.id)}
                  className={`text-[11px] uppercase tracking-wider px-3 py-1 transition-all ${
                    selectedFilter === opt.id
                      ? 'bg-noir text-alabaster font-medium'
                      : 'text-noir/60 hover:text-noir'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 border border-sand-dark text-noir/70 hover:text-noir hover:border-noir transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 border border-sand-dark text-noir/70 hover:text-noir hover:border-noir transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory"
        >
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-noir hover:text-gold border-b border-noir hover:border-gold pb-1 transition-colors"
          >
            <span>View All Curated Pieces ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

