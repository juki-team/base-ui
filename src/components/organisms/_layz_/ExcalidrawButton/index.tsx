import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server/icons/SpinIcon';

export const ExcalidrawButtonImport = () => import('./ExcalidrawButton');

const ExcalidrawButtonCmp = lazy(() => ExcalidrawButtonImport());

export const ExcalidrawButton = () => (
  <Suspense fallback={<SpinIcon />}>
    <ExcalidrawButtonCmp />
  </Suspense>
);
