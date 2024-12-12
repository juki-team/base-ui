import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { T } from '../../atoms';
import { ModalButtonLoaderEventType } from '../../atoms/Modal/types';
import { JukiLoadingLayout } from '../layouts';
import { SplitModalProps } from './types';

const LazyComponent = lazy(() => import('./SplitModal').then(module => ({ default: module.SplitModal })));

export const SplitModal = <T extends ModalButtonLoaderEventType, >(props: PropsWithChildren<SplitModalProps<T>>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyComponent {...props} />
  </Suspense>
);
