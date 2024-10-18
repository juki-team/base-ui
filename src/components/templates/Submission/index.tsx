import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts';
import { SubmitViewProps } from './types';

const LazySubmitView = lazy(() => import('./SubmitView').then(module => ({ default: module.SubmitView })));

export const SubmitView = (props: SubmitViewProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazySubmitView{...props} />
  </Suspense>
);

export * from './types';
