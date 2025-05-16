import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Language detector hata veriyor, şimdilik kaldırılıyor

// Çeviri dosyalarını içe aktar
import enTranslation from './en.json';
import trTranslation from './tr.json';

// Configure i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      tr: {
        translation: trTranslation,
      },
    },
    lng: localStorage.getItem('language') || 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: true,
    },
  });

// Dil değiştiğinde localStorage'a kaydet
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  // HTML lang attribute güncelleme
  document.documentElement.lang = lng;
});

export default i18n;
