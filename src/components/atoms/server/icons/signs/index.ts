import { lazy } from 'react';
const GroupImport = () => import('./_group');

export const ArrowIcon_ = lazy(() => GroupImport().then(m => ({ default: m.ArrowIcon_ })));

export const CheckIcon_ = lazy(() => GroupImport().then(m => ({ default: m.CheckIcon_ })));

export const CloseIcon_ = lazy(() => GroupImport().then(m => ({ default: m.CloseIcon_ })));

export const DoubleUpIcon = lazy(() => GroupImport().then(m => ({ default: m.DoubleUpIcon })));

export const ExclamationIcon_ = lazy(() => GroupImport().then(m => ({ default: m.ExclamationIcon_ })));

export const MinusIcon = lazy(() => GroupImport().then(m => ({ default: m.MinusIcon })));

export const PlusIcon = lazy(() => GroupImport().then(m => ({ default: m.PlusIcon })));

export const UpIcon = lazy(() => GroupImport().then(m => ({ default: m.UpIcon })));

export const preloadAtomsIconsSigns = async () => {
  await GroupImport();
};