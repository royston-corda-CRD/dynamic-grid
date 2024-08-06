import * as pgEn from '@locales/en/pg.json';
import * as pgEnUs from '@locales/en-US/pg.json';
import * as pgEs from '@locales/es/pg.json';
import { CustomResource, generateI18nInitForTests } from '@nexus/i18n';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const pgResource: CustomResource = {
  en: {
    pg: {
      ...pgEn
    }
  },
  'en-US': {
    pg: {
      ...pgEnUs
    }
  },
  es: {
    pg: {
      ...pgEs
    }
  }
};

i18next.use(initReactI18next).init(generateI18nInitForTests(pgResource));

export default i18next;
