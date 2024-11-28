import React, { lazy, Suspense } from 'react';
import { BasicModalProps } from '../../atoms/types';
import { JukiLoadingLayout } from '../../molecules';

const LazyChangePasswordModal = lazy(() => import('./ChangePasswordModal').then(module => ({ default: module.ChangePasswordModal })));

export const ChangePasswordModal = (props: BasicModalProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyChangePasswordModal {...props} />
  </Suspense>
);

export * from './types';
