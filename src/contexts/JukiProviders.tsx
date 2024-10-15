import { Status } from '@juki-team/commons';
import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ErrorIcon } from '../components/atoms';
import { ButtonLoader } from '../components/molecules';
import { SubmissionModal } from '../components/templates/Submission/Submission';
import { UserPreviewModal } from '../components/templates/UserPreviewModal/UserPreviewModal';
import { jukiSettings } from '../config';
import { useJukiRouter, useJukiUser } from '../hooks';
import { QueryParamKey } from '../types';
import { JukiLastPathProvider } from './JukiLastPathProvider';
import { JukiPageProvider } from './JukiPageProvider';
import { JukiRouterProvider } from './JukiRouterProvider';
import { JukiTasksProvider } from './JukiTasksProvider/JukiTasksProvider';
import { JukiTProvider } from './JukiTProvider';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { JukiProvidersProps } from './types';

const CommonModals = ({ children }: PropsWithChildren<{}>) => {
  
  const { searchParams, deleteSearchParams } = useJukiRouter();
  const userPreviewQuery = searchParams.getAll(QueryParamKey.USER_PREVIEW);
  const [ userPreviewNickname, userPreviewCompanyKey ] = Array.isArray(userPreviewQuery) ? userPreviewQuery as unknown as [ string, string ] : [ userPreviewQuery as string ];
  const { socket } = useJukiUser();
  const [ _, setTimestamp ] = useState(0);
  
  const readyState = socket.getReadyState();
  
  return (
    <>
      <UserPreviewModal
        isOpen={!!searchParams.get(QueryParamKey.USER_PREVIEW)}
        nickname={userPreviewNickname}
        companyKey={userPreviewCompanyKey}
        onClose={() => deleteSearchParams({ name: QueryParamKey.USER_PREVIEW })}
        userHref={jukiSettings.ROUTES.profiles().view({ nickname: userPreviewNickname })}
      />
      {searchParams.get(QueryParamKey.SUBMISSION) && (
        <SubmissionModal submitId={searchParams.get(QueryParamKey.SUBMISSION) as string} />
      )}
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
    utilsUiUrl,
    tokenName,
    components,
    router,
    i18n,
    initialLastPath,
  } = props;
  
  const providers = (
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
          utilsUiUrl={utilsUiUrl}
          tokenName={tokenName}
        >
          <JukiUIProvider components={components}>
            <JukiLastPathProvider initialLastPath={initialLastPath}>
              <JukiTasksProvider>
                <DndProvider backend={HTML5Backend}>
                  <CommonModals>
                    {children}
                  </CommonModals>
                </DndProvider>
              </JukiTasksProvider>
            </JukiLastPathProvider>
          </JukiUIProvider>
        </JukiUserProvider>
      </JukiPageProvider>
    </JukiRouterProvider>
  );
  
  if (i18n) {
    return (
      <JukiTProvider i18n={i18n}>
        {providers}
      </JukiTProvider>
    );
  }
  
  return providers;
};
