import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../server';
import type { VirtualizedRowsFixedProps } from './types';

export const VirtualizedRowsFixedImport = () => import('./VirtualizedRowsFixed');

const VirtualizedRowsFixedCmp = lazy(() => VirtualizedRowsFixedImport());

export const VirtualizedRowsFixed = (props: VirtualizedRowsFixedProps) => (
  <Suspense fallback={<SpinIcon />}>
    <VirtualizedRowsFixedCmp {...props} />
  </Suspense>
);
