import { setupI18nNamespaces } from '@nexus/i18n';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const baseUrl = import.meta.env.BASE_URL;

const loadPath = `${baseUrl}locales/{{lng}}/{{ns}}.json`;

const ns = setupI18nNamespaces('pg');

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns,
    defaultNS: 'nexus',
    fallbackNS: 'nexus',
    fallbackLng: 'en',
    saveMissing: true,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true
    },
    backend: {
      loadPath
    }
  });

export default i18next;
