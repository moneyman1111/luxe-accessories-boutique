
import React from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const BestSellersPage = () => {
  const { featuredProducts } = useProducts();
  
  return (
    <div className="pt-20 min-h-screen">
      <div className="container px-4 mx-auto py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Best Sellers</h1>
          <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
            Our most popular accessories, loved by customers around the world. These timeless pieces 
            are carefully crafted with the finest materials for exceptional quality and style.
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty Message (if needed) */}
        {featuredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-luxe-charcoal/70">No best sellers available at the moment. Check back soon!</p>
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

export default BestSellersPage;
