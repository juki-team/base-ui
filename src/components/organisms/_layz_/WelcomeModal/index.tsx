import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { WelcomeModalProps } from './types';

export const WelcomeModalImport = () => import('./WelcomeModal');

const WelcomeModalCmp = lazy(() => WelcomeModalImport());

export const WelcomeModal = (props: WelcomeModalProps) => (
  <Suspense fallback={<SpinIcon />}>
    <WelcomeModalCmp {...props} />
  </Suspense>
);
