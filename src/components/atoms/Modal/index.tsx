import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts/PawsLoadingLayout';
import { ModalProps } from './types';

const LazyModal = lazy(() => import('./Modal').then(module => ({ default: module.Modal })));

export const Modal = (props: PropsWithChildren<ModalProps>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyModal {...props} />
  </Suspense>
);
