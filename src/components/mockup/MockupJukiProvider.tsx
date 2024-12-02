import React, { PropsWithChildren, useEffect } from 'react';
import { JukiProviders } from '../../contexts';
import { jukiApiSocketManager } from '../../settings';
import { UserPreviewModal } from '../templates';
import { MockupLoginButton } from './MockupLoginButton';
import { MockupToggleThemeButton } from './MockupToggleThemeButton';

enum TestPath {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export const MockupJukiProvider = ({ children }: PropsWithChildren) => {
  
  const serviceUrl = 'https://service.juki.app/api/v1';
  // const serviceUrl = 'http://localhost:3005';
  const serviceV2Url = 'https://api.juki.app';
  // const socketServiceUrl = 'wss://im7lou2on3.execute-api.us-east-1.amazonaws.com/production';
  // const socketServiceUrl = 'wss://im7lou2on3.execute-api.us-east-1.amazonaws.com/v1/';
  const socketServiceUrl = 'wss://websocket.juki.app';
  useEffect(() => {
    jukiApiSocketManager.setSocketSettings(socketServiceUrl);
    jukiApiSocketManager.setApiSettings(serviceUrl, serviceV2Url, 'juki-token');
  }, []);
  
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
      <UserPreviewModal key="user-preview-modal" />
      {children}
      <MockupLoginButton />
      <MockupToggleThemeButton />
    </JukiProviders>
  );
};
