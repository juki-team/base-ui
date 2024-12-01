import React, { lazy, Suspense } from 'react';
import { InputDateProps, T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { DatePickerProps, DayPickerProps, MonthPickerProps, TimePickerProps, YearPickerProps } from './types';

const LazyDatePicker = lazy(() => import('./DatePicker').then(module => ({ default: module.DatePicker })));

export const DatePicker = (props: DatePickerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyDatePicker {...props} />
  </Suspense>
);

const LazyDayPicker = lazy(() => import('./DayPicker').then(module => ({ default: module.DayPicker })));

export const DayPicker = (props: DayPickerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyDayPicker {...props} />
  </Suspense>
);

const LazyMonthPicker = lazy(() => import('./MonthPicker').then(module => ({ default: module.MonthPicker })));

export const MonthPicker = (props: MonthPickerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyMonthPicker {...props} />
  </Suspense>
);

const LazyTimePicker = lazy(() => import('./TimePicker').then(module => ({ default: module.TimePicker })));

export const TimePicker = (props: TimePickerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyTimePicker {...props} />
  </Suspense>
);

const LazyYearPicker = lazy(() => import('./YearPicker').then(module => ({ default: module.YearPicker })));

export const YearPicker = (props: YearPickerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyYearPicker {...props} />
  </Suspense>
);

const LazyInputDate = lazy(() => import('./InputDate').then(module => ({ default: module.InputDate })));

export const InputDate = (props: InputDateProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyInputDate {...props} />
  </Suspense>
);
