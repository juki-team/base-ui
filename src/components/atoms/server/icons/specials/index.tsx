import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';
import { BalloonIconProps } from './BalloonIcon/types';
import { FacebookIconProps } from './FacebookIcon/types';
import { GmailIconProps } from './GmailIcon/types';
import { SortIconProps } from './SortIcon/types';
import { TelegramIconProps } from './TelegramIcon/types';

const BalloonIconImport = () => import('./BalloonIcon');
const LazyBalloonIcon = lazy(() => BalloonIconImport().then(module => ({ default: module.BalloonIcon })));
export const BalloonIcon = (props: BalloonIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyBalloonIcon {...props} />
  </SuspenseWithTracking>
);

const FacebookIconImport = () => import('./FacebookIcon');
const LazyFacebookIcon = lazy(() => FacebookIconImport().then(module => ({ default: module.FacebookIcon })));
export const FacebookIcon = (props: FacebookIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFacebookIcon {...props} />
  </SuspenseWithTracking>
);

const GmailIconImport = () => import('./GmailIcon');
const LazyGmailIcon = lazy(() => GmailIconImport().then(module => ({ default: module.GmailIcon })));
export const GmailIcon = (props: GmailIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyGmailIcon {...props} />
  </SuspenseWithTracking>
);

const SortIconImport = () => import('./SortIcon');
const LazySortIcon = lazy(() => SortIconImport().then(module => ({ default: module.SortIcon })));
export const SortIcon = (props: SortIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySortIcon {...props} />
  </SuspenseWithTracking>
);

const TelegramIconImport = () => import('./TelegramIcon');
const LazyTelegramIcon = lazy(() => TelegramIconImport().then(module => ({ default: module.TelegramIcon })));
export const TelegramIcon = (props: TelegramIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyTelegramIcon {...props} />
  </SuspenseWithTracking>
);

export const preloadAtomsIconsSpecials = async () => {
  await BalloonIconImport();
  await FacebookIconImport();
  await GmailIconImport();
  await SortIconImport();
  await TelegramIconImport();
};
