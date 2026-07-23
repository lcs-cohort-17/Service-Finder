import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en/translation.json';
import afTranslation from './locales/af/translation.json';
import xhTranslation from './locales/xh/translation.json';
import zuTranslation from './locales/zu/translation.json';

const resources = {
  en: { translation: enTranslation },
  af: { translation: afTranslation },
  xh: { translation: xhTranslation },
  zu: { translation: zuTranslation }
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;