import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../atoms';
import { UserPreviewModalProps } from './types';

const LazyUserPreviewModal = lazy(() => import('./UserPreviewModal').then(module => ({ default: module.UserPreviewModal })));

export const UserPreviewModal = (props: UserPreviewModalProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LazyUserPreviewModal {...props} />
  </Suspense>
);

export * from './types';
