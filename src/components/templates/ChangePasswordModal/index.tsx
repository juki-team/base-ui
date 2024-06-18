import React, { lazy, Suspense } from 'react';
import { BasicModalProps } from '../../atoms';
import { JukiLoadingPLayout } from '../../molecules';

const LazyChangePasswordModal = lazy(() => import('./ChangePasswordModal').then(module => ({ default: module.ChangePasswordModal })));

export const ChangePasswordModal = (props: BasicModalProps) => (
  <Suspense fallback={<JukiLoadingPLayout />}>
    <LazyChangePasswordModal {...props} />
  </Suspense>
);

export * from './types';
