
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductType } from '@/components/ProductCard';

// Sample product data
const sampleProducts: ProductType[] = [
  {
    id: 1,
    name: 'Gold Pendant Necklace',
    category: 'Necklaces',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'
    ],
    isNew: true,
    slug: 'gold-pendant-necklace'
  },
  {
    id: 2,
    name: 'Pearl Drop Earrings',
    category: 'Earrings',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1630018548696-e1900d9d1d84?q=80&w=1000',
      'https://images.unsplash.com/photo-1630018548695-b3371f8427eb?q=80&w=1000'
    ],
    slug: 'pearl-drop-earrings'
  },
  {
    id: 3,
    name: 'Silver Chain Bracelet',
    category: 'Bracelets',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000',
      'https://images.unsplash.com/photo-1611591437401-e42a07995d61?q=80&w=1000'
    ],
    slug: 'silver-chain-bracelet'
  },
  {
    id: 4,
    name: 'Minimalist Gold Ring',
    category: 'Rings',
    price: 59.99,
    isSale: true,
    salePrice: 49.99,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000',
      'https://images.unsplash.com/photo-1605100804926-fa949f3cb22b?q=80&w=1000'
    ],
    slug: 'minimalist-gold-ring'
  },
  {
    id: 5,
    name: 'Crystal Hoop Earrings',
    category: 'Earrings',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1000',
      'https://images.unsplash.com/photo-1617038260898-c90b6dc2c620?q=80&w=1000'
    ],
    isNew: true,
    slug: 'crystal-hoop-earrings'
  },
  {
    id: 6,
    name: 'Layered Gold Necklace',
    category: 'Necklaces',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000',
      'https://images.unsplash.com/photo-1599643478516-75acdfec0bc5?q=80&w=1000'
    ],
    slug: 'layered-gold-necklace'
  },
  {
    id: 7,
    name: 'Gemstone Bangle',
    category: 'Bracelets',
    price: 149.99,
    isSale: true,
    salePrice: 119.99,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000',
      'https://images.unsplash.com/photo-1573408301186-77ccaedc47b5?q=80&w=1000'
    ],
    slug: 'gemstone-bangle'
  },
  {
    id: 8,
    name: 'Statement Cocktail Ring',
    category: 'Rings',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=1000',
      'https://images.unsplash.com/photo-1603561596257-917a073e53e0?q=80&w=1000'
    ],
    slug: 'statement-cocktail-ring'
  },
  {
    id: 9,
    name: 'Gold Stud Earrings',
    category: 'Earrings',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=1000',
      'https://images.unsplash.com/photo-1589128777077-cc5d7a4b18d5?q=80&w=1000'
    ],
    slug: 'gold-stud-earrings'
  },
  {
    id: 10,
    name: 'Vintage Charm Necklace',
    category: 'Necklaces',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=1000',
      'https://images.unsplash.com/photo-1622398925291-2e8081c4f8bf?q=80&w=1000'
    ],
    slug: 'vintage-charm-necklace'
  },
  {
    id: 11,
    name: 'Rose Gold Tennis Bracelet',
    category: 'Bracelets',
    price: 199.99,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1576763301815-775bcc889b25?q=80&w=1000',
      'https://images.unsplash.com/photo-1576763301814-2842d81a8df4?q=80&w=1000'
    ],
    slug: 'rose-gold-tennis-bracelet'
  },
  {
    id: 12,
    name: 'Stackable Gold Rings Set',
    category: 'Rings',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1514709482320-0524d5335d92?q=80&w=1000',
      'https://images.unsplash.com/photo-1514709482446-13739d069869?q=80&w=1000'
    ],
    slug: 'stackable-gold-rings-set'
  },
  {
    id: 13,
    name: 'Pearl Pendant Necklace',
    category: 'Necklaces',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1611591437322-0a169a1b1889?q=80&w=1000',
      'https://images.unsplash.com/photo-1611591437368-75d8b8602f9b?q=80&w=1000'
    ],
    slug: 'pearl-pendant-necklace'
  },
  {
    id: 14,
    name: 'Diamond Stud Earrings',
    category: 'Earrings',
    price: 249.99,
    isSale: true,
    salePrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1574271143515-5cdff0d51321?q=80&w=1000',
      'https://images.unsplash.com/photo-1574271143514-e60c363061c1?q=80&w=1000'
    ],
    slug: 'diamond-stud-earrings'
  },
  {
    id: 15,
    name: 'Infinity Chain Bracelet',
    category: 'Bracelets',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1573551461514-aab10967cdfc?q=80&w=1000',
      'https://images.unsplash.com/photo-1573551461513-e226b0e6fb0c?q=80&w=1000'
    ],
    slug: 'infinity-chain-bracelet'
  },
  {
    id: 16,
    name: 'Emerald Signet Ring',
    category: 'Rings',
    price: 179.99,
    images: [
      'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1000',
      'https://images.unsplash.com/photo-1598560917944-e9fbf3323bcf?q=80&w=1000'
    ],
    isNew: true,
    slug: 'emerald-signet-ring'
  },
  {
    id: 17,
    name: 'Minimalist Bar Necklace',
    category: 'Necklaces',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1602752250019-9e4980594f3d?q=80&w=1000',
      'https://images.unsplash.com/photo-1602752250216-9e243bc5d3e8?q=80&w=1000'
    ],
    slug: 'minimalist-bar-necklace'
  },
  {
    id: 18,
    name: 'Tassel Drop Earrings',
    category: 'Earrings',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1624454002302-51816f5c11a4?q=80&w=1000',
      'https://images.unsplash.com/photo-1624454002321-9d9e4a0f9610?q=80&w=1000'
    ],
    slug: 'tassel-drop-earrings'
  },
  {
    id: 19,
    name: 'Beaded Charm Bracelet',
    category: 'Bracelets',
    price: 59.99,
    isSale: true,
    salePrice: 39.99,
    images: [
      'https://images.unsplash.com/photo-1611591438966-57a8eb6c50da?q=80&w=1000',
      'https://images.unsplash.com/photo-1611591438967-07f15420c418?q=80&w=1000'
    ],
    slug: 'beaded-charm-bracelet'
  },
  {
    id: 20,
    name: 'Twisted Band Ring',
    category: 'Rings',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1586104130445-414bd2d0461d?q=80&w=1000',
      'https://images.unsplash.com/photo-1586104130639-18935b13683e?q=80&w=1000'
    ],
    slug: 'twisted-band-ring'
  },
];

