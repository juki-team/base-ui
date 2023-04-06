import React, { PropsWithChildren } from 'react';
import { JukiUIProvider, JukiUserProvider } from '../components';

export const JukiProvider = ({ children }: PropsWithChildren) => {
  return (
    <JukiUIProvider>
      <JukiUserProvider
        // utilsServiceUrl="https://submissions-service-dev-1.juki.app"
        // utilsServiceUrl="http://juki-submissions-service-v1-dev.us-east-1.elasticbeanstalk.com"
        // utilsServiceUrl="https://submissions-service.juki.app"
        // utilsServiceUrl="https://utils-back-v1.juki.app"
        utilsServiceUrl="https://submissions-service.juki.app"
        // utilsServiceUrl="http://localhost:3005"
        utilsServiceApiVersion="api/v1"
        utilsUiUrl="https://utils.juki.app"
        tokenName="juki-token"
        // utilsSocketServiceUrl="https://submissions-service-dev-1.juki.app"
        // utilsSocketServiceUrl="http://juki-submissions-service-v1-dev.us-east-1.elasticbeanstalk.com"
        // utilsSocketServiceUrl="https://submissions-service.juki.app"
        // utilsSocketServiceUrl="https://utils-back-v1.juki.app"
        utilsSocketServiceUrl="https://submissions-service.juki.app"
      >
        {children}
      </JukiUserProvider>
    </JukiUIProvider>
  );
};
