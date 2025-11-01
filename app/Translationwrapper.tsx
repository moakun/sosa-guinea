'use client';

import { TranslationProvider } from './../hooks/useTranslations';
import { ReactNode } from 'react';

export default function TranslationWrapper({ children }: { children: ReactNode }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}