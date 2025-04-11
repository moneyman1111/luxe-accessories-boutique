
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  
  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchTerm(query);
    
    if (query) {
      const searchResults = searchProducts(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [location.search, searchProducts]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      const searchResults = searchProducts(searchTerm);
      setResults(searchResults);
      
      // Update URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchTerm);
      window.history.pushState({}, '', url.toString());
    }
  };
  
  return (
    <div className="pt-20 min-h-screen">
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-serif mb-6 text-center">Search our Collection</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              className="bg-luxe-charcoal hover:bg-luxe-black text-white"
            >
              <Search className="mr-2" size={16} />
              Search
            </Button>
          </form>
        </div>
        
        {searchTerm && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-2">
              {results.length > 0 
                ? `Search results for "${searchTerm}"` 
                : `No results found for "${searchTerm}"`}
            </h2>
            <p className="text-luxe-charcoal/70">
              {results.length > 0 
                ? `Found ${results.length} products` 
                : 'Try adjusting your search terms or browse our categories below'}
            </p>
          </div>
        )}
        
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-luxe-charcoal/30"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-4">No matching products found</h3>
            <p className="text-luxe-charcoal/70 max-w-md mx-auto mb-8">
              We couldn't find any products matching your search. Try using different keywords or browse our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                variant="outline"
                className="text-luxe-charcoal"
              >
                <Link to="/">
                  <ArrowLeft className="mr-2" size={16} />
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                asChild
                className="bg-luxe-charcoal hover:bg-luxe-black text-white"
              >
                <Link to="/category/necklaces">
                  Browse Necklaces
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover-card-rise">
              <Link to="/category/necklaces" className="block group">
                <div className="relative h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800" 
                    alt="Necklaces" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-serif">Necklaces</h3>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover-card-rise">
              <Link to="/category/earrings" className="block group">
                <div className="relative h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1630018548696-e1900d9d1d84?q=80&w=800" 
                    alt="Earrings" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-serif">Earrings</h3>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover-card-rise">
              <Link to="/category/bracelets" className="block group">
                <div className="relative h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800" 
                    alt="Bracelets" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-serif">Bracelets</h3>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover-card-rise">
              <Link to="/category/rings" className="block group">
                <div className="relative h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800" 
                    alt="Rings" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-serif">Rings</h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
