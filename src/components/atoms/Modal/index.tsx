import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts/PawsLoadingLayout';
import { T } from '../T';
import { ModalProps } from './types';

const LazyModal = lazy(() => import('./Modal').then(module => ({ default: module.Modal })));

export const Modal = (props: PropsWithChildren<ModalProps>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyModal {...props} />
  </Suspense>
);
