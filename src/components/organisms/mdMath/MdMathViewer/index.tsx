import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../../molecules';
import { MdMathViewerProps } from './types';

const LazyMdMathViewer = lazy(() => import('./MdMathViewer').then(module => ({ default: module.MdMathViewer })));

export const MdMathViewer = (props: MdMathViewerProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyMdMathViewer {...props} />
  </Suspense>
);

export * from './types';
