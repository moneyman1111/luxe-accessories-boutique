
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1500" 
            alt="About LUXE" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-xl">
            <h5 className="text-luxe-gold uppercase tracking-wider mb-3">About Us</h5>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Crafting Elegance Since 2010
            </h1>
            <p className="text-white/85 text-lg">
              LUXE was founded with a simple mission: to create beautiful, timeless
              accessories that make you feel special every day.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h5 className="text-luxe-gold uppercase tracking-wider mb-3">Our Story</h5>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">From a Small Studio to Global Brand</h2>
              <p className="text-luxe-charcoal/70 mb-4">
                Our journey began in a small studio in Paris, with a passion for craftsmanship
                and an eye for timeless design. What started as a small collection of
                handcrafted pieces has grown into a global brand loved by people worldwide.
              </p>
              <p className="text-luxe-charcoal/70 mb-6">
                We believe that accessories should be more than just an afterthought—they
                should be the finishing touch that elevates your style and makes you feel
                confident. Each piece in our collection is designed with this philosophy in mind.
              </p>
              <Button asChild className="bg-luxe-charcoal hover:bg-luxe-black text-white rounded-full">
                <Link to="/our-story">
                  Read Our Full Story
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000" 
                alt="Our Story" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-luxe-gold font-serif text-xl mb-2">Handcrafted with Love</p>
                <p className="text-sm text-luxe-charcoal/70">Every detail matters</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-luxe-cream/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Values</h2>
            <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
              The principles that guide us every day in creating beautiful accessories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-luxe-cream rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Quality Craftsmanship</h3>
              <p className="text-luxe-charcoal/70">
                We believe in the beauty of impeccable craftsmanship. Each piece is made
                with attention to detail and a commitment to excellence.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-luxe-cream rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Timeless Design</h3>
              <p className="text-luxe-charcoal/70">
                We create pieces that transcend trends, focusing on timeless design that
                you'll love for years to come.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-luxe-cream rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Sustainability</h3>
              <p className="text-luxe-charcoal/70">
                We're committed to responsible practices, from sourcing materials to
                packaging, minimizing our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Meet Our Team</h2>
            <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
              The talented individuals behind LUXE who bring our vision to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Sophie Laurent', role: 'Founder & Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500' },
              { name: 'Thomas Moreau', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500' },
              { name: 'Emma Chen', role: 'Master Artisan', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500' },
              { name: 'Marcus Johnson', role: 'Materials Specialist', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500' }
            ].map((member) => (
              <div key={member.name} className="text-center hover-card-rise">
                <div className="mb-4 overflow-hidden rounded-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-48 h-48 object-cover mx-auto transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-luxe-charcoal/70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
