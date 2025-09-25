import { lazy } from 'react';

const GroupImport = () => import('./_group');

export const LineLoader = lazy(() => GroupImport().then(m => ({ default: m.LineLoader })));

export const LoaderLayer = lazy(() => GroupImport().then(m => ({ default: m.LoaderLayer })));
