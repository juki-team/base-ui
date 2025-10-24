import { type FC, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { SortableItemsProps } from './types';

export const SortableItemsImport = () => import('./SortableItems');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SortableItemsGen = lazy(() => SortableItemsImport()) as FC<SortableItemsProps<any, any>>;

export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => (
  <Suspense fallback={<SpinIcon />}>
    <SortableItemsGen {...props} />
  </Suspense>
);
