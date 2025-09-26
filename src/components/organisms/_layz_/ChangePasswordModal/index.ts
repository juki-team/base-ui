import { lazy } from 'react';

export const ChangePasswordModalImport = () => import('./ChangePasswordModal');

export const ChangePasswordModal = lazy(() => ChangePasswordModalImport());
