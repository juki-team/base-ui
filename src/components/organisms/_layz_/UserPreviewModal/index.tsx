import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { UserPreviewModalProps } from './types';

export const UserPreviewModalImport = () => import('./UserPreviewModal');

const UserPreviewModalCmp = lazy(() => UserPreviewModalImport());

export const UserPreviewModal = (props: UserPreviewModalProps) => (
  <Suspense fallback={<SpinIcon />}>
    <UserPreviewModalCmp {...props} />
  </Suspense>
);
