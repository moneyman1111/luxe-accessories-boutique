
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="px-3 py-2"
    >
      {language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
};

export default LanguageSwitcher;
