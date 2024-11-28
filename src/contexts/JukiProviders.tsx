import { Status } from '@juki-team/commons';
import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import { ErrorIcon } from '../components/atoms/icons';
import { ButtonLoader } from '../components/molecules/ButtonLoader';
import { useJukiUser } from '../hooks/useJukiUser';
import { JukiLastPathProvider } from './JukiLastPathProvider';
import { JukiPageProvider } from './JukiPageProvider';
import { JukiRouterProvider } from './JukiRouterProvider';
import { JukiTasksProvider } from './JukiTasksProvider/JukiTasksProvider';
import { JukiTProvider } from './JukiTProvider';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { JukiProvidersProps } from './types';

const SocketAlert = ({ children }: PropsWithChildren<{}>) => {
  
  const { socket } = useJukiUser();
  const [ _, setTimestamp ] = useState(0);
  
  const readyState = socket.getReadyState();
  
  return (
    <>
      {children}
      {!(readyState === WebSocket.OPEN) && (
        <div
          data-tooltip-id="jk-tooltip"
          data-tooltip-content="offline, try to reconnect"
          data-tooltip-t-class-name="tt-se"
          style={{ position: 'fixed', left: 'var(--pad-md)', bottom: 'var(--pad-md', zIndex: 1000000 }}
        >
          <ButtonLoader
            className="jk-row bc-er"
            style={{ '--button-background-color': 'var(--t-color-error)' } as CSSProperties}
            onClick={(setLoader) => {
              setLoader(Status.LOADING);
              socket.start();
              setTimeout(() => {
                setTimestamp(Date.now());
                setLoader(Status.NONE);
              }, 1000);
            }}
            icon={<ErrorIcon />}
            size="small"
          />
        </div>
      )}
    </>
  );
};

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => {
  
  const {
    children,
    serviceApiUrl,
    socketServiceUrl,
    serviceApiV2Url,
    tokenName,
    components,
    router,
    i18n,
    initialLastPath,
  } = props;
  
  let jukiTProvider = children;
  
  if (i18n) {
    jukiTProvider = (
      <JukiTProvider i18n={i18n}>
        {children}
      </JukiTProvider>
    );
  }
  
  return (
    <JukiRouterProvider
      searchParams={router.searchParams}
      appendSearchParams={router.appendSearchParams}
      setSearchParams={router.setSearchParams}
      deleteSearchParams={router.deleteSearchParams}
      routeParams={router.routeParams}
      pushRoute={router.pushRoute}
      replaceRoute={router.replaceRoute}
      reloadRoute={router.reloadRoute}
      isLoadingRoute={router.isLoadingRoute}
      pathname={router.pathname}
    >
      <JukiPageProvider>
        <JukiUserProvider
          socketServiceUrl={socketServiceUrl}
          serviceApiUrl={serviceApiUrl}
          serviceApiV2Url={serviceApiV2Url}
          tokenName={tokenName}
        >
          <JukiUIProvider components={components}>
            <JukiLastPathProvider initialLastPath={initialLastPath}>
              <JukiTasksProvider>
                <SocketAlert>
                  {jukiTProvider}
                </SocketAlert>
              </JukiTasksProvider>
            </JukiLastPathProvider>
          </JukiUIProvider>
        </JukiUserProvider>
      </JukiPageProvider>
    </JukiRouterProvider>
  );
};
