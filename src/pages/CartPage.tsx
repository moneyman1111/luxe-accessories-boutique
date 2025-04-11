
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  X, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import ProductCard from '@/components/ProductCard';
import { useToast } from "@/hooks/use-toast";

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart,
    cartTotal,
    featuredProducts
  } = useProducts();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const { toast } = useToast();
  
  // Get total quantity of items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
      variant: "default",
    });
  };
  
  const handleClearCart = () => {
    if (cart.length > 0) {
      clearCart();
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
        variant: "default",
      });
    }
  };
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false);
      // Handle promo code validation here
      toast({
        title: "Promo code applied",
        description: `Promo code "${promoCode}" has been applied to your cart.`,
        variant: "default",
      });
      console.log('Applied promo code:', promoCode);
    }, 1000);
  };
  
  // Sample shipping cost
  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const taxRate = 0.07; // 7% tax
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="container px-4 mx-auto py-12">
          <div className="text-center max-w-lg mx-auto">
            <div className="bg-luxe-cream/50 p-8 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag size={48} className="text-luxe-charcoal/70" />
            </div>
            <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
            <p className="text-luxe-charcoal/70 mb-8">
              Looks like you haven't added anything to your cart yet. 
              Browse our collection and find something you'll love.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-luxe-charcoal hover:bg-luxe-black text-white"
            >
              <Link to="/">
                <ArrowLeft className="mr-2" size={16} />
                Continue Shopping
              </Link>
            </Button>
            
            {/* Product Recommendations */}
            <div className="mt-20">
              <h2 className="text-2xl font-serif mb-6">Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 min-h-screen">
      <div className="container px-4 mx-auto py-12">
        <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Cart Header */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                  </p>
                  <p className="text-sm text-luxe-charcoal/70">
                    Total of {totalItems} {totalItems === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <button 
                  onClick={handleClearCart}
                  className="text-luxe-charcoal/70 hover:text-red-500 text-sm transition-colors flex items-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Clear Cart
                </button>
              </div>
              
              {/* Cart Items */}
              <div>
                {cart.map(({ product, quantity }) => (
                  <div 
                    key={product.id} 
                    className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <Link to={`/product/${product.slug}`}>
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </Link>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium mb-1">
                            <Link to={`/product/${product.slug}`} className="hover:text-luxe-gold transition-colors">
                              {product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-luxe-charcoal/70 mb-2">{product.category}</p>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(product.id, product.name)}
                          className="text-luxe-charcoal/70 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateCartItemQuantity(product.id, quantity - 1)} 
                            className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100 transition-colors"
                            disabled={quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 py-1 text-sm text-center border-t border-b border-gray-300">
                            {quantity}
                          </span>
                          <button 
                            onClick={() => updateCartItemQuantity(product.id, quantity + 1)} 
                            className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        {/* Price Info */}
                        <div className="mt-2 sm:mt-0 text-right">
                          {product.isSale && product.salePrice ? (
                            <div>
                              <span className="font-medium text-red-500">${product.salePrice.toFixed(2)}</span>
                              <span className="text-sm text-luxe-charcoal/70 line-through ml-2">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                          )}
                          <div className="text-sm text-luxe-charcoal/70">
                            Total: ${((product.salePrice || product.price) * quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Continue Shopping */}
              <div className="p-4 flex justify-between items-center">
                <Button 
                  asChild
                  variant="outline"
                  className="text-luxe-charcoal"
                >
                  <Link to="/">
                    <ArrowLeft className="mr-2" size={16} />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-medium">Order Summary</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-luxe-charcoal/70">Subtotal ({totalItems} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxe-charcoal/70">Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxe-charcoal/70">Estimated Tax</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                
                {/* Promo Code */}
                <form onSubmit={handleApplyPromo} className="pt-2 border-t border-gray-100">
                  <label htmlFor="promo-code" className="block text-sm mb-2">
                    Apply Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      id="promo-code"
                      type="text" 
                      placeholder="Enter code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      variant="outline"
                      disabled={!promoCode || isApplyingPromo}
                    >
                      Apply
                    </Button>
                  </div>
                </form>
                
                {/* Order Total */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    asChild
                    className="w-full mt-4 bg-luxe-charcoal hover:bg-luxe-black text-white"
                  >
                    <Link to={isAuthenticated ? "/checkout" : "/account/login?redirect=checkout"}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </Button>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-xs text-luxe-charcoal/70">
                      <ShieldCheck size={14} className="mr-1 text-green-500" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center text-xs text-luxe-charcoal/70">
                      <CreditCard size={14} className="mr-1" />
                      <span>We accept all major credit cards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
