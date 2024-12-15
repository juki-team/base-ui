import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { SplitPaneProps } from './types';

const LazyComponent = lazy(() => import('./SplitPane').then(module => ({ default: module.SplitPane })));

export const SplitPane = (props: SplitPaneProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyComponent {...props} />
  </Suspense>
);
