import { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../SuspenseWithTracking';
import { SpinIcon } from '../icons/SpinIcon';
import { ImageProps } from './types';

const FlagEnImageImport = () => import('./FlagEnImage');
const LazyFlagEnImage = lazy(() => FlagEnImageImport().then(module => ({ default: module.FlagEnImage })));
export const FlagEnImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFlagEnImage {...props} />
  </Suspense>
);

const FlagEsImageImport = () => import('./FlagEsImage');
const LazyFlagEsImage = lazy(() => FlagEsImageImport().then(module => ({ default: module.FlagEsImage })));
export const FlagEsImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFlagEsImage {...props} />
  </Suspense>
);

const JukiCompleteLaptopImageImport = () => import('./JukiCompleteLaptopImage');
const LazyJukiCompleteLaptopImage = lazy(() => JukiCompleteLaptopImageImport().then(module => ({ default: module.JukiCompleteLaptopImage })));
export const JukiCompleteLaptopImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCompleteLaptopImage {...props} />
  </Suspense>
);

const JukiCouchLogoHorImageImport = () => import('./JukiCouchLogoHorImage');
const LazyJukiCouchLogoHorImage = lazy(() => JukiCouchLogoHorImageImport().then(module => ({ default: module.JukiCouchLogoHorImage })));
export const JukiCouchLogoHorImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCouchLogoHorImage {...props} />
  </Suspense>
);

const JukiCouchLogoVerImageImport = () => import('./JukiCouchLogoVerImage');
const LazyJukiCouchLogoVerImage = lazy(() => JukiCouchLogoVerImageImport().then(module => ({ default: module.JukiCouchLogoVerImage })));
export const JukiCouchLogoVerImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCouchLogoVerImage {...props} />
  </Suspense>
);

const JukiCourtImageImport = () => import('./JukiCourtImage');
const LazyJukiCourtImage = lazy(() => JukiCourtImageImport().then(module => ({ default: module.JukiCourtImage })));
export const JukiCourtImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiCourtImage {...props} />
  </Suspense>
);

const JukiHeadImageImport = () => import('./JukiHeadImage');
const LazyJukiHeadImage = lazy(() => JukiHeadImageImport().then(module => ({ default: module.JukiHeadImage })));
export const JukiHeadImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiHeadImage {...props} />
  </Suspense>
);

const JukiJudgeLogoHorImageImport = () => import('./JukiJudgeLogoHorImage');
const LazyJukiJudgeLogoHorImage = lazy(() => JukiJudgeLogoHorImageImport().then(module => ({ default: module.JukiJudgeLogoHorImage })));
export const JukiJudgeLogoHorImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiJudgeLogoHorImage {...props} />
  </Suspense>
);

const JukiJudgeLogoVerImageImport = () => import('./JukiJudgeLogoVerImage');
const LazyJukiJudgeLogoVerImage = lazy(() => JukiJudgeLogoVerImageImport().then(module => ({ default: module.JukiJudgeLogoVerImage })));
export const JukiJudgeLogoVerImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiJudgeLogoVerImage {...props} />
  </Suspense>
);

const JukiLaptopImageImport = () => import('./JukiLaptopImage');
const LazyJukiLaptopImage = lazy(() => JukiLaptopImageImport().then(module => ({ default: module.JukiLaptopImage })));
export const JukiLaptopImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiLaptopImage {...props} />
  </Suspense>
);

const JukiSurprisedImageImport = () => import('./JukiSurprisedImage');
const LazyJukiSurprisedImage = lazy(() => JukiSurprisedImageImport().then(module => ({ default: module.JukiSurprisedImage })));
export const JukiSurprisedImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiSurprisedImage {...props} />
  </Suspense>
);

const JukiUtilsLogoHorImageImport = () => import('./JukiUtilsLogoHorImage');
const LazyJukiUtilsLogoHorImage = lazy(() => JukiUtilsLogoHorImageImport().then(module => ({ default: module.JukiUtilsLogoHorImage })));
export const JukiUtilsLogoHorImage = (props: ImageProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiUtilsLogoHorImage {...props} />
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
