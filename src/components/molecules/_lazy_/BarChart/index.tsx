import { lazy } from 'react';

export const BarChartImport = () => import('./BarChart');

export const BarChart = lazy(() => BarChartImport());
