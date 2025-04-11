
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NewArrivalsPage = () => {
  const { newArrivals } = useProducts();
  
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-12 bg-luxe-cream/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">New Arrivals</h1>
            <p className="text-luxe-charcoal/70 mb-6">
              Discover our latest collection of premium accessories, crafted with care and designed to elevate your style.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {newArrivals.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-luxe-charcoal/70">
                Check back soon for our latest collections.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewArrivalsPage;
