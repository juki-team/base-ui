import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';

export const SubmissionModalImport = () => import('./SubmissionModal');

const SubmissionModalCmp = lazy(() => SubmissionModalImport());

export const SubmissionModal = () => (
  <Suspense fallback={<SpinIcon />}>
    <SubmissionModalCmp />
  </Suspense>
);
