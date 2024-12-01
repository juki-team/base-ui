import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts/PawsLoadingLayout';
import { BreadcrumbsProps } from './types';

const LazyBreadcrumbs = lazy(() => import('./Breadcrumbs').then(module => ({ default: module.Breadcrumbs })));

export const Breadcrumbs = (props: BreadcrumbsProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyBreadcrumbs {...props} />
  </Suspense>
);

export * from './types';
