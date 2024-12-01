import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules';
import { UserProfileSettingsProps } from './types';

const LazyUserProfileSettings = lazy(() => import('./UserProfileSettings').then(module => ({ default: module.UserProfileSettings })));

export const UserProfileSettings = (props: UserProfileSettingsProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyUserProfileSettings {...props} />
  </Suspense>
);

export * from './types';
