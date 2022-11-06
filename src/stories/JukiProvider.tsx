import React, { PropsWithChildren } from 'react';
import { JukiBaseUiProvider } from '../components';

export const JukiProvider = ({ children }: PropsWithChildren) => {
  return (
    <JukiBaseUiProvider
      // utilsServiceUrl="https://utils-back-v1.juki.app"
      utilsServiceUrl="http://localhost:3005"
      utilsServiceApiVersion="api/v1"
      utilsUiUrl="https://utils.juki.app"
      tokenName="juki-token"
      utilsSocketServiceUrl="http://localhost:3005"
    >
      {children}
    </JukiBaseUiProvider>
  );
};
