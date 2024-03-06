import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../atoms';
import { MainMenuProps } from './types';

const LazyMainMenu = lazy(() => import('./MainMenu').then(module => ({ default: module.MainMenu })));

export const MainMenu = (props: MainMenuProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LazyMainMenu {...props} />
  </Suspense>
);

export * from './types';
