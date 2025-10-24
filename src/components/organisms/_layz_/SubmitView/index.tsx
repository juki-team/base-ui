import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { SubmitViewProps } from './types';

export const SubmitViewImport = () => import('./SubmitView');

const SubmitViewCmp = lazy(() => SubmitViewImport());

export const SubmitView = (props: SubmitViewProps) => (
  <Suspense fallback={<SpinIcon />}>
    <SubmitViewCmp {...props} />
  </Suspense>
);
