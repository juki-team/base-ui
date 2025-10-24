import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { SlideDeckProps } from './types';

export const SlideDeckImport = () => import('./SlideDeck');

const SlideDeckCmp = lazy(() => SlideDeckImport());

export const SlideDeck = (props: SlideDeckProps) => (
  <Suspense fallback={<SpinIcon />}>
    <SlideDeckCmp {...props} />
  </Suspense>
);
