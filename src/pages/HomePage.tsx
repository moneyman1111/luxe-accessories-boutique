
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Carousel, CarouselApi } from '@/components/ui/carousel';

const HomePage = () => {
  const [api, setApi] = useState<CarouselApi>();
  
  // Auto-rotate the carousel
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Auto-rotate every 5 seconds
    
    return () => clearInterval(interval);
  }, [api]);
  
  return (
    <div className="min-h-screen">
      {/* Featured Products section now appears first */}
      <FeaturedProducts />
      
      {/* Carousel moved to the bottom of the page */}
      <div className="mt-12">
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <Hero />
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
