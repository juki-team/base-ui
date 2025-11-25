import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';

export const SignUpModalImport = () => import('./SignUpModal');

const SignUpModalCmp = lazy(() => SignUpModalImport());

export const SignUpModal = () => (
  <Suspense fallback={<SpinIcon />}>
    <SignUpModalCmp />
  </Suspense>
);
