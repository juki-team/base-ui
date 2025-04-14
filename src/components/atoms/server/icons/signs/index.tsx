import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../SpinIcon';
import { SignIconProps } from '../types';

const LazyArrowIcon = lazy(() => import('./ArrowIcon').then(module => ({ default: module.ArrowIcon })));
export const ArrowIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowIcon {...props} />
  </Suspense>
);

const LazyCheckIcon_ = lazy(() => import('./CheckIcon_').then(module => ({ default: module.CheckIcon_ })));
export const CheckIcon_ = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon_ {...props} />
  </Suspense>
);

const LazyCloseIcon_ = lazy(() => import('./CloseIcon_').then(module => ({ default: module.CloseIcon_ })));
export const CloseIcon_ = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon_ {...props} />
  </Suspense>
);

const LazyDoubleUpIcon = lazy(() => import('./DoubleUpIcon').then(module => ({ default: module.DoubleUpIcon })));
export const DoubleUpIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDoubleUpIcon {...props} />
  </Suspense>
);

const LazyExclamationIcon = lazy(() => import('./ExclamationIcon').then(module => ({ default: module.ExclamationIcon })));
export const ExclamationIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExclamationIcon {...props} />
  </Suspense>
);

const LazyMinusIcon = lazy(() => import('./MinusIcon').then(module => ({ default: module.MinusIcon })));
export const MinusIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMinusIcon {...props} />
  </Suspense>
);

const LazyPlusIcon = lazy(() => import('./PlusIcon').then(module => ({ default: module.PlusIcon })));
export const PlusIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlusIcon {...props} />
  </Suspense>
);

const LazyUpIcon = lazy(() => import('./UpIcon').then(module => ({ default: module.UpIcon })));
export const UpIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUpIcon {...props} />
  </Suspense>
);
