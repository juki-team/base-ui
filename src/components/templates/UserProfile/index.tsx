import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../atoms';
import { UserProfileProps } from './types';

const LazyUserProfile = lazy(() => import('./UserProfile').then(module => ({ default: module.UserProfile })));

export const UserProfile = (props: UserProfileProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LazyUserProfile {...props} />
  </Suspense>
);

export * from './types';
