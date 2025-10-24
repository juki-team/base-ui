import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';

export const ExcalidrawButtonImport = () => import('./ExcalidrawButton');

const ExcalidrawButtonCmp = lazy(() => ExcalidrawButtonImport());

export const ExcalidrawButton = () => (
  <Suspense fallback={<SpinIcon />}>
    <ExcalidrawButtonCmp />
  </Suspense>
);
