import { lazy } from 'react';

export const GraphvizImport = () => import('./Graphviz');

export const Graphviz = lazy(() => GraphvizImport());
