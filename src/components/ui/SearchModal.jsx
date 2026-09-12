import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCurrency } from '../../context/CurrencyContext';
import { Link } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { formatPrice } = useCurrency();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = [
    'Cashmere Coat',
    'Silk Evening Gown',
    'Bespoke Suit',
    'Tuscan Leather Bag',
    'Gold Choker',
    'Petit Peacoat'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-noir/80 backdrop-blur-md animate-fade-in flex flex-col">
      <div className="bg-alabaster-pure border-b border-sand-dark px-6 py-6 md:py-8 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-noir/40 absolute left-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, silhouettes, fabrics, or accessories..."
              className="w-full pl-8 pr-4 py-2 bg-transparent text-lg md:text-xl font-serif text-noir placeholder-noir/30 border-b border-sand-dark focus:border-noir focus:outline-none transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs uppercase tracking-wider text-noir/50 hover:text-noir px-2"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-noir/60 hover:text-noir transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="max-w-4xl mx-auto mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] uppercase tracking-luxury text-gold font-medium">
            Curated Searches:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-xs bg-sand-light hover:bg-sand text-noir/80 px-2.5 py-1 rounded-none border border-sand transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-4xl mx-auto w-full">
        {query && results.length === 0 && (
          <div className="text-center py-16 text-alabaster">
            <p className="font-serif text-2xl mb-2">No matching pieces found</p>
            <p className="text-xs uppercase tracking-luxury text-gold">
              Please refine your search or contact our atelier concierge
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-luxury text-gold mb-4">
              Atelier Results ({results.length} pieces found)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="group bg-alabaster-pure border border-sand p-3 hover:border-gold transition-all block"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-sand-light mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-luxury text-gold mb-1">
                    {product.subcategory}
                  </p>
                  <h4 className="font-serif text-base text-noir line-clamp-1 group-hover:text-gold transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm font-sans font-medium text-noir mt-1">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!query && (
          <div className="text-center py-12 text-alabaster/70">
            <p className="font-serif text-xl text-alabaster mb-1">Explore Haute Couture & Tailoring</p>
            <p className="text-xs uppercase tracking-luxury text-gold">
              Type to search by collection, fabric, or style
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

