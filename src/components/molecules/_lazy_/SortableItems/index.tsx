import { type FC, lazy } from 'react';
import type { SortableItemsProps } from './types';

export const SortableItemsImport = () => import('./SortableItems');

const SortableItemsGen = lazy(() => SortableItemsImport()) as FC<SortableItemsProps<any, any>>;

export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => <SortableItemsGen {...props} />;
