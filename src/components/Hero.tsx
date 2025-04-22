
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';

const Hero = () => {
  const { language } = useTranslation();
  
  const slides = [
    {
      id: 1,
      title: language === 'en' ? 'Timeless Elegance' : 'Вечная Элегантность',
      subtitle: language === 'en' ? 'Discover our new collection of handcrafted jewelry' : 'Откройте для себя нашу новую коллекцию ювелирных изделий ручной работы',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      buttonText: language === 'en' ? 'Shop Now' : 'Купить Сейчас',
      buttonLink: '/collections'
    },
    {
      id: 2,
      title: language === 'en' ? 'Bold Statements' : 'Смелые Заявления',
      subtitle: language === 'en' ? 'Express yourself with our statement pieces' : 'Выразите себя с помощью наших выразительных украшений',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      buttonText: language === 'en' ? 'Explore' : 'Исследовать',
      buttonLink: '/collections/gold'
    },
    {
      id: 3,
      title: language === 'en' ? 'Gift of Luxury' : 'Подарок Роскоши',
      subtitle: language === 'en' ? 'Find the perfect gift for your loved ones' : 'Найдите идеальный подарок для ваших близких',
      image: 'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      buttonText: language === 'en' ? 'View All' : 'Посмотреть Все',
      buttonLink: '/collections/best-sellers'
    }
  ];
  
  return (
    <CarouselContent>
      {slides.map((slide) => (
        <CarouselItem key={slide.id}>
          <div className="relative h-[70vh] w-full">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
              <h1 className="text-white text-4xl md:text-6xl font-serif mb-4">{slide.title}</h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">{slide.subtitle}</p>
              <Link to={slide.buttonLink}>
                <Button size="lg" className="bg-luxe-gold hover:bg-luxe-gold/90 text-white border-none">
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export default Hero;
