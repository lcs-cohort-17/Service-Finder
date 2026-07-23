import React, { Suspense, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config';

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="i18n-loading">
    <div className="i18n-spinner"></div>
  </div>
);

// Inject styles into head
const injectStyles = () => {
  if (document.getElementById('i18n-styles')) return;
  const style = document.createElement('style');
  style.id = 'i18n-styles';
  // Define theme variables with fallbacks
  style.textContent = `
    :root {
      --i18n-primary-color: #007bff;
      --i18n-text-color: #333;
      --i18n-border-color: #ccc;
      --i18n-bg-color: #fff;
      --i18n-spinner-bg: #f3f3f3;
    }
  `;
  style.textContent += `
    /* Language Provider Styles */
    .i18n-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .i18n-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--i18n-primary-color, #007bff);
      border-radius: 50%;
      animation: i18n-spin 1s linear infinite;
    }
    @keyframes i18n-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Language Selector Styles */
    .i18n-selector-wrapper {
      display: flex;
      align-items: center;
      gap: 8px; /* space between label and select */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
    }
    .i18n-selector-label {
      color: var(--i18n-text-color, #333);
    }
    .i18n-selector-wrapper select {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--i18n-border-color, #ccc);
      background-color: var(--i18n-bg-color, #fff);
      color: var(--i18n-text-color, #333);
    }
    /* Example of how you would implement dark mode */
    @media (prefers-color-scheme: dark) {
      :root {
        --i18n-text-color: #eee;
        --i18n-border-color: #555;
        --i18n-bg-color: #222;
        --i18n-spinner-bg: #444;
      }
    }
  `;
  document.head.appendChild(style);
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  useEffect(() => {
    // Inject styles
    injectStyles();
  }, []);

  return (
    // The I18nextProvider initializes i18n.
    // The Suspense component will automatically show the 'fallback'
    // UI until the translations are ready.
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<LoadingFallback />}>
        {children}
      </Suspense>
    </I18nextProvider>
  );
};

export default LanguageProvider;