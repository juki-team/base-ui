import { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';

const ArrowIcon_Import = () => import('./ArrowIcon_');
const LazyArrowIcon_ = lazy(() => ArrowIcon_Import().then(module => ({ default: module.ArrowIcon_ })));
export const ArrowIcon_ = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowIcon_ />
  </Suspense>
);

const CheckIcon_Import = () => import('./CheckIcon_');
const LazyCheckIcon_ = lazy(() => CheckIcon_Import().then(module => ({ default: module.CheckIcon_ })));
export const CheckIcon_ = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon_ />
  </Suspense>
);

const CloseIcon_Import = () => import('./CloseIcon_');
const LazyCloseIcon_ = lazy(() => CloseIcon_Import().then(module => ({ default: module.CloseIcon_ })));
export const CloseIcon_ = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon_ />
  </Suspense>
);

const DoubleUpIconImport = () => import('./DoubleUpIcon');
const LazyDoubleUpIcon = lazy(() => DoubleUpIconImport().then(module => ({ default: module.DoubleUpIcon })));
export const DoubleUpIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDoubleUpIcon />
  </Suspense>
);

const ExclamationIcon_Import = () => import('./ExclamationIcon_');
const LazyExclamationIcon_ = lazy(() => ExclamationIcon_Import().then(module => ({ default: module.ExclamationIcon_ })));
export const ExclamationIcon_ = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExclamationIcon_ />
  </Suspense>
);

const MinusIconImport = () => import('./MinusIcon');
const LazyMinusIcon = lazy(() => MinusIconImport().then(module => ({ default: module.MinusIcon })));
export const MinusIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMinusIcon />
  </Suspense>
);

const PlusIconImport = () => import('./PlusIcon');
const LazyPlusIcon = lazy(() => PlusIconImport().then(module => ({ default: module.PlusIcon })));
export const PlusIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlusIcon />
  </Suspense>
);

const UpIconImport = () => import('./UpIcon');
const LazyUpIcon = lazy(() => UpIconImport().then(module => ({ default: module.UpIcon })));
export const UpIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUpIcon />
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
