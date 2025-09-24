import { lazy, Suspense } from 'react';
import { WelcomeModalProps } from './types';

const LazyWelcomeModal = lazy(() => import('./WelcomeModal').then(module => ({ default: module.WelcomeModal })));

export const WelcomeModal = (props: WelcomeModalProps) => (
  <Suspense>
    <LazyWelcomeModal{...props} />
  </Suspense>
);
