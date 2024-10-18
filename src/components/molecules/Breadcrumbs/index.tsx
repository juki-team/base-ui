import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { BreadcrumbsProps } from './types';

const LazyBreadcrumbs = lazy(() => import('./Breadcrumbs').then(module => ({ default: module.Breadcrumbs })));

export const Breadcrumbs = (props: BreadcrumbsProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyBreadcrumbs {...props} />
  </Suspense>
);

export * from './types';
