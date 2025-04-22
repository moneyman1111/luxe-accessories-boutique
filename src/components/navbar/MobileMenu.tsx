
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ name: string; path: string; }>;
};

const MobileMenu = ({ isOpen, onClose, categories }: MobileMenuProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-white z-50 pt-20 pb-6 px-6 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <nav className="space-y-6">
            <div className="space-y-3">
              <p className="text-luxe-charcoal font-semibold">Shop by Category</p>
              {categories.map((category) => (
                <Link 
                  key={category.path} 
                  to={category.path}
                  className="block py-2 border-b border-gray-100"
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <div className="space-y-3">
              <Link 
                to="/new-arrivals" 
                className="block py-2 border-b border-gray-100"
                onClick={onClose}
              >
                New Arrivals
              </Link>
              <Link 
                to="/collections" 
                className="block py-2 border-b border-gray-100"
                onClick={onClose}
              >
                Collections
              </Link>
              <Link 
                to="/about" 
                className="block py-2 border-b border-gray-100"
                onClick={onClose}
              >
                About
              </Link>
              <Link 
                to="/our-story" 
                className="block py-2 border-b border-gray-100"
                onClick={onClose}
              >
                Our Story
              </Link>
            </div>
          </nav>
        </div>
        
        <div className="mt-auto space-y-4">
          <Link 
            to="/account/login" 
            className="block w-full text-center py-3 border border-luxe-charcoal rounded-md"
            onClick={onClose}
          >
            Login
          </Link>
          <Link 
            to="/account/register" 
            className="block w-full text-center py-3 bg-luxe-charcoal text-white rounded-md"
            onClick={onClose}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
