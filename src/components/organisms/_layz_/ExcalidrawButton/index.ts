import { lazy } from 'react';

export const ExcalidrawButtonImport = () => import('./ExcalidrawButton');

export const ExcalidrawButton = lazy(() => ExcalidrawButtonImport());
