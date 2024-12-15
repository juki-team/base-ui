import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { TwoActionModalProps } from './types';

const LazyComponent = lazy(() => import('./TwoActionModal').then(module => ({ default: module.TwoActionModal })));

export const TwoActionModal = (props: PropsWithChildren<TwoActionModalProps>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyComponent {...props} />
  </Suspense>
);
