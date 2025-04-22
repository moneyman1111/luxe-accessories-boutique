import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const CategoryCard = ({ category, image, link }: { category: string; image: string; link: string }) => (
  <Link 
    to={link} 
    className="group relative overflow-hidden rounded-lg aspect-square hover-card-rise"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
    <img 
      src={image} 
      alt={category} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex items-end">
      <div>
        <h3 className="text-2xl font-serif text-white mb-2">{category}</h3>
        <span className="inline-flex items-center text-white/90 group-hover:text-luxe-gold transition-colors">
          Shop Now <ArrowRight size={16} className="ml-2" />
        </span>
      </div>
    </div>
  </Link>
);

const FeatureBox = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="p-6 bg-white rounded-lg product-card-shadow">
    <div className="flex items-center justify-center bg-luxe-cream w-12 h-12 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-luxe-charcoal/70 text-sm">{description}</p>
  </div>
);

const HomePage = () => {
  const { featuredProducts, newArrivals } = useProducts();
  const { t } = useTranslation();
  
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1500",
      title: t('hero.title'),
      subtitle: t('hero.subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1611591437322-0a169a1b1889?q=80&w=1500",
      title: t('new.arrivals'),
      subtitle: t('hero.subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1500",
      title: t('shop.collection'),
      subtitle: t('hero.subtitle')
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section with Carousel */}
      <section className="relative h-[90vh]">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative h-[90vh]">
                <div className="absolute inset-0">
                  <img 
                    src={slide.image}
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                </div>
                
                <div className="container px-4 mx-auto relative z-10 h-full flex items-center">
                  <div className="max-w-xl animate-slide-in">
                    <h5 className="text-luxe-gold uppercase tracking-wider mb-3">
                      Elegance Redefined
                    </h5>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-white/85 text-lg mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-luxe-gold hover:bg-luxe-gold/90 text-white rounded-full"
                      >
                        <Link to="/category/necklaces">
                          {t('shop.collection')}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-luxe-charcoal rounded-full"
                      >
                        <Link to="/about">
                          {t('our.story')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-luxe-cream/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Shop by Category</h2>
            <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
              Browse our carefully curated collections to find the perfect accessory
              to complement your style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              category="Necklaces" 
              image="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800" 
              link="/category/necklaces" 
            />
            <CategoryCard 
              category="Earrings" 
              image="https://images.unsplash.com/photo-1630018548696-e1900d9d1d84?q=80&w=800" 
              link="/category/earrings" 
            />
            <CategoryCard 
              category="Bracelets" 
              image="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800" 
              link="/category/bracelets" 
            />
            <CategoryCard 
              category="Rings" 
              image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800" 
              link="/category/rings" 
            />
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h5 className="text-luxe-gold uppercase tracking-wider mb-3">Just Arrived</h5>
              <h2 className="text-3xl md:text-4xl font-serif">New Arrivals</h2>
            </div>
            <Link 
              to="/new-arrivals" 
              className="mt-4 md:mt-0 inline-flex items-center font-medium hover:text-luxe-gold transition-colors"
            >
              {t('view.all')} <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Banner */}
      <section className="py-20 bg-luxe-cream/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h5 className="text-luxe-gold uppercase tracking-wider mb-3">Limited Edition</h5>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">The Gold Collection</h2>
              <p className="text-luxe-charcoal/70 mb-8">
                Our most luxurious pieces, crafted from the finest materials. This exclusive 
                collection features unique designs that make a statement.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-luxe-charcoal hover:bg-luxe-black text-white rounded-full"
              >
                <Link to="/collections/gold">
                  Explore Collection
                </Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1611591437322-0a169a1b1889?q=80&w=1000" 
                alt="Gold Collection" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-luxe-gold font-serif text-xl mb-2">Pure Elegance</p>
                <p className="text-sm text-luxe-charcoal/70">Handcrafted with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Sellers */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h5 className="text-luxe-gold uppercase tracking-wider mb-3">Customer Favorites</h5>
              <h2 className="text-3xl md:text-4xl font-serif">Best Sellers</h2>
            </div>
            <Link 
              to="/collections/best-sellers" 
              className="mt-4 md:mt-0 inline-flex items-center font-medium hover:text-luxe-gold transition-colors"
            >
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 3).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="lg:first:col-span-1 lg:last:col-span-1" 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 bg-luxe-cream/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Why Choose Us</h2>
            <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
              We're committed to providing the finest quality accessories and an exceptional shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureBox 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
              title="Premium Quality"
              description="All our pieces are made with the finest materials and exceptional craftsmanship."
            />
            <FeatureBox 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
              title="Secure Payments"
              description="Shop with confidence using our secure payment options."
            />
            <FeatureBox 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
              title="Free Shipping"
              description="Enjoy free shipping on all orders over $50 within the US."
            />
            <FeatureBox 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>}
              title="Warranty & Returns"
              description="30-day returns and a one-year warranty on all products."
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 bg-luxe-charcoal text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Join Our Community</h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter to receive exclusive offers, early access to new collections,
              and styling tips directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                required
              />
              <Button 
                type="submit" 
                className="bg-luxe-gold hover:bg-luxe-gold/90 text-white rounded-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
