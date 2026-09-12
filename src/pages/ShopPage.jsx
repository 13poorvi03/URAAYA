import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid2X2, Grid3X3, X, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { useCurrency } from '../context/CurrencyContext';

export default function ShopPage() {
  const { category } = useParams();
  const { formatPrice } = useCurrency();

  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3); // 2 or 3/4
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Determine active category info
  const activeCategory = useMemo(() => {
    if (!category || category === 'all') {
      return {
        id: 'all',
        name: 'The Full Atelier Collection',
        tagline: 'Quiet Elegance Across All Garments & Objects',
        description: 'Explore our complete catalog of haute couture outerwear, bespoke tailoring, fine silk dresses, leather goods, and refined youth silhouettes.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
        subcategories: [
          'All',
          'Coats & Jackets',
          'Dresses',
          'Tailoring',
          'Knitwear',
          'Handbags',
          'Fine Jewelry',
          'Footwear',
          'Kids Outerwear',
          'Kids Knitwear'
        ]
      };
    }
    const found = CATEGORIES.find((c) => c.id === category);
    return (
      found || {
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        tagline: 'Refined Atelier Collection',
        description: 'Designed with uncompromised precision.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
        subcategories: ['All']
      }
    );
  }, [category]);

  // Subcategories available
  const subcategories = useMemo(() => {
    const subs = new Set(['All']);
    PRODUCTS.forEach((p) => {
      if (!category || category === 'all' || p.category === category) {
        subs.add(p.subcategory);
      }
    });
    return Array.from(subs);
  }, [category]);

  // Available Sizes
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '2-3Y', '4-5Y', '6-7Y', '8-9Y', 'One Size'];

  // Available Colors
  const allColors = [
    { name: 'Noir', hex: '#0B0B0B' },
    { name: 'Camel', hex: '#C2A382' },
    { name: 'Alabaster', hex: '#F9F7F2' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Navy', hex: '#18202A' },
    { name: 'Charcoal', hex: '#2B2D2F' },
    { name: 'Olive', hex: '#4B533E' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (category && category !== 'all' && product.category !== category) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'All' && product.subcategory !== selectedSubcategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors?.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [category, selectedSubcategory, maxPrice, selectedSizes, selectedColors, sortBy]);

  const toggleSize = (sz) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const toggleColor = (c) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubcategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(2000);
  };

  const hasActiveFilters =
    selectedSubcategory !== 'All' ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    maxPrice < 2000;

  return (
    <div className="min-h-screen bg-alabaster pb-24">
      {/* Editorial Category Hero */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-noir border-b border-sand">
        <img
          src={activeCategory.image}
          alt={activeCategory.name}
          className="w-full h-full object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent flex flex-col justify-end p-6 sm:p-12 max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-luxury text-gold font-mono mb-2">
            Haute Atelier Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-alabaster mb-2">
            {activeCategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-alabaster/80 max-w-xl font-light">
            {activeCategory.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Subcategory horizontal pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 border-b border-sand">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`text-xs uppercase tracking-luxury px-4 py-2 shrink-0 transition-all ${
                selectedSubcategory === sub
                  ? 'bg-noir text-alabaster font-medium'
                  : 'bg-alabaster-pure border border-sand text-noir/70 hover:text-noir hover:border-sand-dark'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex items-center justify-between py-6 border-b border-sand gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            {/* Mobile Filter trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 text-xs uppercase tracking-luxury border border-sand px-3.5 py-2 bg-alabaster-pure"
            >
              <Filter className="w-4 h-4 text-gold" />
              <span>Filter ({filteredProducts.length})</span>
            </button>

            <span className="text-xs uppercase tracking-luxury text-noir/50 hidden sm:inline">
              Showing <span className="font-semibold text-noir">{filteredProducts.length}</span> Atelier Pieces
            </span>

            {/* Active filters summary */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs uppercase tracking-wider text-gold hover:text-gold-dark underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-noir/50 uppercase tracking-luxury hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-alabaster-pure border border-sand px-3 py-2 text-xs uppercase tracking-wider text-noir focus:outline-none focus:border-noir cursor-pointer"
              >
                <option value="featured">Featured Atelier</option>
                <option value="newest">New Season In</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid density toggle */}
            <div className="hidden sm:flex items-center border border-sand">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 transition-colors ${
                  gridCols === 2 ? 'bg-noir text-alabaster' : 'text-noir/50 hover:text-noir'
                }`}
                title="Large Editorial Grid (2 columns)"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${
                  gridCols === 3 ? 'bg-noir text-alabaster' : 'text-noir/50 hover:text-noir'
                }`}
                title="Catalog Grid (3/4 columns)"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            {/* Price Filter */}
            <div className="border-b border-sand pb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs uppercase tracking-luxury font-semibold text-noir">
                  Price Limit
                </h3>
                <span className="text-xs font-mono font-medium text-gold">
                  Up to {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-noir cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-noir/40 mt-1 font-mono">
                <span>{formatPrice(100)}</span>
                <span>{formatPrice(2000)}</span>
              </div>
            </div>

            {/* Sizes Filter */}
            <div className="border-b border-sand pb-6">
              <h3 className="text-xs uppercase tracking-luxury font-semibold text-noir mb-3">
                Sizing
              </h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`text-xs px-3 py-1.5 border transition-all ${
                      selectedSizes.includes(sz)
                        ? 'border-noir bg-noir text-alabaster font-medium'
                        : 'border-sand-dark text-noir/70 hover:border-noir bg-alabaster-pure'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Filter */}
            <div className="border-b border-sand pb-6">
              <h3 className="text-xs uppercase tracking-luxury font-semibold text-noir mb-3">
                Atelier Palette
              </h3>
              <div className="space-y-2">
                {allColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className="flex items-center justify-between w-full text-xs text-noir/80 hover:text-noir py-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-sand-dark inline-block shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </div>
                    {selectedColors.includes(color.name) && (
                      <span className="text-[10px] text-gold font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Atelier Assurance Box */}
            <div className="p-4 bg-sand-light/50 border border-sand space-y-2">
              <p className="text-[10px] uppercase tracking-luxury text-gold font-medium">
                Complimentary Tailoring
              </p>
              <p className="text-xs text-noir/70 leading-relaxed">
                All URAAYA outerwear and suits qualify for complimentary bespoke alterations in our boutiques worldwide.
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-alabaster-pure border border-sand p-8">
                <p className="font-serif text-3xl text-noir mb-3">No matching pieces</p>
                <p className="text-xs uppercase tracking-luxury text-gold mb-6">
                  Try adjusting your filters or price slider
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-noir text-alabaster text-xs uppercase tracking-luxury px-6 py-3 hover:bg-gold hover:text-noir transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 sm:gap-8 ${
                  gridCols === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-noir/70 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-alabaster-pure h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-sand mb-6">
                <h3 className="font-serif text-xl text-noir">Refine Atelier Pieces</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-noir/50 hover:text-noir"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter Mobile */}
              <div className="mb-6 pb-6 border-b border-sand">
                <p className="text-xs uppercase tracking-luxury font-medium text-noir mb-2">
                  Max Price: {formatPrice(maxPrice)}
                </p>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-noir"
                />
              </div>

              {/* Sizing Filter Mobile */}
              <div className="mb-6 pb-6 border-b border-sand">
                <p className="text-xs uppercase tracking-luxury font-medium text-noir mb-3">Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`text-xs px-3 py-1 border ${
                        selectedSizes.includes(sz)
                          ? 'border-noir bg-noir text-alabaster'
                          : 'border-sand text-noir/70'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter Mobile */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-luxury font-medium text-noir mb-3">Colors</p>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`text-xs px-3 py-1 border flex items-center gap-1.5 ${
                        selectedColors.includes(color.name)
                          ? 'border-noir bg-noir text-alabaster'
                          : 'border-sand text-noir/70'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-noir text-alabaster py-3 text-xs uppercase tracking-luxury font-medium"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 text-xs uppercase tracking-luxury text-noir/60 hover:text-noir underline"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

