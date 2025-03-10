import { Language } from '@juki-team/commons';
import { createInstance, i18n } from 'i18next';
import { create } from 'zustand';
import { jukiApiSocketManager } from '../../settings';
import initTranslations from './i18n';

const i18nInstance = createInstance() as i18n;
void initTranslations(i18nInstance);

interface I18nState {
  i18n: i18n;
  changeLanguage: (lng: string) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  i18n: i18nInstance,
  changeLanguage: async (lng) => {
    await i18nInstance.changeLanguage(lng);
    set((state) => ({ ...state }));
  },
  load: async (namespace = 'translation') => {
    const [ dataEN, dataES ] = await Promise.all([
      fetch(jukiApiSocketManager.API_V1.locale.get({
        params: { locale: Language.EN, namespace },
      }).url).then(res => res.json()),
      fetch(jukiApiSocketManager.API_V1.locale.get({
        params: { locale: Language.ES, namespace },
      }).url).then(res => res.json()),
    ]);
    
    i18nInstance.addResourceBundle(Language.EN, namespace, dataEN);
    i18nInstance.addResourceBundle(Language.ES, namespace, dataES);
    set((state) => ({ ...state }));
  },
}));
