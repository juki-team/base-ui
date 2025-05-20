import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../../../SuspenseWithTracking';
import { SpinIcon } from '../icons/SpinIcon';

const FlagEnImageImport = () => import('./FlagEnImage');
const LazyFlagEnImage = lazy(() => FlagEnImageImport().then(module => ({ default: module.FlagEnImage })));
export const FlagEnImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFlagEnImage />
  </SuspenseWithTracking>
);

const FlagEsImageImport = () => import('./FlagEsImage');
const LazyFlagEsImage = lazy(() => FlagEsImageImport().then(module => ({ default: module.FlagEsImage })));
export const FlagEsImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFlagEsImage />
  </SuspenseWithTracking>
);

const JukiCompleteLaptopImageImport = () => import('./JukiCompleteLaptopImage');
const LazyJukiCompleteLaptopImage = lazy(() => JukiCompleteLaptopImageImport().then(module => ({ default: module.JukiCompleteLaptopImage })));
export const JukiCompleteLaptopImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCompleteLaptopImage />
  </SuspenseWithTracking>
);

const JukiCouchLogoHorImageImport = () => import('./JukiCouchLogoHorImage');
const LazyJukiCouchLogoHorImage = lazy(() => JukiCouchLogoHorImageImport().then(module => ({ default: module.JukiCouchLogoHorImage })));
export const JukiCouchLogoHorImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCouchLogoHorImage />
  </SuspenseWithTracking>
);

const JukiCouchLogoVerImageImport = () => import('./JukiCouchLogoVerImage');
const LazyJukiCouchLogoVerImage = lazy(() => JukiCouchLogoVerImageImport().then(module => ({ default: module.JukiCouchLogoVerImage })));
export const JukiCouchLogoVerImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCouchLogoVerImage />
  </SuspenseWithTracking>
);

const JukiCourtImageImport = () => import('./JukiCourtImage');
const LazyJukiCourtImage = lazy(() => JukiCourtImageImport().then(module => ({ default: module.JukiCourtImage })));
export const JukiCourtImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCourtImage />
  </SuspenseWithTracking>
);

const JukiHeadImageImport = () => import('./JukiHeadImage');
const LazyJukiHeadImage = lazy(() => JukiHeadImageImport().then(module => ({ default: module.JukiHeadImage })));
export const JukiHeadImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiHeadImage />
  </SuspenseWithTracking>
);

const JukiJudgeLogoHorImageImport = () => import('./JukiJudgeLogoHorImage');
const LazyJukiJudgeLogoHorImage = lazy(() => JukiJudgeLogoHorImageImport().then(module => ({ default: module.JukiJudgeLogoHorImage })));
export const JukiJudgeLogoHorImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiJudgeLogoHorImage />
  </SuspenseWithTracking>
);

const JukiJudgeLogoVerImageImport = () => import('./JukiJudgeLogoVerImage');
const LazyJukiJudgeLogoVerImage = lazy(() => JukiJudgeLogoVerImageImport().then(module => ({ default: module.JukiJudgeLogoVerImage })));
export const JukiJudgeLogoVerImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiJudgeLogoVerImage />
  </SuspenseWithTracking>
);

const JukiLaptopImageImport = () => import('./JukiLaptopImage');
const LazyJukiLaptopImage = lazy(() => JukiLaptopImageImport().then(module => ({ default: module.JukiLaptopImage })));
export const JukiLaptopImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiLaptopImage />
  </SuspenseWithTracking>
);

const JukiSurprisedImageImport = () => import('./JukiSurprisedImage');
const LazyJukiSurprisedImage = lazy(() => JukiSurprisedImageImport().then(module => ({ default: module.JukiSurprisedImage })));
export const JukiSurprisedImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiSurprisedImage />
  </SuspenseWithTracking>
);

const JukiUtilsLogoHorImageImport = () => import('./JukiUtilsLogoHorImage');
const LazyJukiUtilsLogoHorImage = lazy(() => JukiUtilsLogoHorImageImport().then(module => ({ default: module.JukiUtilsLogoHorImage })));
export const JukiUtilsLogoHorImage = () => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiUtilsLogoHorImage />
  </SuspenseWithTracking>
);

export const preloadAtomsImages = async () => {
  await FlagEnImageImport();
  await FlagEsImageImport();
  await JukiCompleteLaptopImageImport();
  await JukiCouchLogoHorImageImport();
  await JukiCouchLogoVerImageImport();
  await JukiCourtImageImport();
  await JukiHeadImageImport();
  await JukiJudgeLogoHorImageImport();
  await JukiJudgeLogoVerImageImport();
  await JukiLaptopImageImport();
  await JukiSurprisedImageImport();
  await JukiUtilsLogoHorImageImport();
};
