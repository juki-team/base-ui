import { Language } from '@juki-team/commons';
import { createInstance, i18n } from 'i18next';
import React, { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { JukiProviders } from '../../contexts';
import { jukiApiSocketManager } from '../../settings';
import { SubmissionModal, UserPreviewModal } from '../templates';
import { MockupLoginButton } from './MockupLoginButton';
import { MockupToggleThemeButton } from './MockupToggleThemeButton';
import './styles.scss';

enum TestPath {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

const i18nInstance = createInstance() as i18n;

const i18nConfig = {
  locales: [ Language.ES, Language.EN ],
  defaultLocale: Language.ES,
  namespaces: [ 'translation' ],
};

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
  backend: {
    backends: [
      // resourcesToBackend(localResources),
    ],
    backendOptions: [],
  },
});

export const MockupJukiProvider = ({ children }: PropsWithChildren) => {
  
  // const serviceUrl = 'https://service.juki.app/api/v1';
  const serviceUrl = 'https://api.juki.app/v2';
  // const serviceUrl = 'http://localhost:3005';
  const serviceV2Url = 'https://api.juki.app/v2';
  // const socketServiceUrl = 'wss://im7lou2on3.execute-api.us-east-1.amazonaws.com/production';
  // const socketServiceUrl = 'wss://im7lou2on3.execute-api.us-east-1.amazonaws.com/v1/';
  const socketServiceUrl = 'wss://websocket.juki.app';
  // useEffect(() => {
  jukiApiSocketManager.setSocketSettings(socketServiceUrl);
  jukiApiSocketManager.setApiSettings(serviceUrl, serviceV2Url, 'juki-token');
  // }, []);
  
  return (
    <JukiProviders<TestPath>
      // serviceApiUrl={serviceUrl + '/api/v1'}
      // serviceApiV2Url={serviceV2Url}
      // tokenName="juki-token"
      // socketServiceUrl={socketServiceUrl}
      router={{
        pathname: '',
        routeParams: {},
        pushRoute: () => null,
        replaceRoute: () => null,
        reloadRoute: () => null,
      }}
      initialLastPath={{
        [TestPath.USER]: { pathname: '', searchParams: new URLSearchParams() },
        [TestPath.ADMIN]: { pathname: '', searchParams: new URLSearchParams() },
      }}
    >
      <SWRConfig>
        <UserPreviewModal key="user-preview-modal" />
        <SubmissionModal />
        {/*<JukiSocketAlert />*/}
        {children}
        <MockupLoginButton />
        <MockupToggleThemeButton />
      </SWRConfig>
    </JukiProviders>
  );
};
