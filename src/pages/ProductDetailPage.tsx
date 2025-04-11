
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  Share, 
  Heart, 
  ShoppingBag, 
  Star,
  Truck,
  RefreshCw,
  Shield,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { 
    getProductBySlug, 
    getRelatedProducts, 
    addToCart,
    addToWishlist,
    isInWishlist
  } = useProducts();
  
  const product = getProductBySlug(slug || '');
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomDialogOpen, setIsZoomDialogOpen] = useState(false);
  
  // If product not found
  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <p className="text-luxe-charcoal/70 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-luxe-charcoal hover:bg-luxe-black"
        >
          Return to Home
        </Button>
      </div>
    );
  }
  
  const relatedProducts = getRelatedProducts(product);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist`);
  };
  
  const inWishlist = isInWishlist(product.id);
  
  return (
    <div className="pt-20">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg aspect-square bg-white product-card-shadow">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onClick={() => setIsZoomDialogOpen(true)}
              />
              
              <button 
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-luxe-gold hover:text-white transition-colors"
                onClick={() => setIsZoomDialogOpen(true)}
                aria-label="Zoom image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative overflow-hidden rounded-md aspect-square w-20 hover-card-rise ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-luxe-gold' 
                        : 'ring-1 ring-gray-200'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="px-3 py-1 text-xs bg-luxe-gold text-white rounded-full">New</span>
              )}
              {product.isSale && (
                <span className="px-3 py-1 text-xs bg-red-500 text-white rounded-full">Sale</span>
              )}
              <span className="px-3 py-1 text-xs bg-luxe-charcoal/10 rounded-full">
                {product.category}
              </span>
            </div>
            
            {/* Product Title & Price */}
            <h1 className="text-3xl md:text-4xl font-serif mb-3">{product.name}</h1>
            
            <div className="flex items-center mb-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={18} 
                    className="text-yellow-400 fill-yellow-400" 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-luxe-charcoal/70">84 reviews</span>
            </div>
            
            <div className="mb-6">
              {product.isSale && product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-medium text-red-500">${product.salePrice.toFixed(2)}</span>
                  <span className="text-lg text-luxe-charcoal/70 line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-luxe-charcoal/70 mb-6">
              This exquisite {product.name.toLowerCase()} features a timeless design that complements 
              any outfit. Crafted with premium materials, it's perfect for daily wear or special occasions.
            </p>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="font-medium mb-2">Quantity</p>
              <div className="flex items-center">
                <button 
                  onClick={decreaseQuantity} 
                  className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 py-2 text-center border-t border-b border-gray-300">
                  {quantity}
                </span>
                <button 
                  onClick={increaseQuantity} 
                  className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                className="flex-1 bg-luxe-charcoal hover:bg-luxe-black text-white"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2" size={18} />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                className={`flex-1 border-luxe-charcoal ${
                  inWishlist ? 'bg-luxe-cream/50' : ''
                }`}
                onClick={handleAddToWishlist}
              >
                <Heart 
                  className={`mr-2 ${inWishlist ? 'fill-luxe-gold text-luxe-gold' : ''}`} 
                  size={18} 
                />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <Truck size={18} className="text-luxe-gold mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <RefreshCw size={18} className="text-luxe-gold mr-2" />
                <span>30-day returns guarantee</span>
              </div>
              <div className="flex items-center">
                <Shield size={18} className="text-luxe-gold mr-2" />
                <span>1-year warranty included</span>
              </div>
              <div className="flex items-center">
                <Check size={18} className="text-luxe-gold mr-2" />
                <span>In stock - Ships within 24 hours</span>
              </div>
            </div>
            
            {/* Social Share */}
            <div className="flex items-center pt-4 border-t border-gray-200">
              <span className="mr-3">Share:</span>
              <div className="flex space-x-2">
                <button className="p-2 bg-luxe-cream rounded-full hover:bg-luxe-gold hover:text-white transition-colors">
                  <Share size={16} />
                </button>
                <button className="p-2 bg-luxe-cream rounded-full hover:bg-[#1877F2] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                  </svg>
                </button>
                <button className="p-2 bg-luxe-cream rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52883 8.31345 7.04358 7.56059C5.55833 6.80773 4.24843 5.75098 3.198 4.45893C2.82629 5.09738 2.63095 5.82315 2.632 6.56193C2.632 8.01193 3.37 9.29293 4.492 10.0429C3.82802 10.022 3.17864 9.84271 2.598 9.51993V9.57193C2.5982 10.5376 2.93237 11.4735 3.54405 12.221C4.15574 12.9684 5.00647 13.4814 5.953 13.6729C5.33669 13.84 4.69052 13.8646 4.063 13.7449C4.32987 14.5762 4.85001 15.3031 5.55017 15.824C6.25033 16.345 7.09745 16.6337 7.97 16.6499C7.10249 17.3313 6.10918 17.8349 5.04691 18.1321C3.98464 18.4293 2.87418 18.5142 1.779 18.3819C3.6907 19.6114 5.91605 20.264 8.189 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.23009 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z" />
                  </svg>
                </button>
                <button className="p-2 bg-luxe-cream rounded-full hover:bg-[#E60023] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.0167 2C6.47856 2 2 6.47856 2 12.0167C2 16.3167 4.86667 19.9833 8.82333 21.3833C8.73833 20.5167 8.65333 19.2167 8.86667 18.0833C9.06667 17.0833 10.15 12.95 10.15 12.95C10.15 12.95 9.85 12.25 9.85 11.25C9.85 9.71667 10.8333 8.6 12.0167 8.6C13.0167 8.6 13.5 9.35 13.5 10.2167C13.5 11.1833 12.85 12.5833 12.5167 13.9C12.2333 15.0167 13.0833 15.9 14.2 15.9C16.1667 15.9 17.6833 13.85 17.6833 10.9667C17.6833 8.45 15.9 6.66667 12.1167 6.66667C7.98333 6.66667 5.65 9.55 5.65 12.3C5.65 13.3833 6.05 14.5833 6.56667 15.2167C6.65 15.3167 6.66667 15.4167 6.65 15.5167C6.56667 15.8833 6.35 16.7 6.31667 16.85C6.26667 17.05 6.13333 17.1 5.93333 17C4.5 16.3 3.61667 14.0333 3.61667 12.2333C3.61667 8.86667 6.61667 4.76667 12.4333 4.76667C17.0833 4.76667 20.3833 8.15 20.3833 11.85C20.3833 16.4 17.6 17.9333 14.35 17.9333C13.1833 17.9333 12.0833 17.3167 11.7 16.6167C11.7 16.6167 11.0333 19.1333 10.8833 19.7C10.6167 20.6667 9.93333 21.8333 9.38333 22.5833C10.2333 22.85 11.1167 23 12.0167 23C17.55 23 22.0333 18.5167 22.0333 12.9833C22.0333 7.43333 17.55 2 12.0167 2Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="my-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <div className="prose max-w-none">
                <p>
                  Crafted with meticulous attention to detail, this {product.name.toLowerCase()} is the epitome of elegance and sophistication. 
                  Each piece is handcrafted by skilled artisans who bring years of expertise to their craft.
                </p>
                <p className="mt-4">
                  The design draws inspiration from classical motifs while incorporating modern elements for a timeless appeal. 
                  Whether paired with casual attire or formal wear, this versatile accessory effortlessly elevates any look.
                </p>
                <p className="mt-4">
                  The premium materials used ensure durability and longevity, making this not just a beautiful accessory but also an investment piece that will last for years to come.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Materials & Dimensions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-luxe-charcoal/70">Material</span>
                      <span className="font-medium">14K Gold-filled</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-luxe-charcoal/70">Weight</span>
                      <span className="font-medium">3.5 grams</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-luxe-charcoal/70">Dimensions</span>
                      <span className="font-medium">18 inches (adjustable)</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-luxe-charcoal/70">Finish</span>
                      <span className="font-medium">High polish</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check size={18} className="text-luxe-gold mr-2 mt-0.5" />
                      <span>Store in a cool, dry place away from direct sunlight</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-luxe-gold mr-2 mt-0.5" />
                      <span>Clean with a soft polishing cloth</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-luxe-gold mr-2 mt-0.5" />
                      <span>Avoid contact with chemicals, perfumes, and lotions</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-luxe-gold mr-2 mt-0.5" />
                      <span>Remove before swimming or bathing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-medium mb-2">4.9</div>
                    <div className="flex justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-luxe-charcoal/70">Based on 84 reviews</p>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center mb-2">
                        <span className="w-10 text-right mr-3">{rating} star</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ 
                              width: `${rating === 5 ? 85 : rating === 4 ? 10 : rating === 3 ? 3 : rating === 2 ? 1 : 1}%` 
                            }}
                          ></div>
                        </div>
                        <span className="w-10 text-left ml-3 text-sm">
                          {rating === 5 ? '85%' : rating === 4 ? '10%' : rating === 3 ? '3%' : rating === 2 ? '1%' : '1%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-medium mb-6">Customer Reviews</h3>
                  
                  <div className="space-y-6">
                    {/* Sample reviews */}
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">Elegant and Timeless</span>
                      </div>
                      <p className="text-sm text-luxe-charcoal/70 mb-2">
                        By Sarah M. - March 15, 2023
                      </p>
                      <p>
                        This piece is absolutely stunning! The craftsmanship is impeccable and it looks much more expensive than it is. I've received so many compliments.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">Perfect Gift</span>
                      </div>
                      <p className="text-sm text-luxe-charcoal/70 mb-2">
                        By Michael T. - February 20, 2023
                      </p>
                      <p>
                        I bought this as an anniversary gift for my wife and she absolutely loves it. The quality is exceptional and the packaging was beautiful.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star, index) => (
                            <Star 
                              key={star} 
                              size={16} 
                              className={index < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                        <span className="font-medium">Beautiful but Small</span>
                      </div>
                      <p className="text-sm text-luxe-charcoal/70 mb-2">
                        By Emily J. - January 5, 2023
                      </p>
                      <p>
                        The piece is beautiful but slightly smaller than I expected. Still very happy with my purchase and the customer service was excellent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif">You May Also Like</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Image Zoom Dialog */}
      <Dialog open={isZoomDialogOpen} onOpenChange={setIsZoomDialogOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative">
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex justify-center gap-3 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative overflow-hidden rounded-md aspect-square w-16 ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-luxe-gold' 
                      : 'ring-1 ring-gray-200'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;
