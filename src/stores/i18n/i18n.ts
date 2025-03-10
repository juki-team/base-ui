import type { i18n } from 'i18next';
import i18nConfig from './i18nConfig';

export default async function initTranslations(i18nInstance: i18n) {
  await i18nInstance.init({
    // lng: i18nConfig.defaultLocale,
    // fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: i18nConfig.namespaces[0],
    fallbackNS: i18nConfig.namespaces[0],
    ns: i18nConfig.namespaces,
    preload: i18nConfig.locales,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  }, (err: Error) => {
    if (err) {
      return console.error('error on initI18next', err);
    }
  });
}
