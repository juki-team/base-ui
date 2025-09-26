import { lazy } from 'react';

export const LineChartImport = () => import('./LineChart');

export const LineChart = lazy(() => LineChartImport());
