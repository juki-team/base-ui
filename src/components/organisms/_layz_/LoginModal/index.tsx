import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { LoginModalProps } from './types';

export const LoginModalImport = () => import('./LoginModal');

const LoginModalCmp = lazy(() => LoginModalImport());

export const LoginModal = (props: LoginModalProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LoginModalCmp {...props} />
  </Suspense>
);
