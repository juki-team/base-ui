import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';

const LazyThemeColorPalette = lazy(() => import('./ThemeColorPalette').then(module => ({ default: module.ThemeColorPalette })));

export const ThemeColorPalette = () => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyThemeColorPalette {...props} />
  </Suspense>
);
