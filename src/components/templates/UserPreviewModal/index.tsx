import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules';

const LazyUserPreviewModal = lazy(() => import('./UserPreviewModal').then(module => ({ default: module.UserPreviewModal })));

export const UserPreviewModal = () => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyUserPreviewModal />
  </Suspense>
);

export * from './types';
