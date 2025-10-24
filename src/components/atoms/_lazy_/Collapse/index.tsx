import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../server';
import type { CollapseProps } from './types';

export const CollapseImport = () => import('./Collapse');

const CollapseCmp = lazy(() => CollapseImport());

export const Collapse = (props: CollapseProps) => (
  <Suspense fallback={<SpinIcon />}>
    <CollapseCmp {...props} />
  </Suspense>
);
