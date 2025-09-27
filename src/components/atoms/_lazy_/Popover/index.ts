import { lazy } from 'react';

export const PopoverImport = () => import('./Popover');

export const Popover = lazy(() => PopoverImport());
