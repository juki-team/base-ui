import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts/PawsLoadingLayout';
import { T } from '../T';
import { CollapseProps } from './types';

const LazyCollapse = lazy(() => import('./Collapse').then(module => ({ default: module.Collapse })));

export const Collapse = (props: CollapseProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyCollapse {...props} />
  </Suspense>
);

export * from './types';
