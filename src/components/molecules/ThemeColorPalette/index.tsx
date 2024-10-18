import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';

const LazyThemeColorPalette = lazy(() => import('./ThemeColorPalette').then(module => ({ default: module.ThemeColorPalette })));

export const ThemeColorPalette = () => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyThemeColorPalette {...props} />
  </Suspense>
);
