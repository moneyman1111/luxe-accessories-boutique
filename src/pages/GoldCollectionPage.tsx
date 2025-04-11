
import React from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GoldCollectionPage = () => {
  const { products } = useProducts();
  
  // Filter products that are part of the gold collection
  // For demo purposes, we'll just use the first 8 products
  const goldProducts = products.slice(0, 8);
  
  return (
    <div className="pt-20 min-h-screen">
      <div className="container px-4 mx-auto py-12">
        {/* Page Header */}
        <div className="relative">
          <div className="absolute top-0 left-0">
            <Button
              asChild
              variant="ghost"
              className="flex items-center text-luxe-charcoal hover:text-luxe-gold"
            >
              <Link to="/collections">
                <ArrowLeft size={16} className="mr-2" /> Back to Collections
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-12 mt-10">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">The Gold Collection</h1>
          <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
            Our most luxurious pieces, crafted from the finest materials. This exclusive 
            collection features unique designs that make a statement.
          </p>
        </div>
        
        {/* Feature Image */}
        <div className="relative rounded-lg overflow-hidden mb-16">
          <img 
            src="https://images.unsplash.com/photo-1611591437322-0a169a1b1889?q=80&w=1000"
            alt="Gold Collection" 
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-serif mb-2">Pure Elegance</h2>
            <p className="max-w-lg">
              Indulge in the timeless allure of our gold collection, where each piece tells a story of craftsmanship and luxury.
            </p>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {goldProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty Message (if needed) */}
        {goldProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-luxe-charcoal/70">No products available in this collection at the moment. Check back soon!</p>
            <Button 
              className="mt-4 bg-luxe-charcoal hover:bg-luxe-black text-white"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoldCollectionPage;
