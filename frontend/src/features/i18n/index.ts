// Public exports
export { default as LanguageProvider } from './components/LanguageProvider';
export { default as LanguageSelector } from './components/LanguageSelector';
export { default as useLanguage } from './hooks/useLanguage';
export { default as i18n } from './config';
export { useTranslation } from 'react-i18next';

// Re-export for convenience
export * from './config';