import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import cn from './zh.json';
import ko from './ko.json';
i18n.on('initialized', () => {
  console.log('123123', 123123)
});
i18n.on('languageChanged', () => { });
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['common', 'error', 'home'],
    defaultNS: 'common',
    resources: {
      en,
      cn,
      ko,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
