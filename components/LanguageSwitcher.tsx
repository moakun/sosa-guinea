'use client';

import React from 'react';
import { useTranslations, Locale } from '@/hooks/useTranslations';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { locale, changeLocale } = useTranslations();

  const languages = [
    { code: 'fr' as Locale, label: 'Français', flag: '🇫🇷' },
    { code: 'es' as Locale, label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="relative inline-block group">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white-500 rounded-lg hover:bg-blue-600 transition-colors">
        <Globe className="h-5 w-5" />
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === locale)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white-500 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLocale(lang.code)}
            className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-3 ${
              locale === lang.code ? 'bg-blue-100 font-semibold' : ''
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="text-gray-800">{lang.label}</span>
            {locale === lang.code && (
              <span className="ml-auto text-blue-500">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;