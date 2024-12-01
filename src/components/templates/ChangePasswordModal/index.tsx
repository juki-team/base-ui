import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { BasicModalProps } from '../../atoms/types';
import { JukiLoadingLayout } from '../../molecules';

const LazyChangePasswordModal = lazy(() => import('./ChangePasswordModal').then(module => ({ default: module.ChangePasswordModal })));

export const ChangePasswordModal = (props: BasicModalProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyChangePasswordModal {...props} />
  </Suspense>
);

export * from './types';
