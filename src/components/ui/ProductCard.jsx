import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, layout = 'standard' }) {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const isFavorite = isInWishlist(product.id);
  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors ? product.colors[selectedColorIndex].name : 'Standard';
    addToCart(product, size, color, 1);
    setShowQuickSizes(false);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand-light/50 border border-transparent group-hover:border-sand-dark/60 transition-colors">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Main image */}
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-luxury ${
              isHovered && hoverImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Secondary image for hover effect */}
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-luxury ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="bg-noir/90 text-gold text-[9px] uppercase tracking-luxury font-medium px-2 py-1 shadow-sm backdrop-blur-sm border border-gold/30">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 backdrop-blur-md ${
            isFavorite
              ? 'bg-noir text-gold shadow-lg'
              : 'bg-alabaster-pure/80 text-noir/70 hover:text-noir hover:bg-alabaster-pure shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-gold stroke-gold' : ''}`} />
        </button>

        {/* Quick Size / Add overlay at bottom */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-noir/90 backdrop-blur-md border-t border-gold/30 p-3 transition-transform duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          {!showQuickSizes ? (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickSizes(true);
                }}
                className="flex-1 bg-gold text-noir text-[10px] uppercase tracking-luxury font-semibold py-2 px-3 hover:bg-gold-light transition-colors text-center"
              >
                + Quick Add to Bag
              </button>
              <Link
                to={`/product/${product.id}`}
                className="p-2 text-alabaster/70 hover:text-gold transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-[9px] uppercase tracking-luxury text-gold mb-1.5 text-center">
                Select Your Size:
              </p>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="bg-noir-card hover:bg-gold hover:text-noir text-alabaster text-[10px] font-sans px-2.5 py-1 border border-sand-dark/40 transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meta Information */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {/* Colors & Category */}
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="uppercase tracking-luxury text-noir/50 text-[10px]">
            {product.subcategory}
          </span>

          {/* Color Dots */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColorIndex(idx);
                  }}
                  title={color.name}
                  className={`w-2.5 h-2.5 rounded-full border ${
                    selectedColorIndex === idx ? 'border-noir scale-125' : 'border-sand-dark'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-serif text-base text-noir hover:text-gold transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price Section */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-sans font-medium text-noir">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-sans text-noir/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

