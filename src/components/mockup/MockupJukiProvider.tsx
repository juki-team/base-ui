import { Language } from '@juki-team/commons/enums';
import type { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { EMPTY_ORGANIZATION, EMPTY_USER, SWR_CONFIG } from '../../constants';
import { UserStoreProvider } from '../../stores/user/useUserStore';
import { JukiI18nBridge } from '../providers/JukiI18nBridge/JukiI18nBridge';
import { JukiProviders } from '../providers/JukiProviders';
import { MockupLoginButton } from './MockupLoginButton';
import { MockupToggleThemeButton } from './MockupToggleThemeButton';
import './styles.scss';
import '../../styles/index.scss';
import '../../styles/vendor/index.scss';

enum TestPath {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const MOCK_DICTS: Record<string, Record<string, string>> = { [Language.EN]: {}, [Language.ES]: {} };

export const MockupJukiProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserStoreProvider initialUser={{ user: EMPTY_USER, organization: EMPTY_ORGANIZATION, isLoading: true }}>
      <JukiI18nBridge dicts={MOCK_DICTS}>
        <JukiProviders<TestPath>
          // serviceApiUrl={serviceUrl + '/api/v1'}
          // serviceApiV2Url={serviceV2Url}
          // tokenName="juki-token"
          // socketServiceUrl={socketServiceUrl}
          multiOrganizations={false}
          onSeeMyProfile={() => {
            // mockup: no profile navigation in tests/stories
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
          <SWRConfig value={SWR_CONFIG}>{children}</SWRConfig>
        </JukiProviders>
        <MockupLoginButton />
        <MockupToggleThemeButton />
      </JukiI18nBridge>
    </UserStoreProvider>
  );
};
