
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TimelineEvent = ({ 
  year, 
  title, 
  description 
}: { 
  year: string; 
  title: string; 
  description: string;
}) => (
  <div className="flex mb-12">
    <div className="mr-6">
      <div className="w-16 h-16 rounded-full bg-luxe-cream flex items-center justify-center border-2 border-luxe-gold">
        <span className="text-luxe-gold font-serif font-medium">{year}</span>
      </div>
      <div className="h-full w-0.5 bg-luxe-gold/30 ml-8 mt-2"></div>
    </div>
    <div className="flex-1 pt-2">
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-luxe-charcoal/70">{description}</p>
    </div>
  </div>
);

const OurStoryPage = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1500" 
            alt="Our Story" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Our Story
            </h1>
            <p className="text-white/85 text-lg mb-8">
              From humble beginnings to a global presence, discover the journey behind LUXE.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-luxe-charcoal rounded-full"
            >
              <Link to="/about" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to About
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Founder's Note */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1669324030662-0bfc5a03f9d7?q=80&w=1000" 
                alt="Founder" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            
            <div>
              <h5 className="text-luxe-gold uppercase tracking-wider mb-3">A Note from Our Founder</h5>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">The Vision Behind LUXE</h2>
              <p className="text-luxe-charcoal/70 mb-4">
                "I started LUXE with a dream to create pieces that would become part of people's stories.
                As a designer, I wanted to craft accessories that weren't just beautiful, but meaningful—items
                that would be cherished and passed down through generations.
              </p>
              <p className="text-luxe-charcoal/70 mb-4">
                Each collection is inspired by my travels, by art, by conversations with extraordinary people.
                I believe that the objects we choose to wear and surround ourselves with should bring us joy
                and reflect who we are.
              </p>
              <p className="text-luxe-charcoal/70 mb-4">
                Today, LUXE has grown beyond my wildest dreams, but our core values remain the same: exceptional
                craftsmanship, timeless design, and a deep appreciation for beauty in all its forms."
              </p>
              <p className="text-right text-luxe-gold font-serif italic mt-6">— Sophie Laurent, Founder</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-16 bg-luxe-cream/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Journey</h2>
            <p className="text-luxe-charcoal/70 max-w-2xl mx-auto">
              The key moments that have shaped LUXE over the years.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <TimelineEvent 
              year="2010" 
              title="The Beginning"
              description="LUXE was founded in a small Parisian studio, with a collection of just 12 handcrafted pieces."
            />
            
            <TimelineEvent 
              year="2012" 
              title="First Flagship Store"
              description="We opened our first store in the heart of Paris, showcasing our growing collection to a wider audience."
            />
            
            <TimelineEvent 
              year="2015" 
              title="International Expansion"
              description="LUXE expanded to London and New York, bringing our timeless designs to a global market."
            />
            
            <TimelineEvent 
              year="2017" 
              title="Sustainability Initiative"
              description="We launched our commitment to sustainable practices, reimagining our supply chain and packaging."
            />
            
            <TimelineEvent 
              year="2020" 
              title="A Decade of Design"
              description="We celebrated our 10-year anniversary with a special collection that revisited our most iconic pieces."
            />
            
            <TimelineEvent 
              year="2023" 
              title="Looking Forward"
              description="Today, LUXE continues to grow and innovate, staying true to our founding principles while embracing new possibilities."
            />
          </div>
        </div>
      </section>
      
      {/* Values & Philosophy */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">Our Philosophy</h2>
            
            <div className="prose prose-lg mx-auto text-luxe-charcoal/80">
              <p>
                At LUXE, we believe that accessories are more than just adornments—they're expressions
                of personal style, markers of significant moments, and heirlooms that carry stories.
              </p>
              
              <p>
                Our design philosophy centers on the balance between timelessness and innovation.
                We create pieces that feel contemporary yet enduring, drawing inspiration from
                art, architecture, nature, and cultural traditions from around the world.
              </p>
              
              <p>
                We're committed to exceptional craftsmanship, working with skilled artisans who
                share our passion for quality and detail. Many of our pieces are still made by
                hand, using techniques that have been perfected over generations.
              </p>
              
              <p>
                Sustainability is integral to our approach. We carefully source materials,
                prioritizing ethical suppliers and recycled metals whenever possible. We're
                continuously working to reduce our environmental footprint and contribute
                positively to the communities we work with.
              </p>
              
              <p>
                Above all, we create for you—our customers. Your stories, your moments of
                joy when discovering the perfect piece, your tradition of passing down a
                treasured LUXE item to someone special—these are what inspire us every day.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-luxe-charcoal text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Become Part of Our Story</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We invite you to explore our collections and find pieces that resonate with your
            own style and story.
          </p>
          <Button asChild className="bg-luxe-gold hover:bg-luxe-gold/90 text-white rounded-full">
            <Link to="/collections">
              Explore Our Collections
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OurStoryPage;
