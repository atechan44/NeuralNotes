import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, LANGUAGES } from '../config/constants';

// Çeviri dosyalarını içe aktar
import enTranslation from './en.json';
import trTranslation from './tr.json';

// Kaydedilmiş dil tercihini al veya varsayılan dili kullan
const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;

// i18next yapılandırması
i18n
  .use(initReactI18next)
  .init({
    resources: {
      [LANGUAGES.EN]: {
        translation: enTranslation
      },
      [LANGUAGES.TR]: {
        translation: trTranslation
      }
    },
    lng: savedLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false // React zaten XSS'e karşı güvenlidir
    },
    react: {
      useSuspense: true // Suspense ile i18next kullanımı
    },
    // Eksik çevirileri konsola log etme (geliştirme ortamında)
    debug: process.env.NODE_ENV === 'development'
  });

// Dil değiştiğinde localStorage'a kaydet
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  // HTML lang attribute güncelleme
  document.documentElement.lang = lng;
});

export default i18n;
