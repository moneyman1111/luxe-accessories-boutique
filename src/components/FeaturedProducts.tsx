
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { useLanguage } from '@/context/LanguageContext';

const FeaturedProducts = () => {
  const { products } = useProducts();
  const { language } = useLanguage();
  
  // Get the first 4 products to display as featured
  const featuredProducts = products.slice(0, 4);
  
  const title = language === 'en' ? 'Featured Products' : 'Рекомендуемые Товары';
  const subtitleText = language === 'en' 
    ? 'Discover our most popular and highly sought-after pieces' 
    : 'Откройте для себя наши самые популярные и востребованные изделия';
  const viewAllText = language === 'en' ? 'View All' : 'Посмотреть Все';
  
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">{title}</h2>
        <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
          {subtitleText}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="text-center">
        <Link to="/collections">
          <Button variant="outline" size="lg" className="border-luxe-charcoal text-luxe-charcoal hover:bg-luxe-cream">
            {viewAllText}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
