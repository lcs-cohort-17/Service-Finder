import React from 'react';
import { createRoot } from 'react-dom/client';
import LanguageSelector from '../components/LanguageSelector';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config';

let isInjected = false;

export const injectLanguageSelector = () => {
  if (isInjected) return;
  
  // Find header element (adjust selector based on your app)
  const header = document.querySelector('header') || document.querySelector('.header');
  
  if (header) {
    const container = document.createElement('div');
    container.id = 'i18n-selector-container';
    container.style.display = 'inline-block';
    container.style.marginLeft = 'auto';
    
    // Find a good spot in header
    const rightSection = header.querySelector('.header-right') || 
                        header.querySelector('.right') || 
                        header.lastElementChild;
    
    if (rightSection) {
      rightSection.appendChild(container);
    } else {
      header.appendChild(container);
    }
    
    // Render the language selector
    const root = createRoot(container);
    root.render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    
    isInjected = true;
  } else {
    // Retry after DOM load
    setTimeout(injectLanguageSelector, 100);
  }
};

// Auto-inject when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLanguageSelector);
  } else {
    injectLanguageSelector();
  }
}