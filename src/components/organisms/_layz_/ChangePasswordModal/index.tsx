import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { ChangePasswordModalProps } from './types';

export const ChangePasswordModalImport = () => import('./ChangePasswordModal');

const ChangePasswordModalCmp = lazy(() => ChangePasswordModalImport());

export const ChangePasswordModal = (props: ChangePasswordModalProps) => (
  <Suspense fallback={<SpinIcon />}>
    <ChangePasswordModalCmp {...props} />
  </Suspense>
);
