import React, { lazy, Suspense } from 'react';
import { JukiLoadingPLayout } from '../../molecules';
import { UserProfileSettingsProps } from './types';

const LazyUserProfileSettings = lazy(() => import('./UserProfileSettings').then(module => ({ default: module.UserProfileSettings })));

export const UserProfileSettings = (props: UserProfileSettingsProps) => (
  <Suspense fallback={<JukiLoadingPLayout />}>
    <LazyUserProfileSettings {...props} />
  </Suspense>
);

export * from './types';
