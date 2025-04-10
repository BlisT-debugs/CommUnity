// LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translateText } from '@/utils/stringUtils';

type LanguageContextType = {
  language: string;
  changeLanguage: (language: string) => void;
  t: (text: string) => string;
  translateAsync: (text: string) => Promise<string>;
  isRtl: boolean;
  supportedLanguages: { code: string; name: string }[];
};

const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'mr', name: 'Marathi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ar', name: 'Arabic' },
];

const rtlLanguages = ['ar', 'he', 'ur'];

const translations: Record<string, Record<string, string>> = {
  es: {
    'Search': 'Buscar',
    'Communities': 'Comunidades',
    'Issues': 'Problemas',
    'Create Issue': 'Crear Problema',
    'Dashboard': 'Panel',
    'My Communities': 'Mis Comunidades',
  },
  hi: {
    'Search': 'खोज',
    'Communities': 'समुदाय',
    'Issues': 'समस्याएं',
    'Create Issue': 'समस्या बनाएं',
    'Dashboard': 'डैशबोर्ड',
    'My Communities': 'मेरे समुदाय',
  },
  fr: {
    'Search': 'Rechercher',
    'Communities': 'Communautés',
    'Issues': 'Problèmes',
    'Create Issue': 'Créer un Problème',
    'Dashboard': 'Tableau de Bord',
    'My Communities': 'Mes Communautés',
  },
  ar: {
    'Search': 'بحث',
    'Communities': 'مجتمعات',
    'Issues': 'قضايا',
    'Create Issue': 'إنشاء قضية',
    'Dashboard': 'لوحة التحكم',
    'My Communities': 'مجتمعاتي',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
  t: (text) => text,
  translateAsync: async (text) => text,
  isRtl: false,
  supportedLanguages,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getSavedOrBrowserLanguage = () => {
    const saved = localStorage.getItem('preferred-language');
    if (saved && supportedLanguages.some(lang => lang.code === saved)) return saved;

    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages.some(lang => lang.code === browserLang)) return browserLang;

    return 'en';
  };

  const [language, setLanguage] = useState(getSavedOrBrowserLanguage);

  useEffect(() => {
    const newIsRtl = rtlLanguages.includes(language);
    document.documentElement.dir = newIsRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (text: string): string => {
    if (language === 'en') return text;
    return translations[language]?.[text] || text;
  };

  const translateAsync = async (text: string): Promise<string> => {
    if (language === 'en') return text;
    try {
      return await translateText(text, language);
    } catch (err) {
      console.error('Translation error:', err);
      return text;
    }
  };

  const changeLanguage = (newLanguage: string) => {
    if (supportedLanguages.some(lang => lang.code === newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      t,
      translateAsync,
      isRtl: rtlLanguages.includes(language),
      supportedLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
