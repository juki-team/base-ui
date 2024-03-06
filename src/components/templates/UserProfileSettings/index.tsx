import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../atoms';
import { UserProfileSettingsProps } from './types';

const LazyUserProfileSettings = lazy(() => import('./UserProfileSettings').then(module => ({ default: module.UserProfileSettings })));

export const UserProfileSettings = (props: UserProfileSettingsProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LazyUserProfileSettings {...props} />
  </Suspense>
);

export * from './types';
