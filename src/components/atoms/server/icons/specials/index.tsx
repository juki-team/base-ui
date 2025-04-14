import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../SpinIcon';
import { BalloonIconProps } from './BalloonIcon/types';
import { FacebookIconProps } from './FacebookIcon/types';
import { GmailIconProps } from './GmailIcon/types';
import { SortIconProps } from './SortIcon/types';
import { TelegramIconProps } from './TelegramIcon/types';

const LazyBalloonIcon = lazy(() => import('./BalloonIcon').then(module => ({ default: module.BalloonIcon })));
export const BalloonIcon = (props: BalloonIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBalloonIcon {...props} />
  </Suspense>
);

const LazyFacebookIcon = lazy(() => import('./FacebookIcon').then(module => ({ default: module.FacebookIcon })));
export const FacebookIcon = (props: FacebookIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFacebookIcon {...props} />
  </Suspense>
);

const LazyGmailIcon = lazy(() => import('./GmailIcon').then(module => ({ default: module.GmailIcon })));
export const GmailIcon = (props: GmailIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGmailIcon {...props} />
  </Suspense>
);

const LazySortIcon = lazy(() => import('./SortIcon').then(module => ({ default: module.SortIcon })));
export const SortIcon = (props: SortIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySortIcon {...props} />
  </Suspense>
);

const LazyTelegramIcon = lazy(() => import('./TelegramIcon').then(module => ({ default: module.TelegramIcon })));
export const TelegramIcon = (props: TelegramIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTelegramIcon {...props} />
  </Suspense>
);
