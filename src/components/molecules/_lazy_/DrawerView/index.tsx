import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server/icons/SpinIcon';
import type { DrawerViewProps } from './types';

export const DrawerViewImport = () => import('./DrawerView');

const DrawerViewCmp = lazy(() => DrawerViewImport());

export const DrawerView = (props: DrawerViewProps) => (
  <Suspense fallback={<SpinIcon />}>
    <DrawerViewCmp {...props} />
  </Suspense>
);
