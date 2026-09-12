import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedCollections from '../components/home/FeaturedCollections';
import CategoryPortals from '../components/home/CategoryPortals';
import TrendingCarousel from '../components/home/TrendingCarousel';
import EditorialLookbookTeaser from '../components/home/EditorialLookbookTeaser';
import CraftStory from '../components/home/CraftStory';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroBanner />
      <FeaturedCollections />
      <CategoryPortals />
      <TrendingCarousel />
      <EditorialLookbookTeaser />
      <CraftStory />
    </div>
  );
}

