import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { JukiLoadingLayout, T } from '../components';
import { JukiProvidersProps } from './types';

const LazyJukiProviders = lazy(() => import('./JukiProviders').then(module => ({ default: module.JukiProviders })));

export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyJukiProviders {...props} />
  </Suspense>
);
