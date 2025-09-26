import { lazy } from 'react';

export const SubmitViewImport = () => import('./SubmitView');

export const SubmitView = lazy(() => SubmitViewImport());
