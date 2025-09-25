import { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';

const BalloonIconImport = () => import('./BalloonIcon');
const LazyBalloonIcon = lazy(() => BalloonIconImport().then(module => ({ default: module.BalloonIcon })));
export const BalloonIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBalloonIcon />
  </Suspense>
);

const FacebookIconImport = () => import('./FacebookIcon');
const LazyFacebookIcon = lazy(() => FacebookIconImport().then(module => ({ default: module.FacebookIcon })));
export const FacebookIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFacebookIcon />
  </Suspense>
);

const GmailIconImport = () => import('./GmailIcon');
const LazyGmailIcon = lazy(() => GmailIconImport().then(module => ({ default: module.GmailIcon })));
export const GmailIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGmailIcon />
  </Suspense>
);

const SortIconImport = () => import('./SortIcon');
const LazySortIcon = lazy(() => SortIconImport().then(module => ({ default: module.SortIcon })));
export const SortIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySortIcon />
  </Suspense>
);

const TelegramIconImport = () => import('./TelegramIcon');
const LazyTelegramIcon = lazy(() => TelegramIconImport().then(module => ({ default: module.TelegramIcon })));
export const TelegramIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTelegramIcon />
  </Suspense>
);

export const preloadAtomsIconsSpecials = async () => {
  await BalloonIconImport();
  await FacebookIconImport();
  await GmailIconImport();
  await SortIconImport();
  await TelegramIconImport();
};
