
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';

const CollectionCard = ({ 
  title, 
  description, 
  image, 
  link 
}: { 
  title: string; 
  description: string; 
  image: string; 
  link: string;
}) => (
  <div className="relative overflow-hidden rounded-lg group hover-card-rise">
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
    <img 
      src={image} 
      alt={title} 
      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
      <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
      <p className="text-white/80 mb-4 text-sm">{description}</p>
      <Link 
        to={link} 
        className="inline-flex items-center text-luxe-gold transition-colors"
      >
        Explore Collection <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  </div>
);

const CollectionsPage = () => {
  const { featuredProducts } = useProducts();
  
  const collections = [
    {
      title: 'Gold Collection',
      description: 'Our most luxurious pieces, crafted from the finest materials with unique designs.',
      image: 'https://images.unsplash.com/photo-1611591437322-0a169a1b1889?q=80&w=1000',
      link: '/collections/gold'
    },
    {
      title: 'Silver Elegance',
      description: 'Timeless silver accessories that add subtle sophistication to any outfit.',
      image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1000',
      link: '/collections/silver'
    },
    {
      title: 'Gemstone Series',
      description: 'Vibrant, colorful pieces featuring carefully selected precious and semi-precious stones.',
      image: 'https://images.unsplash.com/photo-1599459182681-c938b7f67083?q=80&w=1000',
      link: '/collections/gemstone'
    },
    {
      title: 'Minimal',
      description: 'Simple, elegant designs for everyday wear that make a subtle statement.',
      image: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df5?q=80&w=1000',
      link: '/collections/minimal'
    }
  ];
  
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-12 bg-luxe-cream/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Collections</h1>
            <p className="text-luxe-charcoal/70">
              Explore our curated collections, each with its own unique story and design philosophy.
            </p>
          </div>
        </div>
      </section>
      
      {/* Collections Grid */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <CollectionCard 
                key={collection.title}
                title={collection.title}
                description={collection.description}
                image={collection.image}
                link={collection.link}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-luxe-cream/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Products</h2>
            <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
              Discover our most loved pieces from across our collections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;
