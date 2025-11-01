'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import frTranslations from '../locales/fr.json';
import esTranslations from '../locales/es.json';

const translations = {
  fr: frTranslations,
  es: esTranslations,
};

export type Locale = 'fr' | 'es';

interface TranslationContextType {
  locale: Locale;
  changeLocale: (newLocale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    // Get locale from localStorage or browser
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'fr' || savedLocale === 'es')) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    // Dispatch custom event to notify all components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLocale }));
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (_, paramKey) => String(params[paramKey] || ''));
    }

    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return context;
}