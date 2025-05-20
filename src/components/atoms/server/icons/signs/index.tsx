import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';
import { SignIconProps } from '../types';

const ArrowIconImport = () => import('./ArrowIcon');
const LazyArrowIcon = lazy(() => ArrowIconImport().then(module => ({ default: module.ArrowIcon })));
export const ArrowIcon = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowIcon {...props} />
  </SuspenseWithTracking>
);

const CheckIcon_Import = () => import('./CheckIcon_');
const LazyCheckIcon_ = lazy(() => CheckIcon_Import().then(module => ({ default: module.CheckIcon_ })));
export const CheckIcon_ = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon_ {...props} />
  </SuspenseWithTracking>
);

const CloseIcon_Import = () => import('./CloseIcon_');
const LazyCloseIcon_ = lazy(() => CloseIcon_Import().then(module => ({ default: module.CloseIcon_ })));
export const CloseIcon_ = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon_ {...props} />
  </SuspenseWithTracking>
);

const DoubleUpIconImport = () => import('./DoubleUpIcon');
const LazyDoubleUpIcon = lazy(() => DoubleUpIconImport().then(module => ({ default: module.DoubleUpIcon })));
export const DoubleUpIcon = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDoubleUpIcon {...props} />
  </SuspenseWithTracking>
);

const ExclamationIconImport = () => import('./ExclamationIcon');
const LazyExclamationIcon = lazy(() => ExclamationIconImport().then(module => ({ default: module.ExclamationIcon })));
export const ExclamationIcon = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyExclamationIcon {...props} />
  </SuspenseWithTracking>
);

const MinusIconImport = () => import('./MinusIcon');
const LazyMinusIcon = lazy(() => MinusIconImport().then(module => ({ default: module.MinusIcon })));
export const MinusIcon = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyMinusIcon {...props} />
  </SuspenseWithTracking>
);

const PlusIconImport = () => import('./PlusIcon');
const LazyPlusIcon = lazy(() => PlusIconImport().then(module => ({ default: module.PlusIcon })));
export const PlusIcon = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPlusIcon {...props} />
  </SuspenseWithTracking>
);

const UpIconImport = () => import('./UpIcon');
const LazyUpIcon = lazy(() => UpIconImport().then(module => ({ default: module.UpIcon })));
export const UpIcon = (props: SignIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyUpIcon {...props} />
  </SuspenseWithTracking>
);

export const preloadAtomsIconsSigns = async () => {
  await ArrowIconImport();
  await CheckIcon_Import();
  await CloseIcon_Import();
  await DoubleUpIconImport();
  await ExclamationIconImport();
  await MinusIconImport();
  await PlusIconImport();
  await UpIconImport();
};
