import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules/layouts';
import { SubmitViewProps } from './types';

const LazySubmitView = lazy(() => import('./SubmitView').then(module => ({ default: module.SubmitView })));

export const SubmitView = (props: SubmitViewProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazySubmitView{...props} />
  </Suspense>
);

const LazySubmissionModal = lazy(() => import('./SubmissionModal').then(module => ({ default: module.SubmissionModal })));

export const SubmissionModal = () => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazySubmissionModal />
  </Suspense>
);

export * from './types';
