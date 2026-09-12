import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ANNOUNCEMENTS = [
  { text: 'Complimentary Worldwide White-Glove Delivery on orders over $300', link: '/shop' },
  { text: 'Autumn / Winter Atelier Vol. IV — Explore The Silk & Cashmere Edit', link: '/category/women' },
  { text: 'Private Salon Styling Appointments now open in Paris, Milan & New York', link: '/contact' }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);

  return (
    <div className="bg-noir text-alabaster py-2 px-4 border-b border-noir-border relative text-xs tracking-luxury uppercase z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="text-gold/70 hover:text-gold hidden sm:block transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center truncate px-2">
          <Link
            to={ANNOUNCEMENTS[currentIndex].link}
            className="inline-flex items-center gap-2 hover:text-gold transition-colors duration-300"
          >
            <Sparkles className="w-3 h-3 text-gold shrink-0 animate-pulse" />
            <span className="truncate font-light text-[10px] sm:text-xs">
              {ANNOUNCEMENTS[currentIndex].text}
            </span>
          </Link>
        </div>

        <button
          onClick={next}
          aria-label="Next announcement"
          className="text-gold/70 hover:text-gold hidden sm:block transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

