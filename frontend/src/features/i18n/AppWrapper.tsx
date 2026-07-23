import React, { useEffect } from 'react';
import { LanguageProvider } from './components/LanguageProvider';
import { injectLanguageSelector } from './utils/injector';

// This component auto-injects the language selector into the DOM
export const I18nAppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Inject language selector into header after mount
    injectLanguageSelector();
  }, []);

  return <LanguageProvider>{children}</LanguageProvider>;
};

// Or use this in main.tsx instead:
// <I18nAppWrapper><App /></I18nAppWrapper>