import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { CollapseProps } from './types';

const LazyCollapse = lazy(() => import('./Collapse').then(module => ({ default: module.Collapse })));

export const Collapse = (props: CollapseProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyCollapse {...props} />
  </Suspense>
);

export * from './types';
