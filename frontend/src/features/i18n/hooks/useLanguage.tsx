import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
}

const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeLanguage = async (languageCode: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await i18n.changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      return true;
    } catch (error) {
      console.error('Error changing language:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableLanguages = (): Language[] => {
    // Get languages from the resources object in your config
    const supportedLngs = Object.keys(i18n.options.resources || {});
    return supportedLngs.filter(lng => lng !== 'cimode').map(lng => ({ code: lng, name: i18n.getFixedT(lng)('language_name') })) || [];
  };

  const isLanguageSupported = (languageCode: string): boolean => {
    return Object.keys(i18n.options.resources || {}).includes(languageCode);
  };

  useEffect(() => {
    const handleLanguageChange = (lng: string) => setCurrentLanguage(lng);
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  return {
    currentLanguage,
    changeLanguage,
    getAvailableLanguages,
    isLanguageSupported,
    isLoading,
    t
  };
};

export default useLanguage;