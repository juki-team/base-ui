import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { ColorPickerProps } from './types';

const LazyInputColor = lazy(() => import('./InputColor').then(module => ({ default: module.InputColor })));

export const InputColor = (props: ColorPickerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyInputColor {...props} />
  </Suspense>
);

export * from './types';
