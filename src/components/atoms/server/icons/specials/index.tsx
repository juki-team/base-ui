import { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';

import type { BalloonIconProps } from './BalloonIcon/types';
import type { FacebookIconProps } from './FacebookIcon/types';
import type { GmailIconProps } from './GmailIcon/types';
import type { SortIconProps } from './SortIcon/types';
import type { TelegramIconProps } from './TelegramIcon/types';

const BalloonIconImport = () => import('./BalloonIcon');
const LazyBalloonIcon = lazy(() => BalloonIconImport().then(module => ({ default: module.BalloonIcon })));
export const BalloonIcon = (props: BalloonIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBalloonIcon {...props} />
  </Suspense>
);

const FacebookIconImport = () => import('./FacebookIcon');
const LazyFacebookIcon = lazy(() => FacebookIconImport().then(module => ({ default: module.FacebookIcon })));
export const FacebookIcon = (props: FacebookIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFacebookIcon {...props} />
  </Suspense>
);

const GmailIconImport = () => import('./GmailIcon');
const LazyGmailIcon = lazy(() => GmailIconImport().then(module => ({ default: module.GmailIcon })));
export const GmailIcon = (props: GmailIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGmailIcon {...props} />
  </Suspense>
);

const SortIconImport = () => import('./SortIcon');
const LazySortIcon = lazy(() => SortIconImport().then(module => ({ default: module.SortIcon })));
export const SortIcon = (props: SortIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySortIcon {...props} />
  </Suspense>
);

const TelegramIconImport = () => import('./TelegramIcon');
const LazyTelegramIcon = lazy(() => TelegramIconImport().then(module => ({ default: module.TelegramIcon })));
export const TelegramIcon = (props: TelegramIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTelegramIcon {...props} />
  </Suspense>
);

export const preloadAtomsIconsSpecials = async () => {
  await BalloonIconImport();
  await FacebookIconImport();
  await GmailIconImport();
  await SortIconImport();
  await TelegramIconImport();
};
