import React, { lazy, Suspense } from 'react';
import { SignUpModalProps } from './types';

const LazySignUpModal = lazy(() => import('./SignUpModal').then(module => ({ default: module.SignUpModal })));

export const SignUpModal = (props: SignUpModalProps) => (
  <Suspense>
    <LazySignUpModal{...props} />
  </Suspense>
);
