import React, { PropsWithChildren } from 'react';
import { JukiUIProvider, JukiUserProvider } from '../../contexts';
import { MockupToggleThemeButton } from './MockupToggleThemeButton';

export const MockupJukiProvider = ({ children }: PropsWithChildren) => {
  // const serviceUrl = 'https://service.juki.app';
  const serviceUrl = 'http://localhost:3005';
  
  return (
    <JukiUIProvider>
      <JukiUserProvider
        utilsServiceUrl={serviceUrl}
        utilsServiceApiVersion="api/v1"
        utilsUiUrl="https://utils.juki.app"
        tokenName="juki-token"
        utilsSocketServiceUrl={serviceUrl}
      >
        {children}
        <MockupToggleThemeButton />
      </JukiUserProvider>
    </JukiUIProvider>
  );
};
