import { lazy, Suspense } from 'react';
import { LoginModalProps } from './types';

const LazyLoginModal = lazy(() => import('./LoginModal').then(module => ({ default: module.LoginModal })));

export const LoginModal = (props: LoginModalProps) => (
  <Suspense>
    <LazyLoginModal {...props} />
  </Suspense>
);
