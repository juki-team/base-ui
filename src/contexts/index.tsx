import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { JukiLoadingLayout } from '../components';
import { JukiProvidersProps } from './types';

const LazyJukiProviders = lazy(() => import('./JukiProviders').then(module => ({ default: module.JukiProviders })));

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyJukiProviders {...props} />
  </Suspense>
);

export * from './JukiLastPathProvider';
export * from './JukiPageProvider';
export * from './JukiRouterProvider';
export * from './JukiUIProvider';
export * from './JukiUserProvider';
