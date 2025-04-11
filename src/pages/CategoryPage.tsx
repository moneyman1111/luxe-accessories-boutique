
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';

export const categoryDescriptions: Record<string, { title: string; description: string; image: string }> = {
  'necklaces': {
    title: 'Necklaces',
    description: 'From delicate chains to statement pendants, our necklace collection offers timeless pieces to complement any outfit.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000'
  },
  'earrings': {
    title: 'Earrings',
    description: 'Elegant studs, classic hoops, and eye-catching drops – find the perfect earrings to frame your face.',
    image: 'https://images.unsplash.com/photo-1630018548696-e1900d9d1d84?q=80&w=1000'
  },
  'bracelets': {
    title: 'Bracelets',
    description: 'From minimalist chains to statement cuffs, our bracelets add the perfect finishing touch to your look.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000'
  },
  'rings': {
    title: 'Rings',
    description: 'Discover rings for every occasion, from subtle everyday bands to bold statement pieces.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000'
  }
};

const FilterSection = ({ 
  title, 
  children, 
  defaultOpen = false
}: { 
  title: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { products } = useProducts();
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const categoryInfo = category ? categoryDescriptions[category] : null;
  
  useEffect(() => {
    // Filter products by category and price range
    let result = products;
    
    if (category) {
      result = result.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply price filter
    result = result.filter(
      (product) => {
        const price = product.salePrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result = [...result].sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        result = [...result].sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result = [...result].sort((a, b) => (a.isNew ? -1 : 1));
        break;
      default:
        // Default featured sorting (no change)
        break;
    }
    
    setFilteredProducts(result);
  }, [category, products, priceRange, sortOption]);
  
  if (!categoryInfo) {
    return <div className="pt-20 min-h-screen flex items-center justify-center">Category not found</div>;
  }
  
  return (
    <div className="pt-20">
      {/* Category Header */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={categoryInfo.image} 
            alt={categoryInfo.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-xl animate-slide-in">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              {categoryInfo.title}
            </h1>
            <p className="text-white/85 text-lg">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container px-4 mx-auto">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <p>Showing {filteredProducts.length} products</p>
            <Button 
              variant="outline" 
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <h2 className="text-xl font-medium mb-6">Filters</h2>
              
              <div className="space-y-1">
                <FilterSection title="Price Range" defaultOpen={true}>
                  <div className="space-y-4">
                    <Slider 
                      defaultValue={[0, 300]} 
                      max={300} 
                      step={10} 
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title="Material">
                  <div className="space-y-2">
                    {['Gold', 'Silver', 'Rose Gold', 'Platinum'].map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox id={`material-${material}`} />
                        <Label htmlFor={`material-${material}`}>{material}</Label>
                      </div>
                    ))}
                  </div>
                </FilterSection>
                
                <FilterSection title="Style">
                  <div className="space-y-2">
                    {['Minimalist', 'Vintage', 'Modern', 'Bohemian'].map((style) => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox id={`style-${style}`} />
                        <Label htmlFor={`style-${style}`}>{style}</Label>
                      </div>
                    ))}
                  </div>
                </FilterSection>
                
                <FilterSection title="Occasion">
                  <div className="space-y-2">
                    {['Everyday', 'Special Occasion', 'Wedding', 'Gift'].map((occasion) => (
                      <div key={occasion} className="flex items-center space-x-2">
                        <Checkbox id={`occasion-${occasion}`} />
                        <Label htmlFor={`occasion-${occasion}`}>{occasion}</Label>
                      </div>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>
            
            {/* Mobile Filters */}
            <div 
              className={`lg:hidden fixed inset-0 bg-white z-50 transform transition-transform ${
                isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="p-4 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <FilterSection title="Price Range" defaultOpen={true}>
                    <div className="space-y-4">
                      <Slider 
                        defaultValue={[0, 300]} 
                        max={300} 
                        step={10} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </FilterSection>
                  
                  <FilterSection title="Material">
                    <div className="space-y-2">
                      {['Gold', 'Silver', 'Rose Gold', 'Platinum'].map((material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-material-${material}`} />
                          <Label htmlFor={`mobile-material-${material}`}>{material}</Label>
                        </div>
                      ))}
                    </div>
                  </FilterSection>
                  
                  <FilterSection title="Style">
                    <div className="space-y-2">
                      {['Minimalist', 'Vintage', 'Modern', 'Bohemian'].map((style) => (
                        <div key={style} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-style-${style}`} />
                          <Label htmlFor={`mobile-style-${style}`}>{style}</Label>
                        </div>
                      ))}
                    </div>
                  </FilterSection>
                  
                  <FilterSection title="Occasion">
                    <div className="space-y-2">
                      {['Everyday', 'Special Occasion', 'Wedding', 'Gift'].map((occasion) => (
                        <div key={occasion} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-occasion-${occasion}`} />
                          <Label htmlFor={`mobile-occasion-${occasion}`}>{occasion}</Label>
                        </div>
                      ))}
                    </div>
                  </FilterSection>
                </div>
                
                <div className="mt-8">
                  <Button 
                    className="w-full bg-luxe-charcoal hover:bg-luxe-black"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="hidden lg:block">Showing {filteredProducts.length} products</p>
                
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-sm">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-luxe-gold"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-luxe-charcoal/70">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
