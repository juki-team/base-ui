import { consoleWarn, Language } from '@juki-team/commons';
import { createInstance, i18n } from 'i18next';
import { create } from 'zustand';
import { jukiApiManager } from '../../settings';
import initTranslations from './i18n';

const i18nInstance = createInstance() as i18n;
void initTranslations(i18nInstance);

interface I18nState {
  i18n: i18n,
  changeLanguage: (lng: string) => void,
  loadResources: () => Promise<void>,
}

export const useI18nStore = create<I18nState>((set) => ({
  i18n: i18nInstance,
  changeLanguage: async (lng) => {
    if (i18nInstance.language !== lng) {
      await i18nInstance.changeLanguage(lng);
      set({
        i18n: {
          ...i18nInstance,
          t: ((...args: Parameters<i18n['t']>) => i18nInstance.t(...args)) as i18n['t'],
        },
      });
    }
  },
  loadResources: async (namespace = 'translation') => {
    if (!jukiApiManager.SERVICE_API_V1_URL) {
      consoleWarn('service api v1 url not set');
      return;
    }
    try {
      const [ dataEN, dataES ] = await Promise.all([
        fetch(jukiApiManager.API_V1.locale.get({
          params: { locale: Language.EN, namespace },
        }).url).then(res => res.json()),
        fetch(jukiApiManager.API_V1.locale.get({
          params: { locale: Language.ES, namespace },
        }).url).then(res => res.json()),
      ]);
      i18nInstance.addResourceBundle(Language.EN, namespace, dataEN);
      i18nInstance.addResourceBundle(Language.ES, namespace, dataES);
      set({
        i18n: {
          ...i18nInstance,
          t: ((...args: Parameters<i18n['t']>) => i18nInstance.t(...args)) as i18n['t'],
        },
      });
    } catch (error) {
      console.error('error on load resources', { error });
    }
  },
}));
