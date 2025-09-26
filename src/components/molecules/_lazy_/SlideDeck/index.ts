import { lazy } from 'react';

export const SlideDeckImport = () => import('./SlideDeck');

export const SlideDeck = lazy(() => SlideDeckImport());
