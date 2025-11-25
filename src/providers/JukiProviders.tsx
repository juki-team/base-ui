import { memo, PropsWithChildren } from 'react';
import { useUserTrack } from '../components/hooks/useUserTrack';
import { JukiAblyInitializer } from './JukiAblyInitializer';
import { JukiLastPathInitializer } from './JukiLastPathInitializer';
import { JukiPageInitializer } from './JukiPageInitializer';
import { JukiRouterInitializer } from './JukiRouterInitializer';
import { JukiRouterBaseProps, JukiRouterInitializerProps } from './JukiRouterInitializer/types';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { SoundInitializer } from './SoundInitializer';
import { JukiProvidersProps } from './types';

const UserTrack = memo(function UserTrack() {
  useUserTrack();
  return null;
});

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => {
  
  const {
    children,
    components,
    multiCompanies,
    onSeeMyProfile,
    router: {
      routeParams,
      pushRoute,
      replaceRoute,
      reloadRoute,
      pathname,
      isLoadingRoute,
      setSearchParams,
      appendSearchParams,
      searchParams,
      deleteSearchParams,
    },
    initialLastPath,
  } = props;
  
  const baseProps: JukiRouterBaseProps = {
    routeParams,
    pushRoute,
    replaceRoute,
    reloadRoute,
    pathname,
    isLoadingRoute,
  };
  
  const hasSearch = !!searchParams && !!appendSearchParams && !!setSearchParams && !!deleteSearchParams;
  
  const routerProps: JukiRouterInitializerProps = hasSearch
    ? {
      ...baseProps,
      searchParams,
      appendSearchParams,
      setSearchParams,
      deleteSearchParams,
    }
    : baseProps;
  
  return (
    <>
      <JukiUserProvider>
        <JukiUIProvider components={components} multiCompanies={multiCompanies} onSeeMyProfile={onSeeMyProfile}>
          {children}
          <UserTrack />
        </JukiUIProvider>
      </JukiUserProvider>
      <JukiAblyInitializer />
      <SoundInitializer />
      <JukiLastPathInitializer initialLastPath={initialLastPath} />
      <JukiPageInitializer />
      <JukiRouterInitializer {...routerProps} />
    </>
  );
};
