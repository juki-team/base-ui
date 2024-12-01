import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules';
import { GraphvizEditorProps } from './types';

const LazyGraphvizEditor = lazy(() => import('./GraphvizEditor').then(module => ({ default: module.GraphvizEditor })));

export const GraphvizEditor = (props: GraphvizEditorProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyGraphvizEditor{...props} />
  </Suspense>
);

const LazyGraphvizViewer = lazy(() => import('./GraphvizViewer').then(module => ({ default: module.GraphvizViewer })));

export const GraphvizViewer = (props: Omit<GraphvizEditorProps, 'onChange'>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyGraphvizViewer{...props} />
  </Suspense>
);