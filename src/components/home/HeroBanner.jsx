import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Autumn / Winter Atelier',
    subtitle: 'VOL. IV — THE ARCHITECTURAL SILHOUETTE',
    description: 'Sculptural Mongolian cashmere overcoats, bias-cut heavy silk evening wear, and master Neapolitan tailoring.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90',
    primaryCta: { text: "Explore Women's Collection", link: '/category/women' },
    secondaryCta: { text: "Discover Men's Sartorial", link: '/category/men' },
    tag: 'Haute Runway 2026'
  },
  {
    id: 2,
    title: 'The Sartorial Gentleman',
    subtitle: 'PRECISION MEETS DISCRETION',
    description: 'Bespoke double-breasted flannels, West Indian Sea Island cottons, and handcrafted Tuscan calfskin footwear.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=90',
    primaryCta: { text: 'Discover Men', link: '/category/men' },
    secondaryCta: { text: 'Fine Leather Goods', link: '/accessories' },
    tag: 'Savile Row & Milano'
  },
  {
    id: 3,
    title: 'Petit URAAYA',
    subtitle: 'HEIRLOOM COUTURE FOR THE YOUNG CONNOISSEUR',
    description: 'Unrivaled gentleness in organic French linens, non-scratch virgin wools, and cloud-soft cashmere knits.',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=2000&q=90',
    primaryCta: { text: 'Explore Petit URAAYA', link: '/kids' },
    secondaryCta: { text: 'View The Lookbook', link: '/lookbook' },
    tag: 'Youth Luxury Edition'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative h-[82vh] min-h-[580px] max-h-[880px] w-full overflow-hidden bg-noir">
      {/* Background Image Carousel with cross-fade */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transition-transform duration-10000`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center brightness-[0.78]"
          />
          {/* Subtle gradient overlay for luxury contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-noir/40" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-end pb-20 sm:pb-24 z-10">
        <div className="max-w-2xl text-alabaster">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-[11px] uppercase tracking-luxury-wide text-gold font-medium">
              {slide.tag}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-xs uppercase tracking-luxury text-alabaster/80 mb-2 font-mono">
            {slide.subtitle}
          </p>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-alabaster mb-4 leading-[1.08]">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-alabaster/85 font-light leading-relaxed mb-8 max-w-xl">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to={slide.primaryCta.link}
              className="bg-alabaster text-noir hover:bg-gold hover:text-noir px-8 py-3.5 text-xs uppercase tracking-luxury font-medium transition-all text-center flex items-center justify-center gap-2 group"
            >
              <span>{slide.primaryCta.text}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to={slide.secondaryCta.link}
              className="border border-alabaster/60 hover:border-gold hover:text-gold text-alabaster px-8 py-3.5 text-xs uppercase tracking-luxury font-medium transition-all text-center backdrop-blur-sm"
            >
              {slide.secondaryCta.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Controls: Next / Prev & Slide Indicators */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all ${
                idx === currentSlide ? 'w-8 bg-gold' : 'w-3 bg-alabaster/40 hover:bg-alabaster/70'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 ml-4">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-2 text-alabaster/70 hover:text-gold transition-colors backdrop-blur-sm bg-noir/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-2 text-alabaster/70 hover:text-gold transition-colors backdrop-blur-sm bg-noir/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

