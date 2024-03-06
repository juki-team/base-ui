import React, { lazy, Suspense } from 'react';

import { BasicModalProps, SpinIcon } from '../../atoms';

const LazyChangePasswordModal = lazy(() => import('./ChangePasswordModal').then(module => ({ default: module.ChangePasswordModal })));

export const ChangePasswordModal = (props: BasicModalProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LazyChangePasswordModal {...props} />
  </Suspense>
);

export * from './types';
