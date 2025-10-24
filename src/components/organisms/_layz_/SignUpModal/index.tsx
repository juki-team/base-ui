import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { SignUpModalProps } from './types';

export const SignUpModalImport = () => import('./SignUpModal');

const SignUpModalCmp = lazy(() => SignUpModalImport());

export const SignUpModal = (props: SignUpModalProps) => (
  <Suspense fallback={<SpinIcon />}>
    <SignUpModalCmp {...props} />
  </Suspense>
);
