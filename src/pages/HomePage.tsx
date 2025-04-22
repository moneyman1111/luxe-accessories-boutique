import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Carousel } from '@/components/ui/carousel';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Carousel className="w-full max-w-5xl mx-auto"
        opts={{
          align: "start",
          loop: true,
          autoplay: true,
          interval: 5000, // Auto-rotate every 5 seconds
        }}
      >
        <Hero />
      </Carousel>
      
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
