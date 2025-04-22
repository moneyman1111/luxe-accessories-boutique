
import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    'hero.title': 'Timeless Accessories for Every Occasion',
    'hero.subtitle': 'Discover our collection of handcrafted, premium-quality accessories designed to elevate your style.',
    'shop.collection': 'Shop Collection',
    'our.story': 'Our Story',
    'new.arrivals': 'New Arrivals',
    'view.all': 'View All',
  },
  ru: {
    'hero.title': 'Вечная классика на все случаи жизни',
    'hero.subtitle': 'Откройте для себя нашу коллекцию ручной работы, аксессуары премиум-класса, созданные для того, чтобы подчеркнуть ваш стиль.',
    'shop.collection': 'Посмотреть коллекцию',
    'our.story': 'О нас',
    'new.arrivals': 'Новинки',
    'view.all': 'Смотреть все',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
