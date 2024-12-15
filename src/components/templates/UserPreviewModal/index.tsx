import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules';

const LazyUserPreviewModal = lazy(() => import('./UserPreviewModal').then(module => ({ default: module.UserPreviewModal })));

export const UserPreviewModal = () => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyUserPreviewModal />
  </Suspense>
);

export * from './types';
