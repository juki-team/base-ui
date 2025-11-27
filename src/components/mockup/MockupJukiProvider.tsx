import { Language } from '@juki-team/commons';
import { createInstance, i18n } from 'i18next';
import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { EMPTY_COMPANY, EMPTY_USER } from '../../constants';
import { JukiProviders } from '../../providers';
import { UserStoreProvider } from '../../stores/user/useUserStore';
import { MockupLoginButton } from './MockupLoginButton';
import { MockupToggleThemeButton } from './MockupToggleThemeButton';
import './styles.scss';
import '../../styles/index.scss';
import '../../styles/vendor/index.scss';

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
  return (
    <UserStoreProvider initialUser={{ user: EMPTY_USER, company: EMPTY_COMPANY, isLoading: false }}>
      <JukiProviders<TestPath>
        // serviceApiUrl={serviceUrl + '/api/v1'}
        // serviceApiV2Url={serviceV2Url}
        // tokenName="juki-token"
        // socketServiceUrl={socketServiceUrl}
        multiCompanies={false}
        onSeeMyProfile={() => {
        }}
        router={{
          pathname: '',
          routeParams: {},
          pushRoute: () => null,
          replaceRoute: () => null,
          reloadRoute: () => null,
          isLoadingRoute: false,
        }}
        initialLastPath={{
          [TestPath.USER]: { pathname: '', searchParams: new URLSearchParams() },
          [TestPath.ADMIN]: { pathname: '', searchParams: new URLSearchParams() },
        }}
      >
        <SWRConfig>
          {children}
          <MockupLoginButton />
          <MockupToggleThemeButton />
        </SWRConfig>
      </JukiProviders>
    </UserStoreProvider>
  );
};
