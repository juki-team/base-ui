import React, { PropsWithChildren } from 'react';
import { JukiProviders } from '../../contexts';
import { MockupLoginButton } from './MockupLoginButton';
import { MockupToggleThemeButton } from './MockupToggleThemeButton';

enum TestPath {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export const MockupJukiProvider = ({ children }: PropsWithChildren) => {
  
  const serviceUrl = 'https://service.juki.app';
  // const serviceUrl = 'http://localhost:3005';
  // const socketServiceUrl = 'wss://im7lou2on3.execute-api.us-east-1.amazonaws.com/production';
  const socketServiceUrl = 'wss://im7lou2on3.execute-api.us-east-1.amazonaws.com/v1/';
  
  return (
    <JukiProviders<TestPath>
      serviceApiUrl={serviceUrl + '/api/v1'}
      utilsUiUrl="https://utils.juki.app"
      tokenName="juki-token"
      socketServiceUrl={socketServiceUrl}
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
      {children}
      <MockupLoginButton />
      <MockupToggleThemeButton />
    </JukiProviders>
  );
};
