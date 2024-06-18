import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules';
import { MainMenuProps } from './types';

const LazyMainMenu = lazy(() => import('./MainMenu').then(module => ({ default: module.MainMenu })));

export const MainMenu = (props: MainMenuProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyMainMenu {...props} />
  </Suspense>
);

export * from './types';
