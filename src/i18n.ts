// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from '@/locales/en/translation.json'
import translationCN from '@/locales/cn/translation.json'

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  cn: {
    translation: translationCN
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'cn', // default language
    fallbackLng: 'cn',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
