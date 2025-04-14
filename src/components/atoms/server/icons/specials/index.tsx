import React, { lazy, Suspense } from 'react';
import { LoadingIcon } from '../LoadingIcon';
import { BalloonIconProps } from './BalloonIcon/types';
import { FacebookIconProps } from './FacebookIcon/types';
import { GmailIconProps } from './GmailIcon/types';
import { SortIconProps } from './SortIcon/types';
import { SpinIconProps } from './SpinIcon/types';
import { TelegramIconProps } from './TelegramIcon/types';

const LazyBalloonIcon = lazy(() => import('./BalloonIcon').then(module => ({ default: module.BalloonIcon })));
export const BalloonIcon = (props: BalloonIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyBalloonIcon {...props} />
  </Suspense>
);

const LazyFacebookIcon = lazy(() => import('./FacebookIcon').then(module => ({ default: module.FacebookIcon })));
export const FacebookIcon = (props: FacebookIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyFacebookIcon {...props} />
  </Suspense>
);

const LazyGmailIcon = lazy(() => import('./GmailIcon').then(module => ({ default: module.GmailIcon })));
export const GmailIcon = (props: GmailIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyGmailIcon {...props} />
  </Suspense>
);

const LazySortIcon = lazy(() => import('./SortIcon').then(module => ({ default: module.SortIcon })));
export const SortIcon = (props: SortIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazySortIcon {...props} />
  </Suspense>
);

const LazySpinIcon = lazy(() => import('./SpinIcon').then(module => ({ default: module.SpinIcon })));
export const SpinIcon = (props: SpinIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazySpinIcon {...props} />
  </Suspense>
);

const LazyTelegramIcon = lazy(() => import('./TelegramIcon').then(module => ({ default: module.TelegramIcon })));
export const TelegramIcon = (props: TelegramIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyTelegramIcon {...props} />
  </Suspense>
);
