import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts';
import { EditProfileModalPros } from './types';

const LazyEditProfileModal = lazy(() => import('./EditProfileModal').then(module => ({ default: module.EditProfileModal })));

export const EditProfileModal = (props: EditProfileModalPros) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyEditProfileModal {...props} />
  </Suspense>
);

export * from './types';
