import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules';
import { UserProfileProps } from './types';

const LazyUserProfile = lazy(() => import('./UserProfile').then(module => ({ default: module.UserProfile })));

export const UserProfile = (props: UserProfileProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyUserProfile {...props} />
  </Suspense>
);

export * from './types';
