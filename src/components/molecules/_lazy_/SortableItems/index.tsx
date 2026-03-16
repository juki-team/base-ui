import { lazy, ReactElement, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { SortableItemsProps } from './types';

export const SortableItemsImport = () => import('./SortableItems');

const SortableItemsGen = lazy(() => SortableItemsImport()) as <T, U = undefined>(
  props: SortableItemsProps<T, U>,
) => ReactElement | null;

export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => (
  <Suspense fallback={<SpinIcon />}>
    <SortableItemsGen {...props} />
  </Suspense>
);
