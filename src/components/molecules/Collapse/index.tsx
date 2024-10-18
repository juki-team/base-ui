import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { CollapseProps } from './types';

const LazyCollapse = lazy(() => import('./Collapse').then(module => ({ default: module.Collapse })));

export const Collapse = (props: CollapseProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyCollapse {...props} />
  </Suspense>
);

export * from './types';
