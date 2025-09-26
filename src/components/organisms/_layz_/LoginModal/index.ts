import { lazy } from 'react';

export const LoginModalImport = () => import('./LoginModal');

export const LoginModal = lazy(() => LoginModalImport());
