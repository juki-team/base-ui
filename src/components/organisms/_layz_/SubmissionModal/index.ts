import { lazy } from 'react';

export const SubmissionModalImport = () => import('./SubmissionModal');

export const SubmissionModal = lazy(() => SubmissionModalImport());
