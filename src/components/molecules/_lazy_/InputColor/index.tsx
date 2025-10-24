import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { InputColorProps } from './types';

export const InputColorImport = () => import('./InputColor');

const InputColorCmp = lazy(() => InputColorImport());

export const InputColor = (props: InputColorProps) => (
  <Suspense fallback={<SpinIcon />}>
    <InputColorCmp {...props} />
  </Suspense>
);
