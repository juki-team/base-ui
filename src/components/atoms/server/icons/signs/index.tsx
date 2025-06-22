import React, { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';
import { SignIconProps } from '../types';

const ArrowIcon_Import = () => import('./ArrowIcon_');
const LazyArrowIcon_ = lazy(() => ArrowIcon_Import().then(module => ({ default: module.ArrowIcon_ })));
export const ArrowIcon_ = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowIcon_ {...props} />
  </Suspense>
);

const CheckIcon_Import = () => import('./CheckIcon_');
const LazyCheckIcon_ = lazy(() => CheckIcon_Import().then(module => ({ default: module.CheckIcon_ })));
export const CheckIcon_ = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon_ {...props} />
  </Suspense>
);

const CloseIcon_Import = () => import('./CloseIcon_');
const LazyCloseIcon_ = lazy(() => CloseIcon_Import().then(module => ({ default: module.CloseIcon_ })));
export const CloseIcon_ = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon_ {...props} />
  </Suspense>
);

const DoubleUpIconImport = () => import('./DoubleUpIcon');
const LazyDoubleUpIcon = lazy(() => DoubleUpIconImport().then(module => ({ default: module.DoubleUpIcon })));
export const DoubleUpIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDoubleUpIcon {...props} />
  </Suspense>
);

const ExclamationIcon_Import = () => import('./ExclamationIcon_');
const LazyExclamationIcon_ = lazy(() => ExclamationIcon_Import().then(module => ({ default: module.ExclamationIcon_ })));
export const ExclamationIcon_ = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExclamationIcon_ {...props} />
  </Suspense>
);

const MinusIconImport = () => import('./MinusIcon');
const LazyMinusIcon = lazy(() => MinusIconImport().then(module => ({ default: module.MinusIcon })));
export const MinusIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMinusIcon {...props} />
  </Suspense>
);

const PlusIconImport = () => import('./PlusIcon');
const LazyPlusIcon = lazy(() => PlusIconImport().then(module => ({ default: module.PlusIcon })));
export const PlusIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlusIcon {...props} />
  </Suspense>
);

const UpIconImport = () => import('./UpIcon');
const LazyUpIcon = lazy(() => UpIconImport().then(module => ({ default: module.UpIcon })));
export const UpIcon = (props: SignIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUpIcon {...props} />
  </Suspense>
);

export const preloadAtomsIconsSigns = async () => {
  await ArrowIcon_Import();
  await CheckIcon_Import();
  await CloseIcon_Import();
  await DoubleUpIconImport();
  await ExclamationIcon_Import();
  await MinusIconImport();
  await PlusIconImport();
  await UpIconImport();
};
