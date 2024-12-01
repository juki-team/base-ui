import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';

const LazyHomeLink = lazy(() => import('./HomeLink').then(module => ({ default: module.HomeLink })));

export const HomeLink = <T, >() => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyHomeLink />
  </Suspense>
);
