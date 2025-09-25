import { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../SuspenseWithTracking';
import { SpinIcon } from '../icons/SpinIcon';

const FlagEnImageImport = () => import('./FlagEnImage');
const LazyFlagEnImage = lazy(() => FlagEnImageImport().then(module => ({ default: module.FlagEnImage })));
export const FlagEnImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFlagEnImage />
  </Suspense>
);

const FlagEsImageImport = () => import('./FlagEsImage');
const LazyFlagEsImage = lazy(() => FlagEsImageImport().then(module => ({ default: module.FlagEsImage })));
export const FlagEsImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFlagEsImage />
  </Suspense>
);

const JukiCompleteLaptopImageImport = () => import('./JukiCompleteLaptopImage');
const LazyJukiCompleteLaptopImage = lazy(() => JukiCompleteLaptopImageImport().then(module => ({ default: module.JukiCompleteLaptopImage })));
export const JukiCompleteLaptopImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCompleteLaptopImage />
  </Suspense>
);

const JukiCouchLogoHorImageImport = () => import('./JukiCouchLogoHorImage');
const LazyJukiCouchLogoHorImage = lazy(() => JukiCouchLogoHorImageImport().then(module => ({ default: module.JukiCouchLogoHorImage })));
export const JukiCouchLogoHorImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCouchLogoHorImage />
  </Suspense>
);

const JukiCouchLogoVerImageImport = () => import('./JukiCouchLogoVerImage');
const LazyJukiCouchLogoVerImage = lazy(() => JukiCouchLogoVerImageImport().then(module => ({ default: module.JukiCouchLogoVerImage })));
export const JukiCouchLogoVerImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCouchLogoVerImage />
  </Suspense>
);

const JukiCourtImageImport = () => import('./JukiCourtImage');
const LazyJukiCourtImage = lazy(() => JukiCourtImageImport().then(module => ({ default: module.JukiCourtImage })));
export const JukiCourtImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCourtImage />
  </Suspense>
);

const JukiHeadImageImport = () => import('./JukiHeadImage');
const LazyJukiHeadImage = lazy(() => JukiHeadImageImport().then(module => ({ default: module.JukiHeadImage })));
export const JukiHeadImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiHeadImage />
  </Suspense>
);

const JukiJudgeLogoHorImageImport = () => import('./JukiJudgeLogoHorImage');
const LazyJukiJudgeLogoHorImage = lazy(() => JukiJudgeLogoHorImageImport().then(module => ({ default: module.JukiJudgeLogoHorImage })));
export const JukiJudgeLogoHorImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiJudgeLogoHorImage />
  </Suspense>
);

const JukiJudgeLogoVerImageImport = () => import('./JukiJudgeLogoVerImage');
const LazyJukiJudgeLogoVerImage = lazy(() => JukiJudgeLogoVerImageImport().then(module => ({ default: module.JukiJudgeLogoVerImage })));
export const JukiJudgeLogoVerImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiJudgeLogoVerImage />
  </Suspense>
);

const JukiLaptopImageImport = () => import('./JukiLaptopImage');
const LazyJukiLaptopImage = lazy(() => JukiLaptopImageImport().then(module => ({ default: module.JukiLaptopImage })));
export const JukiLaptopImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiLaptopImage />
  </Suspense>
);

const JukiSurprisedImageImport = () => import('./JukiSurprisedImage');
const LazyJukiSurprisedImage = lazy(() => JukiSurprisedImageImport().then(module => ({ default: module.JukiSurprisedImage })));
export const JukiSurprisedImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiSurprisedImage />
  </Suspense>
);

const JukiUtilsLogoHorImageImport = () => import('./JukiUtilsLogoHorImage');
const LazyJukiUtilsLogoHorImage = lazy(() => JukiUtilsLogoHorImageImport().then(module => ({ default: module.JukiUtilsLogoHorImage })));
export const JukiUtilsLogoHorImage = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiUtilsLogoHorImage />
  </Suspense>
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
