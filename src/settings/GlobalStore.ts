import { consoleWarn, Language } from '@juki-team/commons';
import type { i18n } from 'i18next';
import { jukiApiSocketManager } from './index';

export class GlobalStore {
  private _I18N = { t: (key: string) => key, mocked: true } as unknown as i18n;
  
  getI18n() {
    // @ts-ignore
    if (this._I18N.mocked) {
      consoleWarn('i18n not configured');
    }
    return this._I18N;
  }
  
  async reloadI18n() {
    const namespace = 'translation';
    const [ dataEN, dataES ] = await Promise.all([
      fetch(jukiApiSocketManager.API_V1.locale.get({
        params: { locale: Language.EN, namespace },
      }).url).then(res => res.json()),
      fetch(jukiApiSocketManager.API_V1.locale.get({
        params: { locale: Language.ES, namespace },
      }).url).then(res => res.json()),
    ]);
    
    this._I18N.addResourceBundle(Language.EN, namespace, dataEN);
    this._I18N.addResourceBundle(Language.ES, namespace, dataES);
    this._I18N.emit('reloadI18n', { dataEN, dataES });
  }
  
  async setI18n(i18n: i18n) {
    this._I18N = i18n;
    await this.reloadI18n();
  }
}
