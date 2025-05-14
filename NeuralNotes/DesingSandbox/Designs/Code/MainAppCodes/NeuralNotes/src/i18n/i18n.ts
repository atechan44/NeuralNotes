import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from './en.json'
import trTranslations from './tr.json'

const resources = {
  en: {
    translation: enTranslations.translation,
  },
  tr: {
    translation: trTranslations.translation,
  },
}

i18n
  .use(LanguageDetector) // Tarayıcı dilini algılar
  .use(initReactI18next) // i18next'i react-i18next modülüne geçirir
  .init({
    resources,
    fallbackLng: 'en', // Eğer algılanan dil için çeviri yoksa varsayılan dil
    interpolation: {
      escapeValue: false, // React zaten XSS koruması yaptığı için gereksiz
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'], // Kullanıcının dil tercihini localStorage'da saklar
    },
  })

export default i18n