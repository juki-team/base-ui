import React, { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SubmissionModal } from '../components/templates/Submission/Submission';
import { UserPreviewModal } from '../components/templates/UserPreviewModal/UserPreviewModal';
import { jukiSettings } from '../config';
import { useJukiRouter } from '../hooks';
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
            <JukiLastPathProvider initialLastPath={initialLastPath}>\
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
