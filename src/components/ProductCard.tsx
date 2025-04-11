
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export interface ProductType {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  slug: string;
}

interface ProductCardProps {
  product: ProductType;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  
  // Toggle image on hover if multiple images exist
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setImageIndex(0);
  };
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden hover-card-rise product-card-shadow bg-white rounded-lg transition-medium",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-luxe-gold text-white hover:bg-luxe-gold">New</Badge>
        )}
        {product.isSale && (
          <Badge className="bg-red-500 text-white hover:bg-red-600">Sale</Badge>
        )}
      </div>
      
      {/* Quick Actions */}
      <div 
        className={cn(
          "absolute top-3 right-3 z-10 flex flex-col gap-2 transform transition-medium",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
        )}
      >
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-luxe-gold hover:text-white transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </button>
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-luxe-gold hover:text-white transition-colors"
          aria-label="Quick view"
        >
          <Eye size={18} />
        </button>
      </div>
      
      {/* Product Image */}
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[imageIndex]}
            alt={product.name}
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-1 group-hover:text-luxe-gold transition-colors">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-luxe-charcoal/70">{product.category}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {product.isSale && product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-medium">${product.salePrice.toFixed(2)}</span>
                <span className="text-luxe-charcoal/70 text-sm line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className={cn(
              "transition-all duration-300 rounded-full overflow-hidden",
              isHovered 
                ? "w-auto px-3 bg-luxe-charcoal hover:bg-luxe-black" 
                : "w-10 bg-luxe-charcoal hover:bg-luxe-black"
            )}
          >
            <ShoppingBag className={isHovered ? "mr-2" : ""} size={16} />
            {isHovered && <span>Add to Cart</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
