import React, { lazy, Suspense } from 'react';
import { T } from '../../../atoms';
import { JukiLoadingLayout } from '../../../molecules';
import { MdMathViewerProps } from './types';

const LazyMdMathViewer = lazy(() => import('./MdMathViewer').then(module => ({ default: module.MdMathViewer })));

export const MdMathViewer = (props: MdMathViewerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyMdMathViewer {...props} />
  </Suspense>
);

export * from './types';
