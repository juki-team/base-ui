import React, { lazy, Suspense } from 'react';
import { JukiLoadingPLayout } from '../../molecules';
import { UserPreviewModalProps } from './types';

const LazyUserPreviewModal = lazy(() => import('./UserPreviewModal').then(module => ({ default: module.UserPreviewModal })));

export const UserPreviewModal = (props: UserPreviewModalProps) => (
  <Suspense fallback={<JukiLoadingPLayout />}>
    <LazyUserPreviewModal {...props} />
  </Suspense>
);

export * from './types';
