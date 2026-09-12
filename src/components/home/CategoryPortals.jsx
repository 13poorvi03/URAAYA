import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function CategoryPortals() {
  const customLinks = {
    women: '/category/women',
    men: '/category/men',
    kids: '/kids',
    accessories: '/accessories'
  };

  return (
    <section className="py-20 bg-alabaster border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-luxury text-gold font-medium mb-2">
            The Portals
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-noir">
            Select Your Atelier World
          </h2>
          <div className="w-12 h-[1.5px] bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={customLinks[cat.id] || `/category/${cat.id}`}
              className="group relative flex flex-col bg-sand-light overflow-hidden border border-sand hover:border-gold transition-all duration-500"
            >
              {/* Image with zoom */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-alabaster">
                  <span className="text-[9px] uppercase tracking-luxury text-gold font-mono mb-1">
                    Atelier Division
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-alabaster group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-alabaster/80 mt-1 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-alabaster/20 flex items-center justify-between text-[11px] uppercase tracking-luxury">
                    <span>Enter Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-gold" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

