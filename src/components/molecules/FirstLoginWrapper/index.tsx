import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';

const LazyFirstLoginWrapper = lazy(() => import('./FirstLoginWrapper').then(module => ({ default: module.FirstLoginWrapper })));

export const FirstLoginWrapper = (props: PropsWithChildren) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyFirstLoginWrapper {...props} />
  </Suspense>
);
