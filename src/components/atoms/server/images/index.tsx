import React, { lazy, Suspense } from 'react';
import { LoadingIcon } from '../icons/LoadingIcon';

const LazyFlagEnImage = lazy(() => import('./FlagEnImage').then(module => ({ default: module.FlagEnImage })));
export const FlagEnImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyFlagEnImage />
  </Suspense>
);

const LazyFlagEsImage = lazy(() => import('./FlagEsImage').then(module => ({ default: module.FlagEsImage })));
export const FlagEsImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyFlagEsImage />
  </Suspense>
);

const LazyJukiCompleteLaptopImage = lazy(() => import('./JukiCompleteLaptopImage').then(module => ({ default: module.JukiCompleteLaptopImage })));
export const JukiCompleteLaptopImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiCompleteLaptopImage />
  </Suspense>
);

const LazyJukiCouchLogoHorImage = lazy(() => import('./JukiCouchLogoHorImage').then(module => ({ default: module.JukiCouchLogoHorImage })));
export const JukiCouchLogoHorImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiCouchLogoHorImage />
  </Suspense>
);

const LazyJukiCouchLogoVerImage = lazy(() => import('./JukiCouchLogoVerImage').then(module => ({ default: module.JukiCouchLogoVerImage })));
export const JukiCouchLogoVerImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiCouchLogoVerImage />
  </Suspense>
);

const LazyJukiCourtImage = lazy(() => import('./JukiCourtImage').then(module => ({ default: module.JukiCourtImage })));
export const JukiCourtImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiCourtImage />
  </Suspense>
);

const LazyJukiHeadImage = lazy(() => import('./JukiHeadImage').then(module => ({ default: module.JukiHeadImage })));
export const JukiHeadImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiHeadImage />
  </Suspense>
);

const LazyJukiJudgeLogoHorImage = lazy(() => import('./JukiJudgeLogoHorImage').then(module => ({ default: module.JukiJudgeLogoHorImage })));
export const JukiJudgeLogoHorImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiJudgeLogoHorImage />
  </Suspense>
);

const LazyJukiJudgeLogoVerImage = lazy(() => import('./JukiJudgeLogoVerImage').then(module => ({ default: module.JukiJudgeLogoVerImage })));
export const JukiJudgeLogoVerImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiJudgeLogoVerImage />
  </Suspense>
);

const LazyJukiLaptopImage = lazy(() => import('./JukiLaptopImage').then(module => ({ default: module.JukiLaptopImage })));
export const JukiLaptopImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiLaptopImage />
  </Suspense>
);

const LazyJukiSurprisedImage = lazy(() => import('./JukiSurprisedImage').then(module => ({ default: module.JukiSurprisedImage })));
export const JukiSurprisedImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiSurprisedImage />
  </Suspense>
);

const LazyJukiUtilsLogoHorImage = lazy(() => import('./JukiUtilsLogoHorImage').then(module => ({ default: module.JukiUtilsLogoHorImage })));
export const JukiUtilsLogoHorImage = () => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyJukiUtilsLogoHorImage />
  </Suspense>
);
