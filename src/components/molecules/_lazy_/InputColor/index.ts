import { lazy } from 'react';

export const InputColorImport = () => import('./InputColor');

export const InputColor = lazy(() => InputColorImport());
