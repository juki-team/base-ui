import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules/layouts';
import { EditProfileModalPros } from './types';

const LazyEditProfileModal = lazy(() => import('./EditProfileModal').then(module => ({ default: module.EditProfileModal })));

export const EditProfileModal = (props: EditProfileModalPros) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyEditProfileModal {...props} />
  </Suspense>
);

export * from './types';