type CartItem = {
  product: ProductType;
  quantity: number;
};

type ProductContextType = {
  products: ProductType[];
  featuredProducts: ProductType[];
  newArrivals: ProductType[];
  onSaleProducts: ProductType[];
  getProductBySlug: (slug: string) => ProductType | undefined;
  getProductsByCategory: (category: string) => ProductType[];
  getRelatedProducts: (product: ProductType, limit?: number) => ProductType[];
  searchProducts: (query: string) => ProductType[];
  cart: CartItem[];
  addToCart: (product: ProductType, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  wishlist: ProductType[];
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>(sampleProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  
  // Derived product lists
  const featuredProducts = products.filter((_, index) => index < 6);
  const newArrivals = products.filter(product => product.isNew);
  const onSaleProducts = products.filter(product => product.isSale);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);
  
  // Get product by slug
  const getProductBySlug = (slug: string) => {
    return products.find(product => product.slug === slug);
  };
  
  // Get products by category
  const getProductsByCategory = (category: string) => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  };
  
  // Get related products (same category excluding current product)
  const getRelatedProducts = (product: ProductType, limit = 4) => {
    const relatedProducts = products.filter(p => 
      p.category === product.category && p.id !== product.id
    );
    
    // Shuffle array and return limited number of products
    return [...relatedProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
  };
  
  // Search products by name or category
  const searchProducts = (query: string) => {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.category.toLowerCase().includes(searchTerm)
    );
  };
  
  // Cart functions
  const addToCart = (product: ProductType, quantity = 1) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Update quantity if item already in cart
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { product, quantity }]);
    }
  };
  
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };
  
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  // Wishlist functions
  const addToWishlist = (product: ProductType) => {
    if (!isInWishlist(product.id)) {
      setWishlist([...wishlist, product]);
    }
  };
  
  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter(product => product.id !== productId));
  };
  
  const isInWishlist = (productId: number) => {
    return wishlist.some(product => product.id === productId);
  };
  
  const value = {
    products,
    featuredProducts,
    newArrivals,
    onSaleProducts,
    getProductBySlug,
    getProductsByCategory,
    getRelatedProducts,
    searchProducts,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
};
