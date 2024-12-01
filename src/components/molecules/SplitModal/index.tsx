import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { SplitModalProps } from './types';

const LazyComponent = lazy(() => import('./SplitModal').then(module => ({ default: module.SplitModal })));

export const SplitModal = (props: PropsWithChildren<SplitModalProps>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyComponent {...props} />
  </Suspense>
);
