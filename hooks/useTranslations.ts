"use client";

import { usePathname } from 'next/navigation';
import { translations, type Language, type TranslationKeys } from '@/translations';

export function useTranslations(): TranslationKeys {
  const pathname = usePathname();
  
  // Determine language from pathname
  let language: Language = 'pt'; // default to Portuguese
  
  if (pathname.startsWith('/en-us')) {
    language = 'en';
  } else if (pathname.startsWith('/es-ar')) {
    language = 'es';
  }
  
  return translations[language];
}

// Helper function to get nested translation values
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || '';
}
