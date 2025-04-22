
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Footer = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter form submitted');
  };

  return (
    <footer className="bg-background text-foreground transition-colors">
      <div className="container px-4 py-12 mx-auto">
        {/* Newsletter */}
        <div className="max-w-lg mx-auto text-center mb-12">
          <h3 className="text-2xl font-serif mb-3">Join Our Newsletter</h3>
          <p className="text-muted-foreground mb-6">
            Sign up to receive updates on new arrivals, special offers, and exclusive events.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-card border-input"
              required
            />
            <Button 
              type="submit" 
              className="bg-luxe-charcoal hover:bg-luxe-black text-white transition-colors"
            >
              Subscribe
            </Button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-border pt-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif mb-4">LUXE</h2>
            <p className="text-muted-foreground mb-6">
              Elevate your style with our carefully curated accessories. Crafted with quality materials and timeless designs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-card rounded-full hover:bg-luxe-gold hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-card rounded-full hover:bg-luxe-gold hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-card rounded-full hover:bg-luxe-gold hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/category/necklaces" className="text-muted-foreground hover:text-foreground">Necklaces</Link></li>
              <li><Link to="/category/earrings" className="text-muted-foreground hover:text-foreground">Earrings</Link></li>
              <li><Link to="/category/bracelets" className="text-muted-foreground hover:text-foreground">Bracelets</Link></li>
              <li><Link to="/category/rings" className="text-muted-foreground hover:text-foreground">Rings</Link></li>
              <li><Link to="/new-arrivals" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-foreground">Sustainability</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground">Shipping & Returns</Link></li>
              <li><Link to="/store-policy" className="text-muted-foreground hover:text-foreground">Store Policy</Link></li>
              <li><Link to="/payment-methods" className="text-muted-foreground hover:text-foreground">Payment Methods</Link></li>
              <li><Link to="/care-guide" className="text-muted-foreground hover:text-foreground">Care Guide</Link></li>
              <li>
                <a href="mailto:hello@luxe.com" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Mail size={14} />
                  <span>hello@luxe.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} LUXE Accessories. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
