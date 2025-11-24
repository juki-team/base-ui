import { Language } from '@juki-team/commons';
import { createInstance, i18n } from 'i18next';
import { create } from 'zustand';
import { getAuthorizedRequest } from '../../components/helpers';
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
    try {
      const [ dataEN, dataES ] = await Promise.all([
        getAuthorizedRequest(jukiApiManager.API_V2.locale.get({
          params: { locale: Language.EN, namespace },
        }).url),
        getAuthorizedRequest(jukiApiManager.API_V2.locale.get({
          params: { locale: Language.ES, namespace },
        }).url),
      ]);
      const currentEN = i18nInstance.getResourceBundle(Language.EN, namespace);
      const currentES = i18nInstance.getResourceBundle(Language.ES, namespace);
      const hasChangedEN = JSON.stringify(currentEN) !== dataEN;
      const hasChangedES = JSON.stringify(currentES) !== dataES;
      
      if (hasChangedEN) {
        i18nInstance.addResourceBundle(Language.EN, namespace, JSON.parse(dataEN));
      }
      if (hasChangedES) {
        i18nInstance.addResourceBundle(Language.ES, namespace, JSON.parse(dataES));
      }
      
      if (hasChangedEN || hasChangedES) {
        set({
          i18n: {
            ...i18nInstance,
            t: ((...args: Parameters<i18n['t']>) => i18nInstance.t(...args)) as i18n['t'],
          },
        });
      }
    } catch (error) {
      console.error('error on load resources', { error });
    }
  },
}));
