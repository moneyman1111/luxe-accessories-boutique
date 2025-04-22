
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProducts } from '@/context/ProductContext';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './navbar/MobileMenu';
import SearchDialog from './navbar/SearchDialog';
import { categories } from './navbar/categories';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useProducts();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "py-3 bg-white/95 backdrop-blur-md shadow-sm dark:bg-black/95" 
            : "py-5 bg-transparent"
        )}
      >
        <div className="container px-4 mx-auto flex items-center justify-between">
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-serif font-semibold">LUXE</h1>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 py-2">
                <span>Shop</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                {categories.map((category) => (
                  <Link 
                    key={category.path} 
                    to={category.path}
                    className="block px-4 py-2 hover:bg-luxe-cream transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/new-arrivals" className="py-2">New Arrivals</Link>
            <Link to="/collections" className="py-2">Collections</Link>
            <Link to="/about" className="py-2">About</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-luxe-cream rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link to="/account/login" className="p-2 hover:bg-luxe-cream rounded-full transition-colors">
              <User size={20} />
            </Link>

            <ThemeSwitcher />
            <LanguageSwitcher />
            
            <Link to="/cart" className="p-2 hover:bg-luxe-cream rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-luxe-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
      />
      
      <SearchDialog
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSubmit={handleSearch}
      />
    </>
  );
};

export default Navbar;
