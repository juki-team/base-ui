import React, { lazy, Suspense } from 'react';
import { JukiLoadingPLayout } from '../../molecules';
import { UserProfileProps } from './types';

const LazyUserProfile = lazy(() => import('./UserProfile').then(module => ({ default: module.UserProfile })));

export const UserProfile = (props: UserProfileProps) => (
  <Suspense fallback={<JukiLoadingPLayout />}>
    <LazyUserProfile {...props} />
  </Suspense>
);

export * from './types';
