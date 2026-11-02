import { memo, PropsWithChildren } from 'react';
import { useOwnPresence } from '../hooks/useOwnPresence';
import { JukiAblyInitializer, JukiAblySpaceProvider } from './JukiAblyInitializer';
import { JukiLastPathInitializer } from './JukiLastPathInitializer';
import { JukiPageInitializer } from './JukiPageInitializer';
import { JukiRouterInitializer } from './JukiRouterInitializer';
import { JukiRouterBaseProps, JukiRouterInitializerProps } from './JukiRouterInitializer/types';
import { JukiUIProvider } from './JukiUIProvider';
import { JukiUserProvider } from './JukiUserProvider';
import { SoundInitializer } from './SoundInitializer';
import { JukiProvidersProps } from './types';

const OwnPresence = memo(function OwnPresence() {
  useOwnPresence();
  return null;
});

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => {
  
  const {
    children,
    components,
    multiOrganizations,
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
      <JukiUIProvider components={components} multiOrganizations={multiOrganizations} onSeeMyProfile={onSeeMyProfile}>
        <JukiAblySpaceProvider>
          {children}
        </JukiAblySpaceProvider>
      </JukiUIProvider>
      <OwnPresence />
      <JukiUserProvider />
      <JukiAblyInitializer />
      <SoundInitializer />
      <JukiLastPathInitializer initialLastPath={initialLastPath} />
      <JukiPageInitializer />
      <JukiRouterInitializer {...routerProps} />
    </>
  );
};
