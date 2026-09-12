import React, { useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  CheckCircle2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SizeGuideModal from '../components/ui/SizeGuideModal';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  }, [id]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Magnifier Zoom State
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const imageRef = useRef(null);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    details: true,
    fabric: false,
    care: false,
    shipping: false
  });

  // Customer Reviews state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Countess Camille D.',
      date: 'September 2, 2026',
      rating: 5,
      title: 'Incomparable drape and pure cashmere density',
      content: 'The weight of the fabric is astonishing. You can immediately feel the Grade-A Mongolian cashmere quality. Beautiful tailoring that commands attention discreetly.',
      verified: true
    },
    {
      id: 2,
      author: 'Lord Julian M.',
      date: 'August 19, 2026',
      rating: 5,
      title: 'Flawless atelier finish',
      content: 'Worn to the Milan Opera. The horn buttons and lapel roll are Savile Row level. Worth every dollar.',
      verified: true
    }
  ]);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${product.images[activeImageIndex]})`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const isFavorite = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReviewAuthor && newReviewContent) {
      setReviews([
        {
          id: Date.now(),
          author: newReviewAuthor,
          date: 'Just now',
          rating: newReviewRating,
          title: 'Atelier Patron Review',
          content: newReviewContent,
          verified: true
        },
        ...reviews
      ]);
      setReviewModalOpen(false);
      setNewReviewAuthor('');
      setNewReviewContent('');
    }
  };

  // Curated Styling Recommendations
  const relatedPieces = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-alabaster pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-sand">
        <nav className="text-xs uppercase tracking-luxury text-noir/50 flex items-center gap-2">
          <Link to="/" className="hover:text-noir transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/category/${product.category}`}
            className="hover:text-noir transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-noir font-medium truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Multi-Image Gallery + Magnifier */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[700px] shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 md:w-20 md:h-28 overflow-hidden bg-sand-light border transition-all ${
                    activeImageIndex === idx ? 'border-noir ring-1 ring-noir' : 'border-sand hover:border-sand-dark'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

            {/* Main Stage with Zoom Lens */}
            <div className="relative flex-1 aspect-[3/4] bg-sand-light overflow-hidden border border-sand group">
              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full cursor-crosshair relative"
              >
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Magnifier View Box */}
                <div
                  style={zoomStyle}
                  className="absolute inset-0 pointer-events-none bg-no-repeat bg-[length:250%] transition-opacity duration-200 z-10 hidden md:block"
                />
              </div>

              {/* Lightbox full button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-2.5 bg-alabaster-pure/80 hover:bg-alabaster-pure text-noir shadow-md backdrop-blur-sm transition-all z-20"
                aria-label="Expand photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="bg-noir text-gold text-[10px] uppercase tracking-luxury px-3 py-1 border border-gold/40">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-luxury text-gold font-medium">
                  {product.subcategory}
                </span>
                <div className="flex items-center gap-1.5 text-noir/70">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold stroke-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-mono">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-noir leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price & Installment note */}
              <div className="mb-6 pb-6 border-b border-sand">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-sans font-medium text-noir">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base font-sans text-noir/40 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-noir/60 mt-1.5">
                  Or 4 interest-free payments of{' '}
                  <span className="font-semibold text-noir">
                    {formatPrice(Math.round(product.price / 4))}
                  </span>{' '}
                  with Klarna or Concierge Atelier Wire.
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="uppercase tracking-luxury text-noir font-medium">
                      Color: <span className="text-noir/60 font-normal">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === color.name
                            ? 'border-noir scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-sand-dark"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-luxury text-noir font-medium">
                    Select Size:
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-gold hover:text-gold-dark uppercase tracking-luxury text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Atelier Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 text-xs tracking-wider border transition-all text-center ${
                        selectedSize === sz
                          ? 'border-noir bg-noir text-alabaster font-semibold'
                          : 'border-sand-dark text-noir/70 hover:border-noir bg-alabaster-pure'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gold font-medium mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Only 2 pieces remaining in {selectedSize}</span>
                </p>
              </div>

              {/* Quantity & CTA buttons */}
              <div className="space-y-3 pt-4 border-t border-sand mb-8">
                <div className="flex gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-sand-dark bg-alabaster-pure px-3 py-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-noir/60 hover:text-noir px-2"
                    >
                      -
                    </button>
                    <span className="px-2 font-mono text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-noir/60 hover:text-noir px-2"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-noir hover:bg-gold hover:text-noir text-alabaster py-3.5 px-6 text-xs uppercase tracking-luxury font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Atelier Bag</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                    className={`p-3.5 border transition-all ${
                      isFavorite
                        ? 'border-gold bg-gold text-noir'
                        : 'border-sand-dark hover:border-noir text-noir bg-alabaster-pure'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-noir' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-noir/70">
                  <div className="flex items-center gap-2 bg-sand-light/60 p-2.5">
                    <Truck className="w-4 h-4 text-gold shrink-0" />
                    <span>Complimentary Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 bg-sand-light/60 p-2.5">
                    <RotateCcw className="w-4 h-4 text-gold shrink-0" />
                    <span>30-Day White-Glove Returns</span>
                  </div>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div className="border-t border-sand divide-y divide-sand">
                {/* Silhouette & Details */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('details')}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-luxury font-semibold text-noir text-left"
                  >
                    <span>Silhouette & Cut Architecture</span>
                    {openAccordions.details ? (
                      <ChevronUp className="w-4 h-4 text-gold" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gold" />
                    )}
                  </button>
                  {openAccordions.details && (
                    <div className="pt-3 text-xs text-noir/75 leading-relaxed space-y-2">
                      <p>{product.description}</p>
                      <p className="italic font-serif text-sm text-gold pt-1">
                        {product.modelInfo}
                      </p>
                    </div>
                  )}
                </div>

                {/* Fabric & Composition */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('fabric')}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-luxury font-semibold text-noir text-left"
                  >
                    <span>Fabric Composition & Provenance</span>
                    {openAccordions.fabric ? (
                      <ChevronUp className="w-4 h-4 text-gold" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gold" />
                    )}
                  </button>
                  {openAccordions.fabric && (
                    <div className="pt-3 text-xs text-noir/75 leading-relaxed space-y-2">
                      <p>
                        <span className="font-semibold text-noir">Composition:</span>{' '}
                        {product.fabric}
                      </p>
                      <p>
                        <span className="font-semibold text-noir">Sourcing Ethics:</span>{' '}
                        {product.sustainability}
                      </p>
                    </div>
                  )}
                </div>

                {/* Care & Preservation */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('care')}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-luxury font-semibold text-noir text-left"
                  >
                    <span>Care & Garment Preservation</span>
                    {openAccordions.care ? (
                      <ChevronUp className="w-4 h-4 text-gold" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gold" />
                    )}
                  </button>
                  {openAccordions.care && (
                    <div className="pt-3 text-xs text-noir/75 leading-relaxed">
                      <p>{product.care}</p>
                      <p className="mt-2 text-noir/60">
                        Complimentary cedar storage hanger and organic cotton breathable dust garment bag included with purchase.
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery & Returns */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-luxury font-semibold text-noir text-left"
                  >
                    <span>Complimentary Delivery & Bespoke Returns</span>
                    {openAccordions.shipping ? (
                      <ChevronUp className="w-4 h-4 text-gold" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gold" />
                    )}
                  </button>
                  {openAccordions.shipping && (
                    <div className="pt-3 text-xs text-noir/75 leading-relaxed space-y-1.5">
                      <p>
                        Dispatched in custom rigid gold-embossed URAAYA presentation boxes.
                      </p>
                      <p>
                        • Europe & North America: 1-2 Business Days via DHL Express
                      </p>
                      <p>
                        • Asia & Middle East: 2-3 Business Days via Priority Air
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-24 pt-12 border-t border-sand">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <p className="text-xs uppercase tracking-luxury text-gold font-medium mb-1">
                Verified Atelier Patrons
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-noir">
                Client Testimonials & Ratings
              </h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold stroke-gold" />
                  ))}
                </div>
                <span className="font-serif text-lg text-noir font-medium">
                  {product.rating} out of 5.0
                </span>
                <span className="text-xs text-noir/50">({reviews.length} total reviews)</span>
              </div>
            </div>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="bg-alabaster-pure border border-noir text-noir hover:bg-noir hover:text-alabaster px-6 py-2.5 text-xs uppercase tracking-luxury transition-all font-medium"
            >
              Write An Atelier Review
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-alabaster-pure border border-sand space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex text-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold stroke-gold" />
                    ))}
                  </div>
                  <span className="text-[11px] text-noir/40">{rev.date}</span>
                </div>
                <h4 className="font-serif text-base font-semibold text-noir">{rev.title}</h4>
                <p className="text-xs text-noir/75 leading-relaxed">{rev.content}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-gold pt-2 border-t border-sand/50">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{rev.author} (Verified Atelier Purchaser)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete The Look Section */}
        <div className="mt-24 pt-12 border-t border-sand">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-luxury text-gold font-medium mb-1">
              Curated Sartorial Pairing
            </p>
            <h3 className="font-serif text-3xl text-noir">Complete The Atelier Look</h3>
            <p className="text-xs text-noir/60 mt-1">
              Hand-selected companion pieces styled by our chief Milan atelier directors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedPieces.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-alabaster/70 hover:text-alabaster"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      {/* Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-noir/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-alabaster-pure w-full max-w-md border border-sand-dark p-6 shadow-2xl relative">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-5 right-5 text-noir/50 hover:text-noir"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl text-noir mb-1">Share Your Atelier Experience</h3>
            <p className="text-xs text-noir/60 mb-6">
              Your confidential appraisal helps discerning patrons worldwide.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                  Your Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Baroness Helene V."
                  className="w-full bg-sand-light/60 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none focus:border-noir"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                  Overall Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-gold"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newReviewRating ? 'fill-gold stroke-gold' : 'stroke-gold'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                  Appraisal Notes
                </label>
                <textarea
                  rows="4"
                  required
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="Comment on the fabric feel, drape, cut, and craftsmanship..."
                  className="w-full bg-sand-light/60 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none focus:border-noir"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-noir text-alabaster py-3 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors"
              >
                Submit Appraisal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sizing Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        initialTab={product.category === 'kids' ? 'kids' : product.category === 'men' ? 'men' : 'women'}
      />
    </div>
  );
}

