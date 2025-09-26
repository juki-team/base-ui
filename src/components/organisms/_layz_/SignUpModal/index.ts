import { lazy } from 'react';

export const SignUpModalImport = () => import('./SignUpModal');

export const SignUpModal = lazy(() => SignUpModalImport());
