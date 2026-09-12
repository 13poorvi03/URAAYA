import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '../../data/products';

export default function FeaturedCollections() {
  const [col1, col2, col3] = FEATURED_COLLECTIONS;

  return (
    <section className="py-20 bg-alabaster border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-luxury text-gold font-medium mb-2">
            Curated Seasonal Editions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-noir">
            Featured Atelier Capsules
          </h2>
          <div className="w-12 h-[1.5px] bg-gold mx-auto mt-4" />
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Large Feature Card */}
          <div className="lg:col-span-7 group relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-sand-light">
            <img
              src={col1.image}
              alt={col1.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-luxury"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-[10px] uppercase tracking-luxury text-gold font-mono mb-2">
                {col1.subtitle}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-alabaster mb-3">
                {col1.title}
              </h3>
              <p className="text-xs sm:text-sm text-alabaster/80 max-w-md mb-6 leading-relaxed">
                {col1.description}
              </p>
              <div>
                <Link
                  to={col1.link}
                  className="inline-flex items-center gap-2 bg-alabaster text-noir text-xs uppercase tracking-luxury px-6 py-3 hover:bg-gold hover:text-noir transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column with Two Cards */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Card 2 */}
            <div className="group relative flex-1 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-sand-light">
              <img
                src={col2.image}
                alt={col2.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-[9px] uppercase tracking-luxury text-gold font-mono mb-1">
                  {col2.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-alabaster mb-2">
                  {col2.title}
                </h3>
                <p className="text-xs text-alabaster/75 mb-4 line-clamp-2">
                  {col2.description}
                </p>
                <div>
                  <Link
                    to={col2.link}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-alabaster hover:text-gold transition-colors"
                  >
                    <span>View Sizing & Cuts</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative flex-1 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-sand-light">
              <img
                src={col3.image}
                alt={col3.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-[9px] uppercase tracking-luxury text-gold font-mono mb-1">
                  {col3.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-alabaster mb-2">
                  {col3.title}
                </h3>
                <p className="text-xs text-alabaster/75 mb-4 line-clamp-2">
                  {col3.description}
                </p>
                <div>
                  <Link
                    to={col3.link}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-alabaster hover:text-gold transition-colors"
                  >
                    <span>Discover Leather Goods</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

