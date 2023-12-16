import React, { PropsWithChildren } from 'react';
import { JukiProviders } from '../../contexts';
import { MockupToggleThemeButton } from './MockupToggleThemeButton';

export const MockupJukiProvider = ({ children }: PropsWithChildren) => {
  
  // const serviceUrl = 'https://service.juki.app';
  const serviceUrl = 'http://localhost:3005';
  
  return (
    <JukiProviders
      serviceApiUrl={serviceUrl + '/api/v1'}
      utilsUiUrl="https://utils.juki.app"
      tokenName="juki-token"
      socketServiceUrl={serviceUrl}
      router={{
        pathname: '',
        routeParams: {},
        pushRoute: () => null,
        replaceRoute: () => null,
        reloadRoute: () => null,
      }}
    >
      {children}
      <MockupToggleThemeButton />
    </JukiProviders>
  );
};
